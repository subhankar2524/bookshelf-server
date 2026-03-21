const express = require("express");
const router = express.Router();

const { getBooks, getBookSummary, getBookData } = require("../controllers/bookController.js");

router.get("/", getBooks);
router.get("/:id", getBookData);
router.post("/summary", getBookSummary);

module.exports = router;