// GitHub Recent Projects Loader
async function loadRecentProjects() {
  const username = "romanmamrukov"; // Your GitHub username
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

  try {
    const response = await fetch(reposUrl);
    const repos = await response.json();

    const projectsList = document.getElementById("recent-projects-list");
    if (!projectsList) return; // Don't run if section not on page
    projectsList.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <img src="https://opengraph.githubassets.com/1/${username}/${repo.name}" alt="${repo.name}">
        <div class="project-card-content">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View Project</a>
        </div>
      `;
      projectsList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading GitHub projects:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('.section');
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.work-item');
  const rotatingText = document.getElementById('rotating-text');

  const texts = [
    "solutions for business",
    "technical resolutions",
    "websites",
    "3D scenes",
    "games",
    "personal pages",
    "tech tools"
  ];

  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Navbar color handling
  function setNavbarStyle(bgColor, textColor, burgerColor) {
    navbar.style.backgroundColor = bgColor;
    navbar.style.color = textColor;
    navLinks.style.backgroundColor = bgColor;

    navbar.querySelectorAll('a').forEach(link => link.style.color = textColor);
    navLinks.querySelectorAll('a').forEach(link => link.style.color = textColor);
    burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = burgerColor);
  }

  function updateNavbarColors(section) {
    if (section.classList.contains('about') || section.classList.contains('contact')) {
      setNavbarStyle('#fff', '#0A6873', '#0A6873');
    } else {
      setNavbarStyle('#043540', '#fff', '#50F268');
    }
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('sticky', scrollY > window.innerHeight);

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - navbar.offsetHeight && scrollY < sectionTop + sectionHeight) {
        updateNavbarColors(section);
      }
    });
  });

  updateNavbarColors(document.querySelector('.banner'));

  // Burger toggle
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Filter buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

  // Command line style typing effect
  const textNode = document.getElementById('rotating-text');
  const cursor = document.querySelector('.cursor');
  
  function typeEffect() {
    if (!textNode) return;
    
    const currentText = texts[index];
    const visibleText = currentText.substring(0, charIndex);

    textNode.textContent = visibleText;

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 100);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
      } else {
        isDeleting = false;
        index = (index + 1) % texts.length;
        setTimeout(typeEffect, 300);
      }
    }
  }

  typeEffect(); // Start typing effect

  // Load GitHub recent projects if section exists
  loadRecentProjects();
});
