# 🤖 Multi-IA Chat

App web para conversar com múltiplos provedores de IA em uma interface unificada.

## Provedores suportados
| Provedor | Modelo padrão | Gratuito? |
|---|---|---|
| Groq | Llama 3.3 70B | ✅ Sim |
| OpenAI | GPT-4o Mini | 💳 Pago |
| Google Gemini | Gemini 2.0 Flash | ✅ Sim (cota) |
| Anthropic | Claude Haiku 4 | 💳 Pago |
| xAI (Grok) | Grok 2 | 💳 Pago |
| OpenRouter | GPT-4o Mini | ✅ Sim (cota) |
| Perplexity | Sonar Pro | 💳 Pago |

## Como usar

### 1. Configurar as chaves de API
```bash
cp .env.example .env
# Edite o .env com suas chaves
```

### 2. Instalar e rodar
```bash
npm install
npm run dev  # ou: node server.js
```

### 3. Abrir no navegador
Acesse: http://localhost:3000

### Configurar chaves pelo app
Clique em ⚙️ Chaves na interface para adicionar chaves
diretamente pelo navegador (salvas localmente, nunca enviadas).

## Obter as chaves (todas grátis para começar)
- **Groq** (recomendado): https://console.groq.com → API Keys
- **OpenAI**: https://platform.openai.com/api-keys
- **Gemini**: https://aistudio.google.com/apikey
- **OpenRouter**: https://openrouter.ai/settings/keys
