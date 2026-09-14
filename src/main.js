/**
 * SPEC-TEMPLATES-001: Loja Roupa Feminina (Lumina Boutique)
 * Governança: SPEC-TEMPLATES-000 (Regras CA-1 a CA-12)
 * Zero bibliotecas externas de animação/carrossel. Apenas JS e CSS nativos.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroMannequin();
  initRatingCounter();
  initFaqAccordion();
});

/* ==========================================================================
   1. HERO 3D TURNTABLE CONTROLLER (5 LOOKS REAIS COM FRENTE E COSTAS)
   ========================================================================== */
function initHeroMannequin() {
  const cylinder = document.getElementById('turntableCylinder');
  const slides = document.querySelectorAll('.turntable-slide');
  const tabs = document.querySelectorAll('.style-tab');
  const prevBtn = document.getElementById('stagePrevBtn');
  const nextBtn = document.getElementById('stageNextBtn');
  const fabricLabel = document.getElementById('fabricLabel');
  const lookTitle = document.getElementById('lookTitle');
  const lookSub = document.getElementById('lookSub');
  const waChip = document.getElementById('waChip');
  const waChipText = document.getElementById('waChipText');
  const stageViewport = document.getElementById('stageViewport');
  const stage = document.querySelector('.hero-stage');

  if (!cylinder || slides.length === 0) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stylesData = [
    {
      title: 'Vestido Marsala Degagê',
      sub: 'R$ 94,46 • Costas Decotadas',
      fabric: 'Seda Pura & Crepe de Chiffon',
      wa: 'Quero o Vestido Marsala no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Vestido%20Longo%20Marsala%20(R$%2094,46)%20e%20gostaria%20de%20saber%20os%20tamanhos%20dispon%C3%ADveis'
    },
    {
      title: 'Vestido Sereia White & Gold',
      sub: 'R$ 130,90 • Costas Douradas',
      fabric: 'Crepe Estruturado & Ouro Polido',
      wa: 'Quero o Vestido Branco Dourado no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Vestido%20Sereia%20Branco%20com%20Costas%20Douradas%20(R$%20130,90)%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es'
    },
    {
      title: 'Wide Leg Denim & Cetim',
      sub: 'Coleção Casual • Frente & Costas',
      fabric: 'Jeans 100% Algodão & Cetim Navy',
      wa: 'Quero o Look Denim & Top no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Look%20Wide%20Leg%20Denim%20e%20Blusa%20Acetinada%20e%20gostaria%20de%20saber%20valores%20e%20tamanhos'
    },
    {
      title: 'Macacão Denim Flare Vintage',
      sub: 'Modelagem Modeladora • Barra Flare',
      fabric: 'Denim Premium com Elastano',
      wa: 'Quero o Macacão Jeans Flare no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Macacão%20Jeans%20Flare%20que%20vi%20no%20site%20e%20gostaria%20de%20saber%20as%20medidas'
    },
    {
      title: 'Conjunto Palazzo Chocolate',
      sub: 'Tomara que Caia & Calça Ampla',
      fabric: 'Cetim Nobre Duchese Tom Café',
      wa: 'Quero o Conjunto de Cetim no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Conjunto%20de%20Cetim%20Chocolate%20(Top%20e%20Palazzo)%20e%20gostaria%20de%20pedir%20informa%C3%A7%C3%B5es'
    }
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  let cycleTimer = null;
  const cycleDuration = 4200; // 4.2 segundos por look

  function updateMeta(idx) {
    const data = stylesData[idx];
    if (!data) return;

    if (fabricLabel) fabricLabel.textContent = data.fabric;
    if (lookTitle) lookTitle.textContent = data.title;
    if (lookSub) lookSub.textContent = data.sub;
    if (waChipText) waChipText.textContent = data.wa;
    if (waChip) waChip.href = data.waLink;

    // Atualiza abas interativas
    tabs.forEach((tab, i) => {
      const isActive = (i === idx);
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      // Reseta barra de progresso da aba ativa
      const fill = tab.querySelector('.tab-bar-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        if (isActive && !isReducedMotion) {
          // Força reflow para reiniciar a animação da barra
          void fill.offsetWidth;
          fill.style.transition = `width ${cycleDuration}ms linear`;
          fill.style.width = '100%';
        }
      }
    });
  }

  function spinToLook(targetIndex, direction = 1) {
    if (targetIndex === currentIndex || isTransitioning) return;
    isTransitioning = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[targetIndex];

    if (!currentSlide || !nextSlide) {
      isTransitioning = false;
      return;
    }

    if (isReducedMotion) {
      currentSlide.className = 'turntable-slide';
      nextSlide.className = 'turntable-slide active';
      currentIndex = targetIndex;
      updateMeta(currentIndex);
      isTransitioning = false;
      return;
    }

    // Define classes de transição 3D
    const outClass = direction > 0 ? 'spin-out-left' : 'spin-out-right';
    const inStartClass = direction > 0 ? 'spin-in-right' : 'spin-in-left';

    // Prepara o slide entrante
    nextSlide.className = `turntable-slide ${inStartClass}`;
    void nextSlide.offsetWidth; // Força reflow para registrar posição 3D inicial

    // Executa a rotação dos dois slides simultaneamente
    currentSlide.className = `turntable-slide ${outClass}`;
    nextSlide.className = 'turntable-slide active';

    currentIndex = targetIndex;
    updateMeta(currentIndex);

    // Conclui a transição após o tempo da animação CSS (850ms)
    setTimeout(() => {
      slides.forEach((slide, i) => {
        if (i !== currentIndex) {
          slide.className = 'turntable-slide';
        }
      });
      isTransitioning = false;
    }, 850);
  }

  function nextLook() {
    const nextIdx = (currentIndex + 1) % stylesData.length;
    spinToLook(nextIdx, 1);
  }

  function prevLook() {
    const prevIdx = (currentIndex - 1 + stylesData.length) % stylesData.length;
    spinToLook(prevIdx, -1);
  }

  function startCycle() {
    if (isReducedMotion) return;
    stopCycle();
    cycleTimer = setInterval(() => {
      nextLook();
    }, cycleDuration);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  // Event Listeners dos Botões Anterior e Próximo
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopCycle();
      prevLook();
      startCycle();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopCycle();
      nextLook();
      startCycle();
    });
  }

  // Cliques nas Abas
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetIdx = parseInt(tab.dataset.index, 10);
      if (isNaN(targetIdx) || targetIdx === currentIndex) return;

      stopCycle();
      const dir = targetIdx > currentIndex ? 1 : -1;
      spinToLook(targetIdx, dir);
      startCycle();
    });
  });

  // Navegação por Teclado (Acessibilidade)
  if (stageViewport) {
    stageViewport.setAttribute('tabindex', '0');
    stageViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        stopCycle();
        nextLook();
        startCycle();
      } else if (e.key === 'ArrowLeft') {
        stopCycle();
        prevLook();
        startCycle();
      }
    });

    // Suporte a Touch / Swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    stageViewport.addEventListener('touchstart', (e) => {
      stopCycle();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stageViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 45) {
        if (diffX > 0) {
          nextLook(); // swipe para a esquerda -> próximo look
        } else {
          prevLook(); // swipe para a direita -> look anterior
        }
      }
      startCycle();
    }, { passive: true });
  }

  // Pausa ao passar o mouse em computadores para contemplar a peça
  if (stage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stage.addEventListener('mouseenter', stopCycle);
    stage.addEventListener('mouseleave', startCycle);
  }

  // Inicialização
  updateMeta(0);
  startCycle();
}

/* ==========================================================================
   2. CONTADOR DE AVALIAÇÃO COM INTERSECTION OBSERVER (S3)
   ========================================================================== */
function initRatingCounter() {
  const ratingEl = document.getElementById('ratingNumber');
  if (!ratingEl) return;

  const targetNumber = 4.8;
  const duration = 1800; // 1.8 segundos

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateValue(ratingEl, 0.0, targetNumber, duration);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(ratingEl);

  function animateValue(obj, start, end, durationMs) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = (start + (end - start) * easeOut).toFixed(1);
      obj.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end.toFixed(1);
      }
    };
    window.requestAnimationFrame(step);
  }
}

/* ==========================================================================
   3. ACCORDION DE PERGUNTAS FREQUENTES (S4)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos os outros itens para manter elegância e foco
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Alterna o item atual
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
