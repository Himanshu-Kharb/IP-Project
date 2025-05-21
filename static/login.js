// Login Form Handler
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic form validation
    if (email === "" || password === "") {
        alert("Please fill in both fields.");
    } else {
        // You can add AJAX requests here to send data to your Flask backend
        alert(`Welcome back, ${email}! (This would normally log you in)`);
    }

    // Reset form
    this.reset();
});
