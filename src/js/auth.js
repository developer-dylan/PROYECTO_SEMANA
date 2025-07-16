const API_URL = "http://localhost:3000/users";

// Register new user (default role: "user")
export async function registerUser(newUser) {
if (!newUser.name || !newUser.email || !newUser.password) {
throw new Error("All fields are required.");
}

// Check if email is already in use
const existingUser = await fetch(`${API_URL}?email=${newUser.email}`);
const users = await existingUser.json();
if (users.length > 0) {
throw new Error("Email is already registered.");
}

const userToSave = {
name: newUser.name,
email: newUser.email,
password: newUser.password,
role: "user"
};

const response = await fetch(API_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(userToSave),
});

if (!response.ok) throw new Error("Error registering user.");
return await response.json();
}

// Login user and store in localStorage
export async function loginUser(email, password) {
const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
const users = await response.json();

if (users.length === 1) {
localStorage.setItem("currentUser", JSON.stringify(users[0]));
return users[0];
} else {
throw new Error("Invalid credentials.");
}
}

// Remove user session
export function logoutUser() {
localStorage.removeItem("currentUser");
}

// Get current logged-in user
export function getCurrentUser() {
return JSON.parse(localStorage.getItem("currentUser"));
}

// Check if user is logged in
export function isAuthenticated() {
return !!localStorage.getItem("currentUser");
}

// Check if current user is admin
export function isAdmin() {
const user = getCurrentUser();
return user && user.role === "admin";
}