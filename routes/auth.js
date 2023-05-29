const express = require("express");
const router = express.Router();
const { LoginUser, RegisterUser } = require("../controllers/auth");
router.post("/login", LoginUser);
router.post("/register", RegisterUser);
module.exports = router;
