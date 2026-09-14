# SPEC-TEMPLATES-000 — Política Geral de Construção de Templates de Demonstração

- **ID:** SPEC-TEMPLATES-000
- **Executor:** Antigravity
- **Natureza:** política permanente, não tarefa única. Vale para todo
  template já existente e para qualquer template futuro.
- **Relacionado a:** SPEC-SITE-005 (honestidade), SPEC-SITE-006 (política
  de animação do site principal), BRAND-GUIDE.md

---

## 0. O que são estes templates e o que não são

**São:** peças de demonstração construídas por Rodrigo, publicadas em
endereço próprio, usadas como prova visual de capacidade técnica durante
abordagem comercial ativa (link enviado por WhatsApp, mostrado em
reunião). Cada template é de um nicho que existe de verdade em Porto
Velho.

**Não são:** o site principal (`rodrigofreire.dev.br`), que segue regras
próprias e mais sóbrias. **Não são** promessa de entrega literal — o
que se entrega ao cliente é construído para o negócio dele.

**Consequência prática da diferença:** aqui a animação **é** o produto
em exibição, então este spec autoriza efeito visual mais expressivo do
que o SPEC-SITE-006 permite no site principal. O SPEC-SITE-006 continua
governando `rodrigofreire.dev.br` sem nenhuma flexibilização.

---

## 1. Regras inegociáveis de origem e propriedade

**1.1.** Todo template é **construído do zero**, por Rodrigo com apoio do
Antigravity. **PROIBIDO** usar, adaptar ou partir de template comercial
de terceiro (ThemeForest, Webflow, Framer, temas de WordPress e
equivalentes). Motivo duplo: licença desses produtos costuma vedar uso
como material de portfólio ou demonstração de serviço; e mostrar peça
que não se domina cria expectativa de entrega que pode não se sustentar
no prazo e no preço combinados.

**1.2.** Imagens vêm exclusivamente de bancos com licença livre para uso
comercial (Unsplash, Pexels ou equivalente), ou são geradas
especificamente para o template. **PROIBIDO** usar foto de cliente real,
logo de marca existente, ou imagem encontrada em busca genérica sem
licença verificada.

**1.3.** Todo nome de empresa, pessoa, produto, endereço e contato dentro
do template é **fictício e genérico**. **PROIBIDO** nome de negócio real
de Porto Velho ou de qualquer lugar, mesmo que a intenção seja
homenagear ou exemplificar.

**1.4.** Cada template exibe, de forma visível e permanente (rodapé é
suficiente), um aviso curto de que é peça de demonstração, não site de
cliente real.

---

## 2. Regras de animação

### 2.1. O que usar

- **Somente CSS** (`transition`, `@keyframes`, `transform`, `opacity`) e,
  quando o disparo depender de rolagem, `IntersectionObserver` nativo.
- **PROIBIDO** adicionar biblioteca de animação, de carrossel ou de
  rolagem (GSAP, AOS, Swiper, Locomotive e equivalentes). Todo efeito
  autorizado neste spec é alcançável sem dependência externa.
- **PROIBIDO** vídeo, GIF animado ou animação gerada por ferramenta de
  vídeo em qualquer parte do template. Motivo: peso de carregamento em
  rede instável, e impossibilidade de alterar o efeito na hora, diante
  do cliente, durante uma conversa de venda — que é justamente o cenário
  de uso destes templates.

### 2.2. Propriedades animáveis

Animar **apenas** `opacity`, `transform` e `filter`. **PROIBIDO** animar
`width`, `height`, `top`, `left`, `margin` ou `padding` — essas forçam
recálculo de layout a cada quadro e travam em celular de entrada, que é
o aparelho em que o cliente vai abrir o link.

### 2.3. Efeitos autorizados

- Entrada de seção ao rolar: `opacity` + deslocamento vertical até 24px,
  300-600ms, **disparo único** por sessão.
- Entrada escalonada de cartões/produtos: atraso incremental de
  60-120ms entre itens.
- `hover` em cartão de produto ou serviço: elevação sutil, mudança de
  sombra, `scale` entre 1,00 e 1,04.
- Transição de imagem em galeria: `opacity` e `transform`, nunca
  redimensionamento por `width`/`height`.
- Cabeçalho que muda de estado ao rolar (fundo, altura via `transform`).
- Efeito digitado: **no máximo um por template**, em linha secundária,
  nunca no `<h1>`.
- Contador numérico animado: autorizado **apenas** com número claramente
  fictício e no contexto de demonstração — e, se usado, o aviso da regra
  1.4 precisa estar visível na mesma página.

### 2.4. Efeitos proibidos

- Parallax de fundo com múltiplas camadas.
- Rolagem sequestrada (*scroll hijacking*) — controlar ou travar a
  rolagem do usuário.
- Animação que atrase a leitura de informação crítica: contato, preço,
  botão de ação.
- Cursor customizado que substitua o do sistema.
- Tela de carregamento artificial antes do conteúdo aparecer.
- Autoplay de áudio, em qualquer circunstância.
- Mais de um elemento em loop infinito visível ao mesmo tempo na tela.

---

## 3. Acessibilidade e desempenho (obrigatórios em todo template)

**3.1.** Bloco `@media (prefers-reduced-motion: reduce)` desativando toda
animação de entrada, loop e digitação, com o conteúdo em estado final
visível.

**3.2.** Todo elemento interativo (botão, link, campo) com estado de
`hover`, `active` e `focus` visível. Navegação completa por teclado.

**3.3.** Toda imagem com `alt` descritivo. Elemento puramente decorativo
com `aria-hidden="true"`.

**3.4.** Imagens em formato moderno e comprimidas, com `loading="lazy"`
em tudo que está abaixo da dobra. Nenhuma imagem servida em resolução
maior que o necessário para o maior ponto de quebra.

**3.5.** Contraste de texto sobre fundo suficiente para leitura ao sol —
o cliente vai abrir o link no celular, muitas vezes fora de ambiente
controlado.

---

## 4. Estrutura padrão de um template

Cada template segue esta estrutura mínima, adaptada ao nicho:

1. Cabeçalho com logo fictícia e navegação.
2. Topo de destaque com título, subtítulo e botão de ação.
3. Seção de conteúdo principal do nicho (vitrine de produtos para loja;
   serviços para institucional).
4. Seção de prova social fictícia, claramente genérica.
5. Seção de contato ou conversão.
6. Rodapé com o aviso da regra 1.4.

**Responsividade obrigatória:** celular primeiro. O template precisa
ficar bom em tela estreita antes de ficar bom em monitor, porque é no
celular que o cliente vai abrir o link que Rodrigo mandar.

---

## 5. Publicação e exibição

**5.1. Hospedagem — projeto separado.** Todos os templates vivem em um
projeto Cloudflare Pages **independente** do site principal, servidos em
`templates.rodrigofreire.dev.br`, com um caminho por template
(`/roupa-feminina`, `/advocacia`, e assim por diante).

Justificativa: o site principal tem `global.css` com quase 3.000 linhas
de classes semânticas próprias, bundle já otimizado (SPEC-SITE-004 RF-7)
e pré-renderização de 21 páginas funcionando. Templates precisam de
estética própria, paleta própria e animação mais expressiva — mantê-los
no mesmo projeto causaria vazamento de estilo, crescimento do bundle da
Home a cada template novo, e risco desnecessário ao SEO já validado.
Projeto separado isola tudo isso, com custo zero (mesma conta
Cloudflare, apenas um registro de DNS).

**5.2. Vitrine na Home do site principal (obrigatória).** A Home de
`rodrigofreire.dev.br` exibe uma vitrine dos templates disponíveis. Cada
entrada usa **imagem estática real** — captura da tela inicial do
template, comprimida — mais um botão que abre o template completo em
`templates.rodrigofreire.dev.br/<nicho>`.

**PROIBIDO** usar mockup estilizado ou ilustração no lugar da captura
real: a prévia precisa mostrar exatamente o que a pessoa vai encontrar
ao clicar. Prévia que promete uma estética e entrega outra quebra a
confiança no primeiro clique.

**PROIBIDO** embutir o template dentro da Home via `iframe`, vídeo ou
carregamento do template completo. O peso dos templates nunca entra no
carregamento do site principal.

A vitrine segue as regras de animação do SPEC-SITE-006 (site principal),
não as deste spec — entrada suave ao rolar, `hover` nos cartões, nada
mais. O impacto visual expressivo acontece **depois** do clique, dentro
do template.

**5.3. SEO de cada template.** Cada template tem `<title>` e meta
description próprios, mencionando nicho e cidade quando fizer sentido
(ex: "Modelo de site para loja de roupa feminina — Porto Velho"), para
que a página também seja encontrável por busca.

---

## 6. Critérios de aceitação (valem para cada template entregue)

- **CA-1:** nenhuma dependência de biblioteca de animação, carrossel ou
  rolagem no `package.json` do template.
- **CA-2:** nenhum arquivo de vídeo ou GIF animado no projeto.
- **CA-3:** busca no CSS por `transition`/`@keyframes` animando `width`,
  `height`, `top`, `left`, `margin` ou `padding` retorna zero ocorrência.
- **CA-4:** com `prefers-reduced-motion: reduce` ativo, nenhuma animação
  roda e todo o conteúdo permanece visível e legível.
- **CA-5:** nenhum nome, logo, foto ou dado de empresa ou pessoa real
  aparece no template.
- **CA-6:** o aviso de peça de demonstração está visível na página.
- **CA-7:** toda imagem tem `alt`; toda imagem abaixo da dobra tem
  `loading="lazy"`.
- **CA-8:** navegação completa por teclado funciona, com `focus` visível
  em todos os elementos interativos.
- **CA-9:** o template abre e é plenamente utilizável em tela de celular,
  sem rolagem horizontal e sem texto ilegível.
- **CA-10:** a rolagem da página nunca é travada, desacelerada ou
  controlada por script.
- **CA-11:** a vitrine na Home do site principal usa captura de tela
  real do template, não mockup nem ilustração, e não carrega o template
  completo (sem `iframe`, sem vídeo).
- **CA-12:** o carregamento da Home de `rodrigofreire.dev.br` não
  aumenta perceptivelmente a cada template novo publicado.

---

## 7. Ordem de construção

**Primeiro template definido: loja de roupa feminina**
(`templates.rodrigofreire.dev.br/roupa-feminina`).

Construir **dois** templates antes de investir nos demais — o de roupa
feminina e um institucional — e usar em abordagem real. Se a conversa
com cliente mostrar que um nicho puxa mais atenção, o próximo template
segue nessa direção.

Nichos mapeados como relevantes em Porto Velho, para referência futura:
**loja** — roupa feminina (primeiro), acessórios, joias, moda fitness,
presentes; **institucional** — advogado, médico, clínica de estética.

---

## 8. Fora de escopo

- Alteração de qualquer regra do site principal `rodrigofreire.dev.br`
  (governado pelos SPEC-SITE-00x).
- Construção do site real de cliente — template é demonstração, a
  entrega é feita sob medida.
- Venda ou licenciamento dos templates como produto.
