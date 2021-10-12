const express = require("express");
const { getCategories, getCategoryByEnTitle } = require("../controllers/categories");

const router = express.Router();

router.get("/", getCategories);
router.get("/:enTitle", getCategoryByEnTitle);

module.exports = router;
