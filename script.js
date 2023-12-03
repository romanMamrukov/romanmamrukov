// Function to add a smooth scroll behavior
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Attach click event handlers to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', () => {
    smoothScroll('top'); // Replace 'home' with the ID of your top section
});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide the back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Accordion to show/hide work experince, education, skills
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// JavaScript to handle project categories and modals
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.getAttribute('data-category');
        filterProjects(selectedCategory);
    });
});

// Function to filter and display projects
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === category || category === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

     // Remove the 'active' class from all buttons
     document.querySelectorAll('.category').forEach(button => {
        modal.style.display = 'none';
        button.classList.remove('active');
    });

    // Add the 'active' class to the selected button
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

// Function to open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    if (modal) {
        modal.style.display = 'flex'; // Change to 'flex' for centering
        // document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

// Function to close project modal
function closeProjectModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    }
}

// Initialize modals to be hidden on page load
document.querySelectorAll('.project-modal').forEach(modal => {
    modal.style.display = 'none';
});

filterProjects('websites');
