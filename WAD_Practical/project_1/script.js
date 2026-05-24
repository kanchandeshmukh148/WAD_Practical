// LOGIN
function login() {
    let u = document.getElementById("loginUser").value;
    let p = document.getElementById("loginPass").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user && u === user.username && p === user.password) {
        window.location = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}

// REGISTER
function register() {
    let u = document.getElementById("regUser").value;
    let p = document.getElementById("regPass").value;

    if (u === "" || p === "") {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ username: u, password: p }));
    alert("Registered!");
    window.location = "index.html";
}

// LOGOUT
function logout() {
    window.location = "index.html";
}

// NAVIGATION
function goBooking() {
    window.location = "booking.html";
}

function goDashboard() {
    window.location = "dashboard.html";
}

// ADD BOOKING
document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            addBooking();
        });
        load();
    }
});

function addBooking() {
    let name = document.getElementById("name").value;
    let room = document.getElementById("room").value;
    let checkin = document.getElementById("in").value;
    let checkout = document.getElementById("out").value;

    if (!name || !room || !checkin || !checkout) {
        alert("Fill all fields");
        return;
    }

    let data = JSON.parse(localStorage.getItem("bookings")) || [];

    let exists = data.find(b => b.room === room);
    if (exists) {
        alert("Room already booked!");
        return;
    }

    data.push({ name, room, checkin, checkout });
    localStorage.setItem("bookings", JSON.stringify(data));

    alert("Added!");
    load();
}

// LOAD BOOKINGS
function load() {
    let data = JSON.parse(localStorage.getItem("bookings")) || [];
    let list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((b, i) => {
        list.innerHTML += `
        <tr>
            <td>${b.name}</td>
            <td>${b.room}</td>
            <td>${b.checkin}</td>
            <td>${b.checkout}</td>
            <td><button onclick="del(${i})">Delete</button></td>
        </tr>`;
    });
}

// DELETE
function del(i) {
    let data = JSON.parse(localStorage.getItem("bookings"));
    data.splice(i, 1);
    localStorage.setItem("bookings", JSON.stringify(data));
    load();
}

// SEARCH
function searchBooking() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#list tr");

    rows.forEach(row => {
        let name = row.children[0].innerText.toLowerCase();
        row.style.display = name.includes(input) ? "" : "none";
    });
}