# CariGo

Full-stack ride-hailing / cab booking (Uber-clone style) project.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## Repository Structure

- `FRONTEND/` — React + Vite client app
- `BACKEND/` — Node/Express REST API

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

### 1) Clone the repo

```bash
git clone https://github.com/RohitBedwal/CariGo.git
cd CariGo
```

### 2) Setup & Run Backend

```bash
cd BACKEND
npm install
```

Create a `.env` file in `BACKEND/` (see **Environment Variables** below).

Run the backend:

```bash
npm run dev
```

Backend will start (see `BACKEND/server.js`).

### 3) Setup & Run Frontend

In a new terminal:

```bash
cd FRONTEND
npm install
npm run dev
```

Vite will print the local dev URL in the terminal.

## Environment Variables

Create `BACKEND/.env`:

```env
# Server
PORT=4000

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/carigo

# Auth
JWT_SECRET=your_secret_key
```

> Note: variable names may differ based on your implementation. Update this section to match your code.

## API Documentation

Backend API docs live here:
- `BACKEND/README.md`

## Available Scripts

### Backend (`BACKEND/package.json`)
- `npm run dev` — start backend with nodemon

### Frontend (`FRONTEND/package.json`)
- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Contributing

Contributions are welcome.
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

No license file found yet. Add a `LICENSE` file if you want to specify licensing.