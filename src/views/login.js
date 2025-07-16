import { loginUser } from '../js/auth.js';

export function showLogin() {
  const app = document.getElementById('app'); // Get main app container

  // Set login form HTML
  app.innerHTML = `
    <section class="login">
      <h2>Iniciar Sesión</h2>
      <form id="login-form">
        <label>Email:</label>
        <input type="email" id="email" required />
        <label>Contraseña:</label>
        <input type="password" id="password" required />
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes una cuenta? <a href="#/register">Regístrate</a></p>
    </section>
  `;

  const form = document.getElementById('login-form');

  // Handle form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      await loginUser(email, password); // Try to log in
      window.location.hash = '#/dashboard'; // Redirect on success
    } catch (error) {
      alert("Email o contraseña incorrectos."); // Show error message
      console.error(error);
    }
  });
}