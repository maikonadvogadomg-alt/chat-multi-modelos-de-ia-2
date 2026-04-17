# PLANO DO PROJETO: Chat Multi-Modelos de IA

> Gerado automaticamente pelo SK Code Editor em 17/04/2026, 16:59:16
> **8 arquivo(s)** | **~881 linhas de codigo**

---

## RESUMO EXECUTIVO

- **Tipo de aplicacao:** Backend/API (Node.js + Express)
- **Frontend / Stack principal:** HTML + CSS + JavaScript
- **Backend / Dados:** Node.js + Express
- **Versao:** 1.0.0
- **Descricao:** Chat com múltiplos provedores de IA

**Para rodar o projeto:**
```bash
npm install && npm run dev
```

---

## ESTRUTURA DE ARQUIVOS

```
Chat Multi-Modelos de IA/
├── public/
│   └── index.html
├── .env
├── .gitignore
├── package.json
├── PLANO.md
├── README.md
├── server.js
└── SISTEMA.md
```

---

## STACK TECNOLOGICO DETECTADO

- **Frontend:** HTML + CSS + JavaScript
- **Backend:** Node.js + Express
- **Todos os pacotes (4):** express, cors, dotenv, nodemon

---

## ROTAS DA API (endpoints detectados automaticamente)

```
GET    /api/provedores  (em server.js)
POST   /api/chat  (em server.js)
```

---

## SCRIPTS DISPONIVEIS (package.json)

```bash
npm run start         # node server.js
npm run dev           # nodemon server.js
```

---

## VARIAVEIS DE AMBIENTE NECESSARIAS

Crie um arquivo `.env` na raiz com estas variaveis:

```env
GROQ_API_KEY=seu_valor_aqui
OPENAI_API_KEY=seu_valor_aqui
GEMINI_API_KEY=seu_valor_aqui
ANTHROPIC_API_KEY=seu_valor_aqui
XAI_API_KEY=seu_valor_aqui
OPENROUTER_API_KEY=seu_valor_aqui
PERPLEXITY_API_KEY=seu_valor_aqui
PORT=seu_valor_aqui
```

---

## ARQUIVOS PRINCIPAIS

- `public/index.html` — Arquivo principal
- `server.js` — Ponto de entrada do backend

---

## GUIA COMPLETO — O QUE CADA PARTE DO PROJETO FAZ

> Esta secao explica, em linguagem simples, o que e para que serve cada pasta e cada arquivo.

### 📁 Raiz do Projeto (pasta principal)
> Arquivos de configuracao e pontos de entrada ficam aqui.

**`.env`** _(34 linhas)_
Arquivo de variaveis secretas (senhas, chaves de API). NUNCA suba este arquivo para o GitHub.

**`.gitignore`** _(3 linhas)_
Lista de arquivos/pastas que o Git deve IGNORAR (nao versionar). Ex: node_modules, .env

**`PLANO.md`** _(143 linhas)_
Este documento! Gerado automaticamente pelo SK Code Editor com toda a estrutura do projeto.

**`README.md`** _(42 linhas)_
Documentacao principal do projeto. Explica o que o projeto faz e como rodar.

**`SISTEMA.md`** _(98 linhas)_
Arquivo de documentacao em Markdown (texto formatado com #titulos, **negrito**, listas).

**`package.json`** _(18 linhas)_
Registro de dependencias e scripts do projeto. Aqui ficam os comandos (npm run dev, npm start) e os pacotes instalados.

**`server.js`** _(188 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

---

### 📁 `public/`
> Arquivos estaticos: imagens, icones, fontes, arquivos publicos.

**`index.html`** _(355 linhas)_
Pagina HTML raiz do projeto. E o ponto de entrada que o browser carrega primeiro.

---

## CONTEXTO PARA IA (copie e cole para continuar o projeto)

> Use este bloco para explicar o projeto para qualquer IA ou desenvolvedor:

```
Projeto: Chat Multi-Modelos de IA
Tipo: Backend/API (Node.js + Express)
Stack: HTML + CSS + JavaScript, Node.js + Express
Arquivos: 8 | Linhas: ~881
Rotas API: 2 endpoint(s) detectado(s)
Variaveis de ambiente necessarias: GROQ_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, ANTHROPIC_API_KEY, XAI_API_KEY, OPENROUTER_API_KEY, PERPLEXITY_API_KEY, PORT

Estrutura principal:
  .env
  .gitignore
  PLANO.md
  README.md
  SISTEMA.md
  package.json
  public/index.html
  server.js
```

---

*Plano gerado pelo SK Code Editor — 17/04/2026, 16:59:16*