require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ─── Configuração dos provedores ─────────────────────────────────────────────
const PROVIDERS = {
  groq: {
    nome: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    modelo: 'llama-3.3-70b-versatile',
    chave: () => process.env.GROQ_API_KEY,
    cor: '#f55036',
  },
  openai: {
    nome: 'OpenAI',
    url: 'https://api.openai.com/v1/chat/completions',
    modelo: 'gpt-4o-mini',
    chave: () => process.env.OPENAI_API_KEY,
    cor: '#10a37f',
  },
  gemini: {
    nome: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    modelo: 'gemini-2.0-flash',
    chave: () => process.env.GEMINI_API_KEY,
    cor: '#4285f4',
  },
  anthropic: {
    nome: 'Anthropic (Claude)',
    url: 'https://api.anthropic.com/v1/messages',
    modelo: 'claude-haiku-4-20250514',
    chave: () => process.env.ANTHROPIC_API_KEY,
    cor: '#d4a574',
    isAnthropic: true,
  },
  xai: {
    nome: 'xAI (Grok)',
    url: 'https://api.x.ai/v1/chat/completions',
    modelo: 'grok-2-latest',
    chave: () => process.env.XAI_API_KEY,
    cor: '#e7e7e7',
  },
  openrouter: {
    nome: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    modelo: 'openai/gpt-4o-mini',
    chave: () => process.env.OPENROUTER_API_KEY,
    cor: '#6366f1',
  },
  perplexity: {
    nome: 'Perplexity',
    url: 'https://api.perplexity.ai/chat/completions',
    modelo: 'sonar-pro',
    chave: () => process.env.PERPLEXITY_API_KEY,
    cor: '#20808d',
  },
};

// ─── GET /api/provedores — lista provedores com status ───────────────────────
app.get('/api/provedores', (req, res) => {
  const lista = Object.entries(PROVIDERS).map(([id, p]) => ({
    id,
    nome: p.nome,
    modelo: p.modelo,
    cor: p.cor,
    ativo: !!p.chave(),
  }));
  res.json(lista);
});

// ─── POST /api/chat — envia mensagem para o provedor escolhido ───────────────
app.post('/api/chat', async (req, res) => {
  const { provedor, mensagens, modelo, apiKeyOverride } = req.body;

  const cfg = PROVIDERS[provedor];
  if (!cfg) return res.status(400).json({ erro: 'Provedor inválido: ' + provedor });

  const apiKey = apiKeyOverride || cfg.chave();
  if (!apiKey) return res.status(400).json({
    erro: 'Chave de API não configurada para ' + cfg.nome +
          '. Adicione no arquivo .env ou informe diretamente.',
  });

  const modeloFinal = modelo || cfg.modelo;

  try {
    let body, headers;

    // Anthropic usa formato diferente
    if (cfg.isAnthropic) {
      const sys = mensagens.find(m => m.role === 'system');
      const msgs = mensagens.filter(m => m.role !== 'system');
      body = JSON.stringify({
        model: modeloFinal,
        max_tokens: 8192,
        system: sys?.content || 'Você é um assistente prestativo. Responda em português.',
        messages: msgs,
        stream: true,
      });
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      };
    } else {
      body = JSON.stringify({
        model: modeloFinal,
        messages: mensagens,
        stream: true,
        max_tokens: 8192,
      });
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Multi-IA App',
      };
    }

    const resp = await fetch(cfg.url, { method: 'POST', headers, body });

    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(resp.status).json({ erro: errText.substring(0, 500) });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    if (cfg.isAnthropic) {
      // Adaptador Anthropic → OpenAI SSE
      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const j = line.slice(6).trim();
          if (!j || j === '[DONE]') continue;
          try {
            const p = JSON.parse(j);
            const delta = p.delta?.text || '';
            if (delta) {
              const openaiChunk = { choices: [{ delta: { content: delta } }] };
              res.write('data: ' + JSON.stringify(openaiChunk) + '\n\n');
            }
          } catch {}
        }
      }
    } else {
      // OpenAI-compatible: repassa direto
      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(dec.decode(value, { stream: true }));
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ erro: err.message });
    else res.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🤖 Multi-IA rodando em http://localhost:' + PORT);
  console.log('📋 Provedores configurados:');
  Object.entries(PROVIDERS).forEach(([id, p]) => {
    const ok = !!p.chave();
    console.log('  ' + (ok ? '✅' : '❌') + ' ' + p.nome + ' (' + id + ')');
  });
});