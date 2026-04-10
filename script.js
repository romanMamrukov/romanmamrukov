// GitHub Recent Projects Loader
async function loadRecentProjects() {
  const username = "romanmamrukov"; // Your GitHub username
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

  try {
    const response = await fetch(reposUrl);
    const repos = await response.json();

    const projectsList = document.getElementById("recent-projects-list");
    if (!projectsList) return; 
    projectsList.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <img src="https://opengraph.githubassets.com/1/${username}/${repo.name}" alt="${repo.name}" loading="lazy" decoding="async">
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

// Blog Recent Post Loader
async function loadAllBlogPosts() {
  try {
    const response = await fetch("blog.json");
    if (!response.ok) throw new Error("Blog data not found");
    const posts = await response.json();

    // Sort posts by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // BLOG ARCHIVE PAGE
    const blogArchive = document.getElementById("blog-archive");
    const searchInput = document.getElementById("blog-search");
    const categoryFilter = document.getElementById("category-filter");

    if (blogArchive && searchInput && categoryFilter) {
      // Extract unique categories
      const categories = Array.from(new Set(posts.map(p => p.category))).filter(c => c);
      categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });

      function renderArchive(filteredPosts) {
        blogArchive.innerHTML = "";
        if (filteredPosts.length === 0) {
          blogArchive.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No posts found.</p>";
          return;
        }
        filteredPosts.forEach(post => {
          const card = document.createElement("div");
          card.className = "blog-card";
          card.innerHTML = `
            <div class="blog-card-content">
              <h3>${post.title}</h3>
              <p>${post.excerpt}</p>
              <a href="${post.url}">Read More →</a>
            </div>
          `;
          blogArchive.appendChild(card);
        });
      }

      function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filtered = posts.filter(post => {
          const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
          const matchesSearch = post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
          return matchesCategory && matchesSearch;
        });
        renderArchive(filtered);
      }

      renderArchive(posts);
      searchInput.addEventListener("input", filterPosts);
      categoryFilter.addEventListener("change", filterPosts);
    }

    // RECENT POSTS SECTION (MAIN PAGE)
    const recentBlogList = document.getElementById("recent-blog-list");
    if (recentBlogList) {
      recentBlogList.innerHTML = "";
      posts.slice(0, 3).forEach(post => { // show only latest 3
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
          <div class="blog-card-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="${post.url}">Read More →</a>
          </div>
        `;
        recentBlogList.appendChild(card);
      });
    }

  } catch (error) {
    console.error("Error loading blog posts:", error);
  }
}

// Works Loader
async function loadWorksData() {
  try {
    const response = await fetch("works.json");
    if (!response.ok) throw new Error("Works data not found");
    const works = await response.json();
    
    window.allWorks = works; // store for filtering

    const worksGallery = document.getElementById("works-gallery");
    if (worksGallery) {
      renderWorks(works, "all");
    }
  } catch(error) {
    console.error("Error loading works data:", error);
  }
}

function renderWorks(works, filter) {
  const worksGallery = document.getElementById("works-gallery");
  if(!worksGallery) return;
  worksGallery.innerHTML = "";
  
  const filteredWorks = filter === "all" ? works : works.filter(w => w.category === filter);
  
  filteredWorks.forEach(work => {
    const workItem = document.createElement("div");
    workItem.className = "work-item";
    workItem.dataset.category = work.category;
    
    let imgHTML = `<img src="${work.img}" alt="${work.alt}" loading="lazy" decoding="async">`;
    let descHTML = work.description.map(d => `<p>${d}</p>`).join("");
    let linksHTML = work.links.map(l => `<b><a href="${l.url}" target="_blank">${l.text}</a></b>`).join("<br><br>");
    
    workItem.innerHTML = `
      <h3>${work.title}</h3>
      ${imgHTML}
      ${descHTML}
      ${linksHTML}
    `;
    worksGallery.appendChild(workItem);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const buttons = document.querySelectorAll('.filter-btn');
  const rotatingText = document.getElementById('rotating-text');
  const views = document.querySelectorAll('.spa-view');

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

  // SPA Routing functionality
  function handleRoute() {
    let hash = window.location.hash;
    
    // Automatically close the intro screen if we navigate via hash
    if (hash && hash !== '' && hash !== '#home' || document.body.classList.contains('site-entered')) {
        document.body.classList.add('site-entered');
    } else if (hash === '#home') {
        // Just jumping back to top
        document.body.classList.add('site-entered');
    }

    // Hide all views
    views.forEach(v => v.classList.remove('active'));
    
    let targetView = document.getElementById('view-home'); // Default
    if (hash === '#view-works') {
      targetView = document.getElementById('view-works');
      window.scrollTo({top: 0, behavior: 'instant'});
    } else if (hash === '#view-blog') {
      targetView = document.getElementById('view-blog');
      window.scrollTo({top: 0, behavior: 'instant'});
    } else {
      targetView = document.getElementById('view-home');
      if (hash && hash !== '#home') {
        const el = document.querySelector(hash);
        if(el) el.scrollIntoView({behavior: 'smooth'});
      } else {
        window.scrollTo({top: 0, behavior: 'instant'});
      }
    }
    
    targetView.classList.add('active');
    
    // Close burger menu on navigation
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    
    updateNavbarColorsOnScroll(); // re-eval colors on view switch
  }

  window.addEventListener('hashchange', handleRoute);
  
  // Call once on load but add small timeout to let browser anchor jumps finish
  setTimeout(() => {
    if(window.location.hash) {
        handleRoute();
    }
  }, 50);

  // Navbar color handling
  function setNavbarStyle(bgColor, textColor, burgerColor) {
    if(!navbar) return;
    navbar.style.backgroundColor = bgColor;
    navbar.style.backdropFilter = "blur(10px)";
    navbar.style.WebkitBackdropFilter = "blur(10px)";
    navbar.style.color = textColor;
    if (navLinks) navLinks.style.backgroundColor = bgColor;

    navbar.querySelectorAll('a').forEach(link => link.style.color = textColor);
    navLinks.querySelectorAll('a').forEach(link => link.style.color = textColor);
    burger.querySelectorAll('div').forEach(line => line.style.backgroundColor = burgerColor);
  }

  function updateNavbarColorsOnScroll() {
    const scrollY = window.scrollY;
    if(navbar) navbar.classList.toggle('sticky', scrollY > 50);

    // Get visible sections within the active view
    const activeView = document.querySelector('.spa-view.active') || document;
    const viewSections = activeView.querySelectorAll('.section');
    
    let activeSection = null;
    viewSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - navbar.offsetHeight - 50 && scrollY < sectionTop + sectionHeight) {
        activeSection = section;
      }
    });
    
    if (activeSection) {
        if (activeSection.classList.contains('about') || activeSection.classList.contains('contact')) {
          setNavbarStyle('rgba(255, 255, 255, 0.90)', '#0A6873', '#0A6873');
        } else {
          setNavbarStyle('rgba(4, 53, 64, 0.90)', '#fff', '#50F268');
        }
    } else {
      setNavbarStyle('rgba(4, 53, 64, 0.90)', '#fff', '#50F268');
    }
  }

  window.addEventListener('scroll', updateNavbarColorsOnScroll);
  updateNavbarColorsOnScroll();

  // Burger toggle
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Filter buttons for Works Page
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      if(window.allWorks) {
        renderWorks(window.allWorks, filter);
      }
    });
  });

  // Command line style typing effect
  const textNode = document.getElementById('rotating-text');
  
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

  // Load external data
  loadRecentProjects();
  loadAllBlogPosts();
  loadWorksData();
});
