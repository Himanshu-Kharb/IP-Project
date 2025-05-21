// Scroll-to-Top Button (appears when you scroll down)
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '30px';
scrollToTopButton.style.right = '30px';
scrollToTopButton.style.padding = '10px 15px';
scrollToTopButton.style.borderRadius = '50%';
scrollToTopButton.style.fontSize = '18px';
scrollToTopButton.style.backgroundColor = '#1abc9c';
scrollToTopButton.style.color = '#fff';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.display = 'none';
document.body.appendChild(scrollToTopButton);

// Show the button when scrolling down, hide when at the top
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links (if used in the future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
