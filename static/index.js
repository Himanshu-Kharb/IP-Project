// Signup Form Handler
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual submission
    const name = this.querySelector('input[type="text"]').value;
    alert(`Thanks for signing up, ${name}! (Connect this to backend)`);

    // Clear fields after submit
    this.reset();
});

// Login Form Handler
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual submission
    const email = this.querySelector('input[type="email"]').value;
    alert(`Welcome back, ${email}! (Backend login goes here)`);

    // Clear fields after submit
    this.reset();
});
