document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    function updateNavbarColors(section) {
        if (section.classList.contains('about') || section.classList.contains('contact')) {
            navbar.style.backgroundColor = '#fff';
            navbar.style.color = '#000';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#000');
        } else {
            navbar.style.backgroundColor = '#000';
            navbar.style.color = '#fff';
            navbar.querySelectorAll('a').forEach(link => link.style.color = '#fff');
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

    const worksMenu = document.querySelector('.works-menu');
    const worksGallery = document.querySelector('.works-gallery');

    const worksData = [
        { category: 'web', title: 'Web Project 1', description: 'Description of Web Project 1' },
        { category: 'web', title: 'Web Project 2', description: 'Description of Web Project 2' },
        { category: 'mobile', title: 'Mobile Project 1', description: 'Description of Mobile Project 1' },
        { category: 'mobile', title: 'Mobile Project 2', description: 'Description of Mobile Project 2' },
        { category: 'design', title: 'Design Project 1', description: 'Description of Design Project 1' },
        { category: 'design', title: 'Design Project 2', description: 'Description of Design Project 2' }
    ];

    worksMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const category = e.target.getAttribute('data-category');
            filterWorks(category);
        }
    });

    function filterWorks(category) {
        worksGallery.innerHTML = '';
        const filteredWorks = worksData.filter(work => category === 'all' || work.category === category);
        filteredWorks.forEach(work => {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item', work.category);
            workItem.innerHTML = `
                <h3>${work.title}</h3>
                <p>${work.description}</p>
            `;
            worksGallery.appendChild(workItem);
        });
    }

    filterWorks('all'); // Default to show all works on page load
});
