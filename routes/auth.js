const express = require("express");
const { login, logout } = require("../controllers/userController");
const { refreshToken } = require("../controllers/refreshToken");

const router = express.Router();

router.post("/login", login);
router.get("/refresh-token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
