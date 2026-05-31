const header = document.getElementById('header');

// Inicializar el header si no es el home
if (!document.body.classList.contains('page-home')) {
    header.classList.add('scrolled');
}

// --- Smart Header: ocultar al bajar, mostrar al subir ---
let lastScrollY = window.scrollY;
let headerHidden = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Lógica de scrolled (fondo blanco) para el home
    if (document.body.classList.contains('page-home')) {
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Lógica de ocultar/mostrar header
    // No ocultar si estamos en el tope de la página
    if (currentScrollY <= 100) {
        header.classList.remove('header-hidden');
        headerHidden = false;
    } else if (currentScrollY > lastScrollY && !headerHidden) {
        // Scrolleando hacia abajo → ocultar
        header.classList.add('header-hidden');
        headerHidden = true;
    } else if (currentScrollY < lastScrollY && headerHidden) {
        // Scrolleando hacia arriba → mostrar
        header.classList.remove('header-hidden');
        headerHidden = false;
    }

    lastScrollY = currentScrollY;
});

// Sombra dinámica opuesta al cursor sobre cada tarjeta retrato
document.querySelectorAll('.portrait-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (document.body.classList.contains('page-capacidades')) return;
        card.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    card.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('page-capacidades')) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const sx = (-dx * 0.14).toFixed(2);
        const sy = (-dy * 0.14).toFixed(2);
        card.style.boxShadow = `${sx}px ${sy}px 45px rgba(0, 0, 0, 0.45)`;
    });

    card.addEventListener('mouseleave', () => {
        if (document.body.classList.contains('page-capacidades')) return;
        card.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
});

// --- Menú hamburguesa (responsive) ---
(function() {
    // Crear botón hamburguesa
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.setAttribute('aria-label', 'Menú');
    hamburger.innerHTML = `
        <svg viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="2" x2="26" y2="2"/>
            <line x1="0" y1="10" x2="26" y2="10"/>
            <line x1="0" y1="18" x2="26" y2="18"/>
        </svg>
    `;

    // Crear panel de navegación móvil
    const panel = document.createElement('div');
    panel.className = 'mobile-nav-panel';
    panel.innerHTML = `
        <a href="nosotros.html">Nosotros</a>
        <a href="servicios.html">Servicios</a>
        <a href="proyectos.html">Proyectos</a>
        <a href="contacto.html">Contacto</a>
    `;

    // Insertar en el header-container
    const headerContainer = document.querySelector('.header-container');
    headerContainer.appendChild(hamburger);

    // Insertar panel dentro del header
    header.appendChild(panel);

    // Toggle del menú
    hamburger.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });

    // Cerrar menú al hacer click en un link
    panel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
        });
    });
})();
