/* ==========================================================================
   SCRIPT.JS - Efeitos Interativos Sutis (50% Tech & 50% Psychedelic)
   - Canvas animado de partículas e ondas de dados
   - Ano automático no rodapé
   - Interatividade de hover com reflexo de luz
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar o ano dinamicamente no rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Alternância Interativa da Foto de Perfil com Flip 3D (Tech <-> Poesia)
  const avatarFlipCard = document.getElementById('avatar-flip-card');
  const avatarTagLabel = document.getElementById('avatar-tag-label');

  if (avatarFlipCard) {
    const handleAvatarFlip = () => {
      const isFlipped = avatarFlipCard.classList.toggle('is-flipped');
      if (avatarTagLabel) {
        avatarTagLabel.textContent = isFlipped ? 'NODE_02 // MENTE' : 'NODE_01 // TECH';
      }
    };

    avatarFlipCard.addEventListener('click', handleAvatarFlip);
    avatarFlipCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAvatarFlip();
      }
    });
  }

  // 3. Canvas Animado de Fundo: Fusão de Dados e Poeira Estelar
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const colors = [
    'rgba(0, 255, 136, ',   // Fósforo / Mint
    'rgba(56, 189, 248, ',   // Cyan Tech
    'rgba(192, 132, 252, ',  // Lilás Cósmico
    'rgba(244, 114, 182, ',  // Rosa Psicodélico
    'rgba(251, 191, 36, '    // Âmbar
  ];

  class NodeParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = this.colorBase + '0.8)';
      ctx.fill();
    }
  }

  // Quantidade balanceada para performance impecável
  const count = Math.min(Math.floor(window.innerWidth / 22), 55);
  for (let i = 0; i < count; i++) {
    particles.push(new NodeParticle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Conectar nós próximos com feixes sutis (efeito rede neural / circuitos)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }
  render();

  // 3. Efeito 3D Tilt sutil nos cartões ao mover o mouse (opcional)
  const cards = document.querySelectorAll('.portal-card, .avatar-column, .bio-column');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
