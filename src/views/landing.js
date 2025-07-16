import { isAuthenticated } from '../js/auth.js';

export function showLanding() {
  // If user is already logged in, go to dashboard
  if (isAuthenticated()) {
    window.location.hash = '#/dashboard';
    return;
  }

  const app = document.getElementById('app'); // Get main app container

  // Set landing page HTML content
  app.innerHTML = `
    <section class="landing-container">
      <h1>Bienvenido a la Plataforma de Eventos más grandes de Colombia.</h1>
      <p>Administra tus eventos de forma sencilla y segura.</p>
      <div class="landing-buttons">
        <button id="btn-login">Iniciar Sesión</button>
        <button id="btn-register">Registrarse</button>
      </div>
    </section>
  `;

  // Button actions
  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.hash = '#/login';
  });

  document.getElementById('btn-register').addEventListener('click', () => {
    window.location.hash = '#/register';
  });
}