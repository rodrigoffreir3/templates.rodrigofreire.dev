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
   1. HERO MANNEQUIN 3D CONTROLLER
   ========================================================================== */
function initHeroMannequin() {
  const rotor = document.getElementById('mannequinRotor');
  const outfits = document.querySelectorAll('.outfit-layer');
  const labels = document.querySelectorAll('.style-label-item');
  const dotBtns = document.querySelectorAll('.style-dot-btn');

  if (!rotor || outfits.length === 0) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let rotationDeg = 0;
  let intervalTimer = null;

  function setActiveStyle(index, animateRotation = true) {
    const prevIndex = currentIndex;
    currentIndex = index;

    if (!isReducedMotion && animateRotation) {
      // 1. Gira 90 graus no eixo Y (ocultando a silhueta no perfil 3D durante a troca)
      rotor.classList.remove('turning-in');
      rotor.classList.add('turning-out');

      // 2. Ao atingir o perfil lateral (450ms), troca de roupa e de texto
      setTimeout(() => {
        updateLayersAndText(currentIndex, prevIndex);

        // 3. Conclui a rotação voltando para a frente (0 graus) com a nova roupa exibida com perfeição
        rotor.classList.remove('turning-out');
        rotor.classList.add('turning-in');
      }, 450);
    } else {
      updateLayersAndText(currentIndex, prevIndex);
    }
  }

  function updateLayersAndText(curr, prev) {
    // Atualiza camadas de roupa (fade de opacidade e leve scale)
    outfits.forEach((outfit, i) => {
      if (i === curr) {
        outfit.classList.add('active');
      } else {
        outfit.classList.remove('active');
      }
    });

    // Atualiza texto sincronizado (fade-out sobe 18px, fade-in desce 18px)
    labels.forEach((label, i) => {
      if (i === curr) {
        label.classList.remove('exiting');
        label.classList.add('active');
      } else if (i === prev) {
        label.classList.remove('active');
        label.classList.add('exiting');
      } else {
        label.classList.remove('active', 'exiting');
      }
    });

    // Atualiza botões seletores
    dotBtns.forEach((dot, i) => {
      if (i === curr) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  function startCycle() {
    if (isReducedMotion) return;
    stopCycle();
    intervalTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % outfits.length;
      setActiveStyle(nextIndex, true);
    }, 1500); // 1.5s por rotação de 90° conforme SPEC-001 Seção 2.3
  }

  function stopCycle() {
    if (intervalTimer) {
      clearInterval(intervalTimer);
      intervalTimer = null;
    }
  }

  // Interação manual nos botões seletores de estilo
  dotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIndex = parseInt(btn.dataset.styleIndex, 10);
      if (targetIndex === currentIndex) return;

      stopCycle();
      setActiveStyle(targetIndex, true);
      // Retoma ciclo automático após 4 segundos de inatividade
      setTimeout(startCycle, 4000);
    });
  });

  // Pausa rotação ao passar o mouse em computadores para inspecionar a peça
  const stage = document.querySelector('.hero-stage');
  if (stage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stage.addEventListener('mouseenter', stopCycle);
    stage.addEventListener('mouseleave', startCycle);
  }

  // Inicia estado 0 e ativa ciclo
  setActiveStyle(0, false);
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
