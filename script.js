let progress = 0;
const progressBar = document.getElementById('progress-bar');
const percentageText = document.getElementById('percentage');
const loadingText = document.getElementById('loading-text');
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

const interval = setInterval(() => {
  if (progress < 100) {
    progress++;
    progressBar.style.width = progress + '%';
    percentageText.textContent = progress + '%';
  } else {
    clearInterval(interval);
    loadingText.textContent = '¡Listo!';
    setTimeout(() => {
      loader.style.display = 'none';
      mainContent.style.display = 'block';
    }, 1000); // espera 1 segundo
  }
}, 25);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(li => {
    li.classList.remove('active');
    const anchor = li.querySelector('a');
    if (anchor.getAttribute('href') === '#' + current) {
      li.classList.add('active');
    }
  });
});

const titles = ["Desarrollador Full Stack", "Ingeniero de Sistemas", "Desarrollador Web"];
let currentTitle = 0;
let charIndex = 0;
const typedText = document.getElementById("typed-text");

function typeTitle(title) {
  typedText.textContent = "";
  charIndex = 0;

  const interval = setInterval(() => {
    typedText.textContent += title.charAt(charIndex);
    charIndex++;

    if (charIndex === title.length) {
      clearInterval(interval);
      setTimeout(() => {
        currentTitle = (currentTitle + 1) % titles.length;
        typeTitle(titles[currentTitle]);
      }, 1550); // espera antes de mostrar el siguiente título
    }
  }, 120); // velocidad de escritura
}

document.addEventListener("DOMContentLoaded", () => {
  typeTitle(titles[currentTitle]);
});


/* ============================
  Script: sidebar móvil + toggle
  ============================ */

(function() {
  // Solo correr en navegador
  if (typeof document === 'undefined') return;

  // --- Crear botón toggle solo si no existe ---
  if (!document.querySelector('.menu-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.innerHTML = '☰';
    document.body.appendChild(toggle);
  }
  const toggleBtn = document.querySelector('.menu-toggle');

  // --- Crear overlay ---
  if (!document.querySelector('.mobile-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
  }
  const overlayEl = document.querySelector('.mobile-overlay');

  // --- Crear sidebar (si no existe) ---
  if (!document.querySelector('.mobile-sidebar')) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'mobile-sidebar';
    sidebar.setAttribute('aria-hidden', 'true');
    // Header interno de sidebar
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-title"></div>
        <button class="sidebar-close" aria-label="Cerrar menú"></button>
      </div>
    `;
    document.body.appendChild(sidebar);
  }
  const sidebarEl = document.querySelector('.mobile-sidebar');
  const closeBtn = sidebarEl.querySelector('.sidebar-close');

  // --- Clonar nav existente dentro de la sidebar ---
  function populateSidebar() {
    // eliminar nav anterior si ya fue poblado (evitar duplicados)
    const existingNav = sidebarEl.querySelector('nav');
    if (existingNav) existingNav.remove();

    // buscar tu nav principal (suponiendo que existe)
    const mainNav = document.querySelector('header nav');
    if (mainNav) {
      const cloneNav = mainNav.cloneNode(true);
      // mejorar enlaces para que cierren el menú al hacer click
      cloneNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          closeSidebar();
        });
      });
      sidebarEl.appendChild(cloneNav);
    } else {
      // fallback: crear enlaces básicos si no encuentra nav
      const fallbackNav = document.createElement('nav');
      fallbackNav.innerHTML = `
        <a href="#inicio">Inicio</a>
        <a href="#acerca">Acerca</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#servicios">Servicios</a>
      `;
      sidebarEl.appendChild(fallbackNav);
    }
  }

  // --- Abrir / cerrar lógica ---
  function openSidebar() {
    sidebarEl.classList.add('open');
    sidebarEl.setAttribute('aria-hidden', 'false');
    overlayEl.classList.add('show');
    // deshabilitar scroll del body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    // poner foco en el sidebar (accesibilidad)
    const firstLink = sidebarEl.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeSidebar() {
    sidebarEl.classList.remove('open');
    sidebarEl.setAttribute('aria-hidden', 'true');
    overlayEl.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    // devolver foco al toggle
    if (toggleBtn) toggleBtn.focus();
  }

  // --- Eventos ---
  toggleBtn.addEventListener('click', () => {
    // si el sidebar ya está abierto, cerrarlo
    if (sidebarEl.classList.contains('open')) {
      closeSidebar();
    } else {
      populateSidebar();
      openSidebar();
    }
  });

  closeBtn.addEventListener('click', closeSidebar);
  overlayEl.addEventListener('click', closeSidebar);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarEl.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Cuando el tamaño del viewport cambie: si es mayor a 480px cerramos y limpiamos
  function handleResize() {
    if (window.innerWidth > 480) {
      // asegurar que sidebar está cerrado y overlay oculto
      closeSidebar();
    }
  }
  window.addEventListener('resize', handleResize);

  // Inicial: si el ancho ya es <=480 mostramos toggle pero no abrimos aún
  handleResize();

})();

