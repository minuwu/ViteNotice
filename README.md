# ViteNotice
 
<!-- A simple, self-contained notice board application for RMSTU, built with the MERN stack (React, Express, Node.js) and Vite.

---

### One-Liner

A full-stack, single-repository notice board application featuring a React frontend, a Node.js/Express backend with file-based data storage, and hardcoded admin controls.

### Short Description

ViteNotice is a lightweight, full-stack notice board application designed as a simple showcase for RMSTU. It features a clean, functional interface for viewing announcements. The project is structured as a monorepo, containing both the Vite/React frontend and the Node.js/Express backend. The backend uniquely uses the local file system for creating, reading, and deleting notices, with administrative actions protected by a hardcoded login for simplicity.

### Long Description -->


This project serves as a practical demonstration of a full-stack application within a single repository. ViteNotice is a notice board system where users can view announcements relevant to RMSTU. The frontend is built with React and styled with Tailwind CSS, offering a responsive and modern user experience. The backend is a simple Express.js server that handles API requests for fetching, creating, and deleting notices.

A key characteristic of this project is its data persistence strategy. Instead of a traditional database, it leverages Node.js's file system module (`fs`) to read from and write to JSON files, simulating a database. This approach simplifies the setup and makes the project highly portable. Administrative tasks like adding or removing a notice are gated behind a basic, hardcoded authentication system within the backend code, making it a straightforward example for learning and demonstration purposes. The entire development environment is managed with a single `npm run dev` command, which uses `concurrently` to run both the frontend and backend servers simultaneously.

[**Visit the Live Site**](https://minuwu.github.io/ViteNotice/)

> **Note:** The live demo showcases the frontend's failsafe mechanism. Since the backend is not hosted, the application defaults to using your browser's `localStorage` for creating and deleting notices.


## Screenshots

<div align="center>

![viteNoticeSS](https://raw.githubusercontent.com/minuwu/ViteNotice/refs/heads/main/gitAssets/(466).png)

![viteNoticeSS](https://raw.githubusercontent.com/minuwu/ViteNotice/refs/heads/main/gitAssets/(463).png)


![viteNoticeSS](https://raw.githubusercontent.com/minuwu/ViteNotice/refs/heads/main/gitAssets/(465).png)


![viteNoticeSS](https://raw.githubusercontent.com/minuwu/ViteNotice/refs/heads/main/gitAssets/(464).png)


![viteNoticeSS](https://raw.githubusercontent.com/minuwu/ViteNotice/refs/heads/main/gitAssets/(467).png)

</div>


## Features

- **View Notices:** Clean and simple interface to display all current notices.
- **Admin Controls:** A separate path for admin login to manage content.
- **Create & Delete:** Admins can add new notices and delete existing ones.
- **File-Based "Database":** Uses local JSON files for data persistence, making it easy to set up and understand.
- **Monorepo Structure:** Frontend and backend code are managed in a single repository.
- **Responsive Design:** Built with Tailwind CSS for a great experience on any device.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, CORS
- **Development:** `concurrently` for running both client and server, ESLint for code quality.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/minuwu/ViteNotice
    cd ViteNotice
    ```

2.  **Install dependencies:**
    This command will install dependencies for both the root project, the React client, and the Express server.
    ```sh
    npm install
    ```

3.  **Run the development server:**
    This will start both the backend server (on `http://localhost:3001`) and the frontend Vite dev server (usually on `http://localhost:5173`).
    ```sh
    npm run dev
    ```

4.  **Open the app:**
    Navigate to the client URL provided in your terminal (e.g., `http://localhost:5173`) in your browser.
