document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.work-item');

    function updateNavbarColors(section) {
        if (section.classList.contains('about') || section.classList.contains('contact')) {
            navbar.style.backgroundColor = '#fff';
            navbar.style.color = '#0A6873';
            navLinks.style.backgroundColor = '#fff';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#0A6873');
            burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = '#0A6873');
            navLinks.querySelectorAll('a').forEach(line => line.style.color = '#0A6873');
        } else {
            navbar.style.backgroundColor = '#043540';
            navbar.style.color = '#fff';
            navLinks.style.backgroundColor = '#043540';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#fff');
            burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = '#50F268');
            navLinks.querySelectorAll('a').forEach(line => line.style.color = '#fff');
        }
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - navbar.offsetHeight && scrollY < sectionTop + sectionHeight) {
                updateNavbarColors(section);
            }
        });
    });

    // Set initial navbar colors based on the first section
    updateNavbarColors(document.querySelector('.banner'));

    // Burger menu toggle functionality
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
    
          // Remove active class from all buttons
          buttons.forEach(btn => btn.classList.remove('active'));
          // Add active class to the clicked button
          button.classList.add('active');
    
          items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
});