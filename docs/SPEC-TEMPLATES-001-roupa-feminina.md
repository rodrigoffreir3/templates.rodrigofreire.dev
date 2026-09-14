# SPEC-TEMPLATES-001: Template Loja Roupa Feminina

**Versão:** 1.0  
**Data:** 2026-09-13  
**Status:** Especificação em escrita  
**Autor:** Rodrigo Freire  
**Escopo:** Template completo hospedado em `templates.rodrigofreire.dev.br/roupa-feminina`

---

## 1. VISÃO GERAL

Este é o primeiro template de demonstração de loja de roupa feminina. Herda as políticas gerais da SPEC-TEMPLATES-000 (animação expressiva, mobile-first, sem rolagem sequestrada, sem jargão corporativo). O diferencial visual é o **hero com manequim de silhueta que gira**, trocando cores de roupa a cada 90° de rotação, capturando movimento + variedade de estilo em menos de 3 segundos.

**Cliente-alvo:** Lojistas que vendem roupa feminina online, querem apresentação moderna, conversão rápida.

**Público de uso:** Mulheres 18-45, majoritariamente mobile (80% do tráfego esperado via WhatsApp).

---

## 2. HERO: MANEQUIM SILHUETA ANIMADO

### 2.1 Objetivo do Hero

Comunicar em <3 segundos:
- É loja de roupa feminina (óbvio)
- Tem variedade de estilos (casual, festa, trabalho, esporte)
- Movimento atrai atenção (anima scroll, retenção)
- Profissional (não é amador, não é genérico)

### 2.2 Anatomia Técnica

**Estrutura em camadas:**

```
[Fundo degradado (rosa claro → branco)]
└─ [SVG Manequim Silhueta (preto/cinza)]
   └─ [SVG Roupas Overlay (4 cores alternadas)]
      └─ [Texto overlay: "Casual" | "Festa" | "Trabalho" | "Esporte"]
```

**Manequim SVG:**
- Silhueta de mulher em pé, estilo provador de loja (sem detalhes faciais, sem expressão)
- Dimensões base: 300px × 400px (responsivo até 100vw no mobile)
- Cores: Cinza médio (#757575) ou preto (#1a1a1a)
- Simples e limpo — sem detalhe que distraia da roupa

**Roupas (4 variações em SVG):**
1. **Casual:** Jeans + camiseta (azul + branco)
2. **Festa:** Vestido fluido (cor vibrante: roxo #8B3FBE ou rosa #E91E63)
3. **Trabalho:** Blazer + calça (cinza claro #BDBDBD + preto)
4. **Esporte:** Legging + top (preto + neon verde #39FF14)

Cada roupa é um SVG separado que substitui a anterior via `.opacity` transition.

### 2.3 Animação Principal

**Tipo:** Rotação + fade de cor (simultâneos)

**Velocidade:** 
- 1.5s por rotação (90° cada)
- Total do ciclo: 6s (4 roupas × 1.5s)
- Loop infinito, sem pausa entre ciclos

**Sequência visual:**

```
[0s] Inicio - Casual (jeans azul + branco) + "CASUAL"
[1.5s] Gira 90° - Festa (vestido roxo) + "FESTA"
[3s] Gira 90° - Trabalho (blazer cinza/preto) + "TRABALHO"
[4.5s] Gira 90° - Esporte (legging preto + top neon) + "ESPORTE"
[6s] Volta ao início - Casual
[...] Loop
```

**Rotação visual:**
- Manequim gira 90° no eixo Y (perspectiva 3D via CSS `transform: rotateY()`)
- Suavidade: `transition: transform 1.5s ease-in-out`
- A roupa *muda* após o manequim virar (não enquanto está virando)

**Fade de cor:**
- Ao mesmo tempo que manequim gira, texto descola (sai -20px up, fade-out)
- Nova roupa aparece com texto novo (sai +20px down, fade-in)
- Tudo sincronizado em 1.5s

### 2.4 Texto Overlay

**Posicionamento:** Abaixo do manequim

**Tamanho:** 
- Desktop: 32px
- Tablet: 28px
- Mobile: 24px

**Tipografia:** Bold, sem serifa (herança do SPEC-006)  
**Cor:** Contraste com fundo (se fundo rosa → texto escuro; se fundo branco → preto)  
**Conteúdo:** Tipo de roupa ("CASUAL", "FESTA", "TRABALHO", "ESPORTE")

**Animação do texto:**
- Fade-out + sobe 20px enquanto manequim gira
- Fade-in + desce 20px quando manequim para
- Sincronizado com rotação (não é independente)

---

## 3. ESTRUTURA DE SEÇÕES

Após o hero, a página segue esta arquitetura:

### 3.1 Seções Obrigatórias

**S1. Hero** (acima da dobra)
- Manequim + animação (conforme 2.2-2.4)
- Altura: 100vh (full screen mobile, 80vh desktop)
- CTA secundário simples (ex: "Explorar" ou seta down)

**S2. Galeria de Categorias**
- 4 cards: Casual | Festa | Trabalho | Esporte
- Cada card: Imagem Unsplash (mulher usando aquele estilo) + texto
- Grid: 1 coluna mobile, 2 colunas tablet, 4 desktop
- Sem hover frenético (SPEC-006: apenas leve scale 1.05)

**S3. Depoimentos / Avaliações**
- 3-5 depoimentos curtos (max 2 linhas)
- Estrelas animadas em contador (autorizado por SPEC-TEMPLATES-000 1.4)
- Avatar + nome + estrelas
- Exemplos: "Chegou em 3 dias", "Excelente qualidade", "Recomendo!"

**S4. FAQ**
- 4-6 perguntas comuns (entrega, trocas, garantia)
- Accordion simples (sem rotação de ícone, apenas altura)
- Respondido com resposta curta e link pra WhatsApp se precisar

**S5. CTA Final**
- Botão grande "Comprar Agora" ou "Ver Catálogo"
- Texto sugestivo: "Encontre seu estilo"
- Botão flota sticky na parte inferior mobile

### 3.2 Arquitetura de Imagens

**Unsplash sourcing (referência):**
- S2 Casual: `woman jeans white t-shirt fashion`
- S2 Festa: `woman red dress party evening`
- S2 Trabalho: `woman blazer professional office`
- S2 Esporte: `woman athletic workout leggings`
- S3 Avatares: `woman portrait small`

Todas as imagens devem ter:
- Fundo limpo ou desfocado
- Modelo visible head-to-toe ou waist-up mínimo
- Sem watermark visível
- Comprimidas para <200KB cada (WebP ou JPG otimizado)

---

## 4. DESIGN & CORES

### 4.1 Paleta Principal

**Primária (Hero):**
- Fundo do hero: Rosa claro (`#F8E8EF`) → Branco (`#FFFFFF`) gradiente 45°
- Manequim: Cinza médio `#757575`
- Texto: Preto `#1a1a1a`

**Secundária (Seções):**
- Fundo S2-S5: Branco puro `#FFFFFF`
- Cards de categoria: Sombra sutil `0px 4px 12px rgba(0,0,0,0.08)`
- Botões: Cor vibrante (rosa `#E91E63` ou roxo `#8B3FBE`)
- Botão hover: Escurece 15% (não muda de cor)

**Roupas (SVG):**
- Casual: Azul jeans `#1E88E5` + branco `#FFFFFF`
- Festa: Roxo vibrante `#8B3FBE` ou rosa magenta `#E91E63`
- Trabalho: Cinza claro `#BDBDBD` + preto `#1a1a1a`
- Esporte: Preto `#1a1a1a` + neon verde `#39FF14`

### 4.2 Tipografia

**Famílias:**
- Títulos/Hero: Sans-serif bold (Inter, Poppins ou similar)
- Corpo: Sans-serif regular (mesma família)
- Tamanho base: 16px mobile, 18px desktop

**Hierarquia:**
- H1 (Hero text): 32px bold
- H2 (Seção): 24px bold
- Body: 16px regular
- Small (Depoimento): 14px regular

---

## 5. ANIMAÇÕES & TRANSIÇÕES

**Implementadas:**

1. **Hero manequim:** Rotação 90° + fade de roupa (conforme 2.3)
2. **Scroll de S2:** Fade-in das categorias quando entram no viewport (leve, <500ms)
3. **Contador de avaliação (S3):** Contador animado `0 → 4.8` em 2s quando visível (SPEC-TEMPLATES-000 2.3 autoriza)
4. **Botões:** Scale 1.05 + sombra no hover (SPEC-006)
5. **Accordion (S4):** Height 0 → auto em 300ms, sem rotação de ícone

**Proibições (SPEC-006 + SPEC-TEMPLATES-000):**
- Sem parallax
- Sem rolagem sequestrada
- Sem auto-play de vídeo
- Sem mouse tracking
- Sem efeitos strobe/piscada
- Sem animação acima de 500ms de delay (deve ser imediata ao scroll)

---

## 6. MOBILE-FIRST REQUIREMENTS

**Viewport:** 320px mínimo (iPhone SE)

**Hero mobile:**
- Altura: 100vh ou max 400px (o que for menor)
- Manequim: Escala automática pra caber
- Texto: 24px bold, com margin bottom 16px
- Botão CTA: Full-width, altura 48px

**Imagens:**
- Comprimidas com Cloudflare Image Optimization
- Lazy loading automático (até S5)
- Ratio 1:1 em S2 cards, 16:9 em S3 avatares

**Performance target:**
- LCP (Largest Contentful Paint): <2.5s mobile 3G
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

---

## 7. TECNOLOGIA & STACK

**Framework:** Astro + React islands  
**Styling:** Tailwind + CSS Module isolados (SPEC-TEMPLATES-000 5.1)  
**Animações:** Framer Motion (React) ou CSS puro (prefiro puro pra SVG)  
**Hospedagem:** Cloudflare Pages (templates.rodrigofreire.dev.br)  
**CDN de imagens:** Cloudflare Image Optimization  

**Estrutura do repositório:**
```
templates.rodrigofreire.dev/
├── src/
│   ├── components/
│   │   ├── HeroManequim.astro (SVG + animação)
│   │   ├── CategoriaCard.astro
│   │   ├── Depoimento.astro
│   │   ├── FAQ.astro
│   │   └── CTAButton.astro
│   ├── layouts/
│   │   └── TemplateLayout.astro
│   ├── pages/
│   │   └── roupa-feminina.astro
│   └── styles/
│       └── roupa-feminina.css
├── public/
│   └── images/
│       ├── categories/
│       └── testimonials/
└── astro.config.mjs
```

---

## 8. INTEGRAÇÕES & FLUXO DE VENDAS

### 8.1 Carrinho & Checkout

**Abordagem:** Integração com Shopify ou WooCommerce (não hospedado)

- Botão "Ver Catálogo" (S2) redireciona pra loja externa (URL parametrizada)
- Botão "Comprar Agora" (S5) redireciona pra checkout com UTM tracking
- Exemplo: `https://loja-da-cliente.shopify.com/?utm_source=templates&utm_campaign=roupa-feminina`

**Rastreamento:**
- Google Analytics 4 integrado
- Eventos: "hero_view", "category_click", "checkout_click"
- Pixel de conversão (opcional, cliente fornece)

### 8.2 WhatsApp Button

**Localização:** Sticky na parte inferior direita (mobile) ou canto inferior (desktop)  
**Link:** `https://wa.me/55XXXXXXXXXXX?text=Vi%20sua%20loja%20de%20roupas%20femininas`  
**Ícone:** Ícone WhatsApp simples, sem pulsação (SPEC-006 proíbe animação constante)

---

## 9. ACEITAÇÃO & TESTES

### 9.1 Critérios de Aceitação

**CA1: Hero manequim anima corretamente**
- [ ] Manequim gira 90° a cada 1.5s
- [ ] Roupa muda sincronizada com rotação
- [ ] Texto muda sincronizado com rotação
- [ ] Loop infinito, sem travamento
- [ ] No mobile <400px viewport, manequim não extrapola a tela

**CA2: Performace**
- [ ] LCP <2.5s em mobile 3G (via Lighthouse)
- [ ] Sem layout shift visível durante animação
- [ ] Imagens carregam comprimidas (<200KB cada)

**CA3: Mobile-first**
- [ ] Full-width no celular, sem scroll horizontal
- [ ] Botões 48px de altura, fácil de tocar
- [ ] Texto legível em 320px
- [ ] Sem hover states visíveis (usam focus ao invés)

**CA4: Sem violações da política**
- [ ] Sem rolagem sequestrada
- [ ] Sem parallax ou efeitos de movimento além do hero
- [ ] Sem autoplay de vídeo/áudio
- [ ] Sem jargão corporativo ("sinergias", "soluções", etc)

**CA5: Analytics**
- [ ] Eventos rastreados em GA4
- [ ] UTM parâmetros corretos em links de saída
- [ ] WhatsApp click contabilizado

### 9.2 Teste de Sabotagem

Antes de passar pra cliente:

1. Desativar animação CSS → hero fica estático com Casual visível ✓
2. Bloquear imagens → página não quebra, mostra placeholder ✓
3. Network throttle 3G → LCP <2.5s mesmo assim ✓
4. Viewport 320px → sem scroll horizontal ✓
5. Dark mode ativado → cores still readable ✓

---

## 10. ENTREGA & PRÓXIMOS PASSOS

**Fase 1 (Semana 1):** Hero + S2 (Categorias) → primeira versão ao vivo  
**Fase 2 (Semana 2):** S3 (Depoimentos) + S4 (FAQ) → funcionalidade completa  
**Fase 3 (Semana 3):** Otimizações, testes de conversão, analytics setup  

**Definições pendentes com cliente:**
- [ ] Cores exatas pra roupa Festa e Esporte (propor 2 opções cada)
- [ ] Número de depoimentos desejado (propor 5, mínimo 3)
- [ ] FAQ: que 4 perguntas são mais recorrentes?
- [ ] Número de WhatsApp pra integração
- [ ] Plataforma de e-commerce (Shopify? WooCommerce? Algo mais?)

---

## 11. NOTAS & OBSERVAÇÕES

**Diferença entre Home (rodrigofreire.dev.br) e Template:**
- Home mostra captura estática de screenshot desse template
- Template roda de verdade, com hero animado, em templates.rodrigofreire.dev.br/roupa-feminina
- Visitante não percebe que trocou de URL (mesmo domínio via redirect)

**Por que manequim SVG em vez de foto real:**
- SVG renderiza idêntico em todo dispositivo (foto jpeg fica pixelada em 4K)
- Permite rotação suave sem aliasing
- Arquivo menor (<20KB SVG vs >500KB foto)
- Executável em 4 horas, não em 3 dias procurando foto perfeita no Unsplash

**Risco mitigado:**
- Se cliente quiser depois "mais realista", 3D model com Spline é upgrade, não remake
- Por hora, SVG prova conceito em tempo real, sem perder qualidade

---

**Próximo passo:** Aguardar aprovação dessa spec, depois rodar Antigravity (Gemini) ou você mesmo começar a implementar o hero. Primeira coisa: desenhar SVG do manequim + testar animação CSS, isso trava ou solta o resto.

Quer começar implementação agora ou quer fazer iterações no spec antes?
