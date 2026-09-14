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
   1. HERO MANNEQUIN HAUTE COUTURE CONTROLLER (ATELIER 3D)
   ========================================================================== */
function initHeroMannequin() {
  const rotor = document.getElementById('mannequinRotor');
  const outfits = document.querySelectorAll('.outfit-layer');
  const tabs = document.querySelectorAll('.style-tab');
  const fabricLabel = document.getElementById('fabricLabel');
  const realThumb = document.getElementById('realThumb');
  const realTitle = document.getElementById('realTitle');
  const realSub = document.getElementById('realSub');
  const waChip = document.getElementById('waChip');
  const waChipText = document.getElementById('waChipText');
  const stage = document.querySelector('.hero-stage');

  if (!rotor || outfits.length === 0) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stylesData = [
    {
      title: 'Casual Chic',
      fabric: 'Linho Italiano 100% Puro',
      realTitle: 'Casual Chic',
      realSub: 'Camisa Linho & Denim Reto',
      img: '/images/casual.webp',
      wa: 'Quero o Look Casual Chic no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Look%20Casual%20Chic%20no%20site%20e%20gostaria%20de%20saber%20tamanhos%20dispon%C3%ADveis'
    },
    {
      title: 'Festa & Gala',
      fabric: 'Seda Acetinada Marsala Fluida',
      realTitle: 'Vestido Gala Marsala',
      realSub: 'Decote Degagê com Fenda',
      img: '/images/festa.webp',
      wa: 'Quero o Vestido de Gala no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Vestido%20de%20Gala%20no%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es'
    },
    {
      title: 'Alfaiataria Executiva',
      fabric: 'Crepe Estruturado de Alfaiataria',
      realTitle: 'Tailleur Executivo',
      realSub: 'Blazer Fendi & Calça Reta',
      img: '/images/trabalho.webp',
      wa: 'Quero a Alfaiataria Executiva no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20da%20Alfaiataria%20Executiva%20no%20site%20e%20gostaria%20de%20conhecer%20os%20modelos'
    },
    {
      title: 'Athleisure Studio',
      fabric: 'Malha Canelada Seamless DryTech',
      realTitle: 'Conjunto Athleisure',
      realSub: 'Top Esmeralda & Legging',
      img: '/images/esporte.webp',
      wa: 'Quero o Conjunto Athleisure no WhatsApp',
      waLink: 'https://wa.me/5569999999999?text=Ol%C3%A1%2C%20gostei%20do%20Conjunto%20Athleisure%20no%20site%20e%20gostaria%20de%20pedir%20informa%C3%A7%C3%B5es'
    }
  ];

  let currentIndex = 0;
  let cycleTimer = null;
  const cycleDuration = 3600; // 3.6s de contemplação tranquila por look

  function updateElements(idx) {
    const data = stylesData[idx];

    // Atualiza camadas de roupa
    outfits.forEach((outfit, i) => {
      outfit.classList.toggle('active', i === idx);
    });

    // Atualiza abas interativas
    tabs.forEach((tab, i) => {
      const isActive = (i === idx);
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Atualiza dados contextuais
    if (fabricLabel) fabricLabel.textContent = data.fabric;
    if (realThumb) {
      realThumb.src = data.img;
      realThumb.alt = data.realTitle;
    }
    if (realTitle) realTitle.textContent = data.realTitle;
    if (realSub) realSub.textContent = data.realSub;
    if (waChipText) waChipText.textContent = data.wa;
    if (waChip) waChip.href = data.waLink;
  }

  function setLook(idx, animate = true) {
    if (idx === currentIndex && rotor.classList.contains('pivot-out')) return;
    currentIndex = idx;

    if (!isReducedMotion && animate) {
      // 1. Pivot de passarela elegante
      rotor.classList.remove('pivot-in');
      rotor.classList.add('pivot-out');

      // 2. Vértice suave da transição
      setTimeout(() => {
        updateElements(currentIndex);
        rotor.classList.remove('pivot-out');
        rotor.classList.add('pivot-in');
      }, 350);
    } else {
      updateElements(currentIndex);
    }
  }

  function startCycle() {
    if (isReducedMotion) return;
    stopCycle();
    cycleTimer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % stylesData.length;
      setLook(nextIdx, true);
    }, cycleDuration);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  // Interação manual nas abas
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetIndex = parseInt(tab.dataset.index, 10);
      if (targetIndex === currentIndex) return;

      stopCycle();
      setLook(targetIndex, true);
      startCycle();
    });
  });

  // Pausa ao passar o mouse em computadores para permitir inspeção atenta
  if (stage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stage.addEventListener('mouseenter', stopCycle);
    stage.addEventListener('mouseleave', startCycle);
  }

  // Inicia estado 0 e dá partida no ciclo
  setLook(0, false);
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
