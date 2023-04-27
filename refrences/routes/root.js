const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

router.get("^/$|index(.html)?", (req, res, next) => {
  res
    .status(200)
    .sendFile(
      fs.readFile(path.join(__dirname, "refrences", "public", "index.html"))
    );
  next();
});

module.exports = router;
