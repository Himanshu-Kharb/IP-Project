// Contact Form Handler
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Basic form validation
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill in all the fields.");
    } else {
        // Normally, you'd send this data to your server using AJAX
        alert(`Thanks for reaching out, ${name}! We'll get back to you shortly.`);
    }

    // Clear the form
    this.reset();
});
