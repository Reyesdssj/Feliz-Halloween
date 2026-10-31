/* ==========================================================================
   INTERACTIVIDAD, ANIMACIONES Y MÁGICA HISTORIA
   Para Alexa • 4 Pantallas con Animación de Élite
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Referencias al DOM ---
  const particlesContainer = document.getElementById('particles-container');
  const heartsContainer = document.getElementById('hearts-container');
  const kawaiiPumpkin = document.getElementById('kawaii-pumpkin');

  // Botones
  const btnDulce = document.getElementById('btn-dulce');
  const btnBeso = document.getElementById('btn-beso');
  const btnToScreen3 = document.getElementById('btn-to-screen-3');
  const btnToScreen4 = document.getElementById('btn-to-screen-4');
  const btnRestart = document.getElementById('btn-restart');

  // Pantallas
  const screen1 = document.getElementById('screen-1');
  const screen2 = document.getElementById('screen-2');
  const screen3 = document.getElementById('screen-3');
  const screen4 = document.getElementById('screen-4');

  // --- 2. Generador de Partículas Flotantes (Luciérnagas Mágicas) ---
  function initMagicSparks() {
    if (!particlesContainer) return;
    const sparkCount = window.innerWidth < 480 ? 24 : 36;
    const colors = [
      '#ff7a00', // Naranja calabaza
      '#ffa433', // Naranja dorada
      '#a55eea', // Morado mágico
      '#c77dff', // Violeta brillante
      '#ff5e7e'  // Rosa tenue
    ];

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'magic-spark';

      // Dimensiones y posición aleatoria
      const size = Math.random() * 4 + 2; // 2px a 6px
      const posX = Math.random() * 100; // Porcentaje de pantalla
      const posY = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Parámetros de deriva para la animación
      const driftX = (Math.random() - 0.5) * 60 + 'px';
      const driftY = (Math.random() - 0.5) * 80 - 30 + 'px'; // Flotan preferentemente hacia arriba
      const duration = (Math.random() * 6 + 6).toFixed(1) + 's';
      const delay = (Math.random() * 5).toFixed(1) + 's';
      const baseAlpha = (Math.random() * 0.4 + 0.35).toFixed(2);
      const minAlpha = (Math.random() * 0.2 + 0.1).toFixed(2);

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${posX}vw`;
      spark.style.top = `${posY}vh`;
      spark.style.backgroundColor = color;
      spark.style.color = color;
      spark.style.setProperty('--drift-x', driftX);
      spark.style.setProperty('--drift-y', driftY);
      spark.style.setProperty('--duration', duration);
      spark.style.setProperty('--base-alpha', baseAlpha);
      spark.style.setProperty('--min-alpha', minAlpha);
      spark.style.animationDelay = delay;

      particlesContainer.appendChild(spark);
    }
  }

  initMagicSparks();

  // --- 3. Explosión de Corazones (Al presionar "Beso") ---
  function triggerHeartBurst(originX, originY) {
    if (!heartsContainer) return;
    const heartCount = 26;
    const heartSymbols = ['❤️', '💖', '✨', '🧡', '💜', '💕'];

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      // Ángulo y distancia radial aleatoria
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 160 + 50;
      const destX = Math.cos(angle) * distance + 'px';
      const destY = Math.sin(angle) * distance - 40 + 'px'; // Impulso ascendente
      const rot = (Math.random() - 0.5) * 90 + 'deg';
      const size = (Math.random() * 1.1 + 0.9).toFixed(2) + 'rem';
      const delay = (Math.random() * 0.15).toFixed(2) + 's';

      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;
      heart.style.setProperty('--dest-x', destX);
      heart.style.setProperty('--dest-y', destY);
      heart.style.setProperty('--rot', rot);
      heart.style.setProperty('--size', size);
      heart.style.animationDelay = delay;

      heartsContainer.appendChild(heart);

      // Eliminar del DOM después de terminar animación
      setTimeout(() => {
        heart.remove();
      }, 1600);
    }
  }

  // --- 4. Función de Transición Suave entre Pantallas ---
  function changeScreen(fromScreen, toScreen) {
    // Desvanecer pantalla saliente
    fromScreen.style.opacity = '0';
    fromScreen.style.transform = 'translateY(-15px)';

    setTimeout(() => {
      fromScreen.classList.remove('visible');
      fromScreen.classList.add('hidden');
      fromScreen.style.opacity = '';
      fromScreen.style.transform = '';

      // Entrar pantalla entrante (con animación @keyframes screenFloatUp)
      toScreen.classList.remove('hidden');
      void toScreen.offsetWidth; // Forzar reflow para reiniciar la animación
      toScreen.classList.add('visible');

      // Asegurar que el scroll empiece arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  }

  // --- 5. Lógica Pantalla 1 (¿Dulce o Beso?) ---

  // Botón "Dulce": La calabaza niega con la cabeza
  btnDulce.addEventListener('click', () => {
    if (!kawaiiPumpkin) return;
    
    // Reiniciar animación shake si ya estaba en curso
    kawaiiPumpkin.classList.remove('shake-head');
    void kawaiiPumpkin.offsetWidth;
    kawaiiPumpkin.classList.add('shake-head');

    setTimeout(() => {
      kawaiiPumpkin.classList.remove('shake-head');
    }, 700);
  });

  // Botón "Beso": Estallido de corazones y pase a Pantalla 2
  let isNavigating = false;

  btnBeso.addEventListener('click', (e) => {
    if (isNavigating) return;
    isNavigating = true;

    // Calcular posición del botón para centrar la explosión
    const rect = btnBeso.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Disparar corazones
    triggerHeartBurst(centerX, centerY);

    // Transición cinematográfica a Pantalla 2 tras 1 segundo
    setTimeout(() => {
      changeScreen(screen1, screen2);
      isNavigating = false;
    }, 1000);
  });

  // --- 6. Lógica Pantalla 2 (Chico Bestia & Raven -> Pantalla 3) ---
  btnToScreen3.addEventListener('click', () => {
    changeScreen(screen2, screen3);
  });

  // --- 7. Lógica Pantalla 3 (Los Celos -> Pantalla 4 Final) ---
  btnToScreen4.addEventListener('click', () => {
    changeScreen(screen3, screen4);
  });

  // --- 8. Lógica Pantalla 4 (Reinicio / Revivir Historia) ---
  btnRestart.addEventListener('click', () => {
    changeScreen(screen4, screen1);
  });
});
