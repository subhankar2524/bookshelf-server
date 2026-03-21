const express = require("express");
const router = express.Router();

const { getBooks, getBookSummary } = require("../controllers/bookController.js");

router.get("/books", getBooks);
router.post("/summary", getBookSummary);

module.exports = router;