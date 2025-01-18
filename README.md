# MERN ToDo App with Eisenhower Matrix

This repository contains a basic MERN application for task management using an Eisenhower Matrix approach. It supports user sign-up/login (JWT-based), creating tasks, and categorizing them into quadrants (urgent/important, etc.). The interface is built with React and Tailwind CSS, so it’s mobile-friendly out of the box.

---

## Project Overview

- **Stack:** Node.js, Express, MongoDB, React
- **Key Features:**
  - **User Auth (JWT):** Users can sign up and log in.
  - **Task Management:** Create, edit, and delete tasks.
  - **Eisenhower Matrix:** Organize tasks by urgency and importance.
  - **Responsive UI:** Tailwind CSS for a clean, mobile-friendly layout.

You’ll need to set up environment variables (like your MongoDB connection string and JWT secret) before running the app. Both `node_modules` and any local `.env` files are excluded from the repo for security and size reasons.

---

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/<user>/<repo>.git
   cd <repo>
   ```

2. **Install dependencies (server):**
   ```bash
   cd server
   npm install
   ```
3. **Install dependencies (client):**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

In the `server` folder, create a file called `.env` with something like:

```
MONGO_URI=mongodb://localhost:27017/todoMVP
JWT_SECRET=yourRandomSecretKey
PORT=3001
```

- `MONGO_URI` can point to a local MongoDB instance or MongoDB Atlas.
- `JWT_SECRET` is used to sign JWT tokens (use something secure).
- `PORT` is optional; defaults to `3001` if not set.

---

## Running the App

Make sure MongoDB is running or your Atlas connection is configured.

1. **Start the server:**

   ```bash
   cd server
   npm start
   ```

   If everything works, you’ll see logs like:

   ```
   ✅ Connected to MongoDB
   Server listening on port 3001
   ```

2. **Start the client:**
   ```bash
   cd ../client
   npm start
   ```
   Your browser should open at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Sign Up:** Create an account on the sign-up page.
- **Log In:** Log in to get a JWT, stored in `localStorage`.
- **Dashboard:** After logging in, you can create tasks and assign them to quadrants (1–4).
- **AddTask Page:** If the repo is set up that way, you can add tasks on a separate page. Otherwise, it’s integrated in the dashboard itself.

Tasks are saved in MongoDB. Edit or delete them directly in the dashboard.

---

## Troubleshooting

- **MongoDB Connection Errors:**  
  Check your `MONGO_URI` in the `.env` file. Make sure your database is up and reachable.
- **JWT Errors:**  
  Confirm `JWT_SECRET` is set in your `.env`. If you see authentication issues, verify you’re sending the token in the `Authorization` header.
- **CORS Issues:**  
  The server is configured for requests from `localhost:3000`. Adjust `cors` if needed.
- **Missing `.env`:**  
  If you forget to create your `.env`, you’ll run into connection or JWT errors.

---

## Deployment

You can deploy the client and server separately or use Docker. Common approaches:

- **Cloud providers** (AWS, Azure, GCP) with environment variables set in your service settings.
- **MongoDB Atlas** for the database (if you don’t want a local DB).
- **Any container service** if using Docker.

If you’re hosting your React app on a static service (like Netlify), point the API calls to wherever the server is hosted.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit and push your changes.
4. Open a Pull Request with a clear description of your changes.

---

## License

You can choose an open-source license (like MIT) for this project. Feel free to modify and distribute the code.

---

### Thanks for Checking Out the Project!

If you have questions or issues, feel free to open an issue or submit a pull request.
