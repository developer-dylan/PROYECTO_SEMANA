const API_BASE = "http://localhost:3000";

// Get all events with full user details
export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Error getting events");
  const events = await res.json();

  for (const event of events) {
    event.registeredUserDetails = [];

    for (const userId of event.registeredUsers || []) {
      const userRes = await fetch(`${API_BASE}/users/${userId}`);
      if (userRes.ok) {
        const user = await userRes.json();
        event.registeredUserDetails.push(user);
      }
    }
  }
  
  return events;
}

// Get a single event by ID
export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error("Event not found");
  return await res.json();
}

// Create new event
export async function creatEven(eventData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...eventData,
      registeredUsers: [],
    }),
  });
  if (!res.ok) throw new Error("Error creating event");
  return await res.json();
}

// Update event
export async function updateEvent(id, data) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error updating event");
  return await res.json();
}

// Delete event
export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting event");
}

// Register user to event
export async function registerUserToEvent(eventId, userId) {
  const event = await getEventById(eventId);

  if (event.registeredUsers.includes(userId)) {
    throw new Error("Already registered.");
  }

  if (event.registeredUsers.length >= event.capacity) {
    throw new Error("Event is full.");
  }

  const updatedUsers = [...event.registeredUsers, userId];

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registeredUsers: updatedUsers }),
  });

  if (!res.ok) throw new Error("Error registering");
  return await res.json();
}

// Remove user from event
export async function unregisterUserFromEvent(eventId, userId) {
  const event = await getEventById(eventId);

  const updatedUsers = event.registeredUsers.filter((id) => id !== userId);

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registeredUsers: updatedUsers }),
  });

  if (!res.ok) throw new Error("Error removing user from event");
}

// Get all users
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Error getting users");
  return await res.json();
}

// Delete user
export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting user");
}

// Update user
export async function updateUser(userId, data) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error updating user");
  return await res.json();
}
