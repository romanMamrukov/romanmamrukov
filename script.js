document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    function updateNavbarColors(section) {
        if (section.classList.contains('about') || section.classList.contains('contact')) {
            navbar.style.backgroundColor = '#fff';
            navbar.style.color = '#000';
            navLinks.style.backgroundColor = '#fff';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#000');
            burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = '#000');
            navLinks.querySelectorAll('a').forEach(line => line.style.color = '#000');
        } else {
            navbar.style.backgroundColor = '#000';
            navbar.style.color = '#fff';
            navLinks.style.backgroundColor = '#000';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#fff');
            burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = '#fff');
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

}); 
