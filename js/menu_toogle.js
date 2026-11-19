const menuToggle = document.querySelector('.menu-toggle');
      const headerNav = document.querySelector('.header-nav');
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('activo');
        headerNav.classList.toggle('activo');
      });
      document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('activo');
          headerNav.classList.remove('activo');
        });
      });