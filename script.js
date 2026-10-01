```javascript
// ===============================
// LOGIN STATUS
// ===============================

let loggedIn = localStorage.getItem("loggedIn") === "true";


// ===============================
// DOWNLOAD
// ===============================

function downloadFile(fileName) {

    // Already logged in?
    if (loggedIn) {
        startDownload(fileName);
        return;
    }

    // Not logged in → show popup
    document.getElementById("authPopup").classList.remove("hidden");

    showLogin();
}


// ===============================
// ACTUAL DOWNLOAD
// ===============================

function startDownload(fileName) {

    const link = document.createElement("a");

    link.href = fileName;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}


// ===============================
// LOGIN
// ===============================

function login() {

    const user =
        document.getElementById("loginUser").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (user === "" || password === "") {

        alert("Please enter username/Gmail and password.");

        return;
    }


    // Demo login
    localStorage.setItem("loggedIn", "true");

    localStorage.setItem("username", user);

    loggedIn = true;


    alert("Login successful! 😎");

    closeAuth();

    updateUserArea();
}


// ===============================
// REGISTER
// ===============================

function register() {

    const username =
        document.getElementById("registerUsername").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirm =
        document.getElementById("registerConfirm").value;


    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirm === ""
    ) {

        alert("Please fill in all fields.");

        return;
    }


    if (password !== confirm) {

        alert("Passwords do not match!");

        return;
    }


    // Demo registration
    localStorage.setItem("loggedIn", "true");

    localStorage.setItem("username", username);

    localStorage.setItem("email", email);

    loggedIn = true;


    alert("Account created successfully! 🎉");

    closeAuth();

    updateUserArea();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");

    localStorage.removeItem("email");

    loggedIn = false;

    updateUserArea();

    alert("You have been logged out.");
}


// ===============================
// SHOW LOGIN
// ===============================

function showLogin() {

    document.getElementById("loginForm")
        .classList.remove("hidden");

    document.getElementById("registerForm")
        .classList.add("hidden");
}


// ===============================
// SHOW REGISTER
// ===============================

function showRegister() {

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("registerForm")
        .classList.remove("hidden");
}


// ===============================
// CLOSE POPUP
// ===============================

function closeAuth() {

    document.getElementById("authPopup")
        .classList.add("hidden");
}


// ===============================
// USER AREA
// ===============================

function updateUserArea() {

    const userArea =
        document.getElementById("userArea");

    const userText =
        document.getElementById("userText");


    if (loggedIn) {

        const username =
            localStorage.getItem("username");

        userText.textContent =
            "👋 Logged in as: " + username;

        userArea.classList.remove("hidden");

    } else {

        userArea.classList.add("hidden");
    }
}


// ===============================
// PAGE LOAD
// ===============================

updateUserArea();
```
