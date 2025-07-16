import { creatEven } from '../js/api.js';

// Show the create event form
export function showCreatEven() {
  const app = document.getElementById('app');

  // Set HTML content of the app
  app.innerHTML = `
    <header class="main-header">
      <div class="logo-container">
        <img src="./public/img/logoeventia.webp" alt="Logo Eventia" class="logo" />
        <a href="#/dashboard" class="site-title">Eventia</a>
      </div>
    </header>

    <section class="creat-even">
      <h2>Crear Nuevo Evento</h2>
      <form id="creat-even-form">
        <label for="name">Nombre del evento:</label>
        <input type="text" id="name" placeholder="Ej: Taller de JavaScript" required />

        <label for="date">Fecha:</label>
        <input type="date" id="date" required />

        <label for="location">Lugar:</label>
        <input type="text" id="location" placeholder="Ej: Medellín" required />

        <label for="capacity">Capacidad:</label>
        <input type="number" id="capacity" placeholder="Ej: 100" required min="1" />

        <button type="submit" class="create-btn">Crear Evento</button>
      </form>
    </section>

    <footer class="main-afooter">
      <p>&copy; 2025 Eventia. Todos los derechos reservados.</p>
    </footer>
  `;

  // Handle form submission
  const form = document.getElementById('creat-even-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Build new event object
    const newEvent = {
      name: document.getElementById('name').value.trim(),
      date: document.getElementById('date').value,
      location: document.getElementById('location').value.trim(),
      capacity: parseInt(document.getElementById('capacity').value),
      registeredUsers: []
    };

    // Try to create event
    try {
      await creatEven(newEvent);
      alert("Evento creado con éxito.");
      window.location.hash = '#/dashboard';
    } catch (error) {
      alert("Error al crear el evento.");
      console.error(error);
    }
  });
}