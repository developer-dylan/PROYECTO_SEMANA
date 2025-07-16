# Eventia – Event Management Web App

This is a single-page web application (SPA) for managing events in Colombia. Users can register, log in, and sign up for events. Admin users can create, edit, and delete events, and also manage users.

## Features

- User registration and login
- Role-based access (user/admin)
- Event creation and editing (admin only)
- Register and unregister to events (users)
- Admin can manage all users
- Responsive design for mobile, tablet, and desktop
- Dynamic routing with JavaScript
- JSON Server for API simulation

## Technologies

- HTML5, CSS3, JavaScript (ES6)
- JSON Server (fake backend)
- Vite (development server)

## How to Run This Project

### 1. Clone the repository

```bash
git clone https://github.com/developer-dylan/EVENTIA_SPA.git
cd EVENTIA_SPA
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### 4. Start the development server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
DylanMarin270/
├── public/
│   └── img/
│       └── logoeventia.webp
├── src/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── router.js
│   └── views/
│       ├── createEventView.js
│       ├── dashboard.js
│       ├── editEventView.js
│       ├── landing.js
│       ├── login.js
│       ├── notFound.js
│       └── register.js
├── database/ (si usas JSON Server, va tu db.json aquí)
├── index.html
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

## Roles

- **User**: Can register/login and join events
- **Admin**: Can manage events and users

## Responsive Design

The app adapts to:

- Mobile (<576px)
- Tablet (577px – 768px)
- Laptop (769px – 992px)
- Desktop (993px and up)

## Author

- Full Name Dylan Marin
- Clan: Caiman
- Email: marindylan762@gmail.com
- Number Identification: 1044618270
- Repository: https://github.com/developer-dylan/EVENTIA_SPA.git

---

> This is a demo project using fake data and not for production use.
