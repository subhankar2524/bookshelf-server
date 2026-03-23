# 🚀 BookShelf Backend (Node.js)

This is the backend API for the BookShelf project. Follow the steps below to run it locally.

---
## Refer APIs.md file to see or test all the APIs

## Prerequisites

Make sure you have installed:

* Node.js (v16+ recommended)
* npm or yarn

---

## Clone the Repository

```bash
git clone https://github.com/subhankar2524/bookshelf-server
cd bookshelf-server
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create a `.env` file in the root directory example env file available as `.env.example`:

```
PORT=8080
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

---

## Run the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

---

## Server URL

```
http://localhost:8080
```

---

## Test the API

Open browser or Postman:

```
http://localhost:8080/
```

If everything is correct, you should get a response.

---

## Quick Summary

```bash
git clone <repo>
cd <project>
npm install
# add .env
npm run dev
```

---

That’s it. Server should be running locally