import {
  getEvents,
  registerUserToEvent,
  unregisterUserFromEvent,
  getUsers,
  deleteUser,
  updateUser
} from "../js/api.js";
import {
  getCurrentUser,
  logoutUser,
  isAdmin
} from "../js/auth.js";

// Show dashboard view
export async function showDashboard() {
  const app = document.getElementById("app");
  const user = getCurrentUser();

  // If user not logged in, redirect to login
  if (!user) {
    window.location.hash = "#/login";
    return;
  }

  let events = [];
  let users = [];

  // Load events and users (if admin)
  try {
    events = await getEvents();
    if (isAdmin()) {
      users = await getUsers();
    }
  } catch (error) {
    app.innerHTML = `<p>Error al cargar datos</p>`;
    return;
  }

  // Render dashboard HTML
  app.innerHTML = `
    <section class="dashboard">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Bienvenido, ${user.name}</h2>
        <button id="logoutBtn" class="logout">Cerrar sesión</button>
      </div>

      ${isAdmin() ? `<a href="#/dashboard/events/create" class="create-event-btn">+ Crear nuevo evento</a>` : ""}

      <div id="events-container">
        <h3>Eventos</h3>
        <br>
        ${events.map((event) => renderEvent(event, user)).join("")}
      </div>

      ${isAdmin() ? `
        <div id="users-container" style="margin-top:40px;">
          <h3>Usuarios Registrados</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${users.map((u) => `
                <tr>
                  <td>${u.name}</td>
                  <td>${u.email}</td>
                  <td>${u.role}</td>
                  <td>
                    <button class="edit-user" data-user-id="${u.id}">Editar</button>
                    <button class="delete-user" data-user-id="${u.id}">Eliminar</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>` : ""}
    </section>
  `;

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    logoutUser();
    window.location.hash = "#/login";
  });

  // Register to event
  document.querySelectorAll(".register-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = e.target.dataset.eventId;
      try {
        await registerUserToEvent(eventId, user.id);
        alert("Registro exitoso");
        showDashboard();
      } catch (err) {
        alert(err.message);
      }
    });
  });

  // Unregister (by user)
  document.querySelectorAll(".unregister-user-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = e.target.dataset.eventId;
      if (confirm("¿Seguro que quieres cancelar tu registro?")) {
        try {
          await unregisterUserFromEvent(eventId, user.id);
          alert("Registro cancelado");
          showDashboard();
        } catch (err) {
          alert("Error al cancelar registro");
        }
      }
    });
  });

  // Admin removes user from event
  document.querySelectorAll(".unregister-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = e.target.dataset.eventId;
      const userId = e.target.dataset.userId;
      if (confirm("¿Eliminar usuario del evento?")) {
        await unregisterUserFromEvent(eventId, userId);
        showDashboard();
      }
    });
  });

  // Admin deletes user from system
  document.querySelectorAll(".delete-user").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const userId = e.target.dataset.userId;
      if (confirm("¿Eliminar este usuario del sistema?")) {
        await deleteUser(userId);
        alert("Usuario eliminado");
        showDashboard();
      }
    });
  });

  // Admin edits user
  document.querySelectorAll(".edit-user").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const userId = e.target.dataset.userId;
      const newName = prompt("Nuevo nombre:");
      const newRole = prompt("Nuevo rol (user o admin):");
      if (!newName || !newRole) return;

      try {
        await updateUser(userId, { name: newName, role: newRole });
        alert("Usuario actualizado");
        showDashboard();
      } catch (err) {
        alert("Error al actualizar usuario");
      }
    });
  });
}

// Render a single event card
function renderEvent(event, user) {
  const isRegistered = event.registeredUsers?.includes(user.id);
  const isFull = event.registeredUsers.length >= event.capacity;
  const canRegister = !isRegistered && !isFull && user.role === "user";

  let adminExtras = "";
  if (isAdmin() && event.registeredUserDetails?.length > 0) {
    adminExtras = `
      <div class="registered-users">
        <strong>Registrados:</strong>
        <ul>
          ${event.registeredUserDetails.map(u => `
            <li>
              ${u.name} (${u.email})
              <button class="unregister-btn" data-event-id="${event.id}" data-user-id="${u.id}">Eliminar</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  const userAction = user.role === "user"
    ? (isRegistered
        ? `<button class="unregister-user-btn" data-event-id="${event.id}">Cancelar registro</button>`
        : `<button class="register-btn" data-event-id="${event.id}" ${canRegister ? "" : "disabled"}>Registrarse</button>`)
    : "";

  return `
    <div class="event-card">
      <h3>${event.name}</h3>
      <p><strong>Fecha:</strong> ${event.date}</p>
      <p><strong>Lugar:</strong> ${event.location}</p>
      <p><strong>Cupos:</strong> ${event.registeredUsers.length} / ${event.capacity}</p>
      ${userAction}
      ${isAdmin() ? `<a href="#/dashboard/events/edit?id=${event.id}">Editar</a>${adminExtras}` : ""}
    </div>
  `;
}