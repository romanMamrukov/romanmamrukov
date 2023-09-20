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

// Show/hide the back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});
