# Templates Demonstrativos — Rodrigo Freire

Repositório central de peças de demonstração técnica e comercial para prospecção ativa e vitrine em [rodrigofreire.dev.br](https://rodrigofreire.dev.br).

Hospedado de forma independente no Cloudflare Pages em `templates.rodrigofreire.dev.br`.

---

## 📁 Templates Disponíveis

### 1. Loja de Roupa Feminina — Lumina Boutique
- **Caminho:** `/roupa-feminina` (e raiz `/`)
- **Especificação:** [`docs/SPEC-TEMPLATES-001-roupa-feminina.md`](docs/SPEC-TEMPLATES-001-roupa-feminina.md)
- **Destaques Técnicos:**
  - Manequim 3D interativo construído exclusivamente com CSS nativo (`transform-style: preserve-3d`, `rotateY`, `backface-visibility`), sem Three.js nem bibliotecas externas (0 dependências de runtime).
  - Rotação com volta frontal (`0° -> 90° -> 0°`) ao alternar categorias (Casual, Festa, Trabalho, Esporte).
  - Performance extrema: CSS puro acelerado por hardware (GPU), zero impacto em layout/reflow (`width`/`height`/`top`/`left`).
  - Suporte estrito a acessibilidade e redução de movimento (`@media (prefers-reduced-motion: reduce)`).
  - Conversão direta para WhatsApp (`wa.me`) integrada em CTAs e botão flutuante.
  - Aviso legal obrigatório de peça de demonstração e dados 100% fictícios (Zero Trust).

---

## 📋 Governança e Diretrizes Gerais

- **Política Geral:** [`docs/SPEC-TEMPLATES-000-politica-geral.md`](docs/SPEC-TEMPLATES-000-politica-geral.md)
- **Critérios de Aceitação Obrigatórios:**
  - CA-1: Zero dependências de animação/carrossel externas.
  - CA-2: Zero arquivos de vídeo ou GIFs animados.
  - CA-3: Zero transições animando propriedades de layout.
  - CA-4: Respeito total a `prefers-reduced-motion`.
  - CA-5: Zero dados ou fotos de clientes reais.
  - CA-6: Aviso de peça de demonstração visível.

---

## 🚀 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar build de produção
npm run preview
```
