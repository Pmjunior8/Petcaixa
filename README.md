# 🐾 PetCaixa — Gestão Financeira Pet

PWA completo para tutores de pets gerenciarem fundo de emergência, gastos, vacinas, ração e passeios.

## 📁 Estrutura de arquivos

```
petcaixa/
├── index.html       ← App principal
├── manifest.json    ← Configuração PWA
├── sw.js            ← Service Worker (cache offline)
└── icons/
    ├── icon-192.png ← Ícone pequeno
    └── icon-512.png ← Ícone grande (splash screen)
```

## 🚀 Deploy no GitHub Pages

1. Crie um repositório público no GitHub chamado `petcaixa`
2. Faça upload de todos os arquivos desta pasta
3. Vá em **Settings → Pages → Source → main branch / root**
4. Aguarde ~2 minutos — o link será: `https://seu-usuario.github.io/petcaixa`

## ⚙️ Ajustes necessários no sw.js após deploy

No arquivo `sw.js`, o Service Worker usa `/` como raiz. Se o GitHub Pages servir em subpasta (ex: `/petcaixa/`), ajuste a linha:

```js
// Antes:
const ASSETS = ['/', '/index.html', '/manifest.json', ...]

// Depois (se em subpasta):
const ASSETS = ['/petcaixa/', '/petcaixa/index.html', '/petcaixa/manifest.json', ...]
```

E no `manifest.json`, ajuste:
```json
"start_url": "/petcaixa/"
```

## 📱 Instalação no celular

Ao acessar via navegador mobile (Chrome Android ou Safari iOS), o banner de instalação aparecerá automaticamente após 3 segundos.

- **Android:** Banner nativo do Chrome → "Adicionar à tela inicial"
- **iOS Safari:** Botão compartilhar → "Adicionar à Tela de Início"

## 💾 Dados salvos

Todos os dados são salvos no `localStorage` do navegador — nenhum dado vai para servidores. Funciona 100% offline após primeira visita.

## 💰 Venda no Hotmart

Preço sugerido: **R$ 47–67**
- Produto: Acesso ao link do GitHub Pages
- Bônus: PDF "Guia do Fundo de Emergência Pet"
