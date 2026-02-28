const express = require("express");
const router = express.Router();

const { resharePost } = require("../controllers/reshareController");

router.post("/:id", resharePost);

module.exports = router;