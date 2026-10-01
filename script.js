// ================================
// LOGIN SYSTEM
// ================================

let loggedIn = localStorage.getItem("loggedIn") === "true";

let pendingFile = null;


// ================================
// OPEN LOGIN
// ================================

function openLogin() {
    document
        .getElementById("authModal")
        .classList.remove("hidden");

    showLogin();
}


// ================================
// CLOSE LOGIN
// ================================

function closeAuth() {
    document
        .getElementById("authModal")
        .classList.add("hidden");

    pendingFile = null;
}


// ================================
// CLICK OUTSIDE POPUP
// ================================

function outsideClose(event) {
    if (event.target.id === "authModal") {
        closeAuth();
    }
}


// ================================
// SHOW LOGIN
// ================================

function showLogin() {
    document
        .getElementById("loginForm")
        .classList.remove("hidden");

    document
        .getElementById("registerForm")
        .classList.add("hidden");
}


// ================================
// SHOW REGISTER
// ================================

function showRegister() {
    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("registerForm")
        .classList.remove("hidden");
}


// ================================
// DOWNLOAD BUTTON
// ================================

function downloadFile(filePath) {

    // Already logged in
    if (loggedIn) {
        startDownload(filePath);
        return;
    }

    // Save requested file
    pendingFile = filePath;

    // Open login popup
    openLogin();
}


// ================================
// ACTUAL DOWNLOAD
// ================================

function startDownload(filePath) {

    const link = document.createElement("a");

    link.href = filePath;

    link.download = "";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}


// ================================
// LOGIN
// ================================

function login() {

    const user =
        document
            .getElementById("loginUser")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (user === "" || password === "") {

        alert(
            "Please enter username/Gmail and password."
        );

        return;
    }


    // Demo login
    localStorage.setItem(
        "loggedIn",
        "true"
    );

    localStorage.setItem(
        "username",
        user
    );


    loggedIn = true;


    // Save file before closing popup
    const file = pendingFile;

    pendingFile = null;


    closeAuth();

    updateUI();


    alert("Login successful! 🎉");


    // Download selected file
    if (file) {
        startDownload(file);
    }
}


// ================================
// REGISTER
// ================================

function register() {

    const username =
        document
            .getElementById("registerUsername")
            .value
            .trim();

    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("registerPassword")
            .value;

    const confirm =
        document
            .getElementById("registerConfirm")
            .value;


    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirm === ""
    ) {

        alert(
            "Please fill in all fields."
        );

        return;
    }


    if (password !== confirm) {

        alert(
            "Passwords do not match!"
        );

        return;
    }


    // Demo registration
    localStorage.setItem(
        "loggedIn",
        "true"
    );

    localStorage.setItem(
        "username",
        username
    );

    localStorage.setItem(
        "email",
        email
    );


    loggedIn = true;


    // Save file before closing popup
    const file = pendingFile;

    pendingFile = null;


    closeAuth();

    updateUI();


    alert(
        "Account created successfully! 🎉"
    );


    // Download selected file
    if (file) {
        startDownload(file);
    }
}


// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");

    localStorage.removeItem("email");


    loggedIn = false;


    updateUI();


    alert(
        "You have been logged out."
    );
}


// ================================
// UPDATE LOGIN BUTTON
// ================================

function updateUI() {

    const loginButton =
        document.getElementById(
            "loginNavBtn"
        );

    const logoutButton =
        document.getElementById(
            "logoutNavBtn"
        );


    if (loggedIn) {

        loginButton.classList.add(
            "hidden"
        );

        logoutButton.classList.remove(
            "hidden"
        );

    } else {

        loginButton.classList.remove(
            "hidden"
        );

        logoutButton.classList.add(
            "hidden"
        );
    }
}


// ================================
// SEARCH
// ================================

function searchItems() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const items =
        document.querySelectorAll(
            ".searchable"
        );


    items.forEach(item => {

        const name =
            item
                .getAttribute("data-name")
                .toLowerCase();


        if (name.includes(query)) {

            item.style.display = "";

        } else {

            item.style.display = "none";
        }

    });
}


// ================================
// PAGE LOAD
// ================================

updateUI();
