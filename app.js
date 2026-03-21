const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const userActionsRoutes = require("./src/routes/userActionsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/user-actions", userActionsRoutes);

module.exports = app;
