const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const { createBookmark, deleteBookmark } = require("../controllers/userActionsController");

router.use(requireAuth);

router.post("/", createBookmark);
router.delete("/:id", deleteBookmark);

module.exports = router;
