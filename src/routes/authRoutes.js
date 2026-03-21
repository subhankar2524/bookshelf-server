const express = require("express");
const router = express.Router();

const { signup, login, verify } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;
