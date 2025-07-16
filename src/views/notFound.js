export function showNotFound() {
  const app = document.getElementById('app'); // Get main container

  // Set 404 message
  app.innerHTML = `
    <section class="not-found">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la ruta que buscas no existe o no está disponible.</p>
      <a href="#/dashboard">Volver al Dashboard</a>
    </section>
  `;
}