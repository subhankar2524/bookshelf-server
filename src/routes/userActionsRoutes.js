const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const { createBookmark, deleteBookmark, getBookmarks } = require("../controllers/userActionsController");

router.use(requireAuth);

router.post("/", createBookmark);
router.get("/bookmarks", getBookmarks);
router.delete("/:id", deleteBookmark);

module.exports = router;
