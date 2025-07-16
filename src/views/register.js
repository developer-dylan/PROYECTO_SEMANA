import { registerUser } from '../js/auth.js'; // Import register function

export function showRegister() {
  const app = document.getElementById('app'); // Select container

  // Set HTML form
  app.innerHTML = `
    <section class="register">
      <h2>Registro de Usuario</h2>
      <form id="register-form">
        <label for="name">Nombre completo:</label>
        <input type="text" id="name" placeholder="Juan Pérez" required />

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" placeholder="ejemplo@correo.com" required />

        <label for="password">Contraseña:</label>
        <input type="password" id="password" placeholder="••••••••" required />

        <button type="submit">Registrarse</button>
      </form>
      <p style="margin-top: 15px;">¿Ya tienes cuenta? <a href="#/login">Inicia sesión aquí</a></p>
    </section>
  `;

  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop reload

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const newUser = { name, email, password, role: "user" };

    try {
      await registerUser(newUser); // Try register
      alert("Registro exitoso. Inicia sesión.");
      window.location.hash = '#/login';
    } catch (error) {
      alert(error.message || "Error al registrarse.");
      console.error(error);
    }
  });
}