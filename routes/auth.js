const express = require("express");
const { login } = require("../controllers/userController");
const { refreshToken } = require("../controllers/refreshToken");

const router = express.Router();

router.post("/login", login);
router.get("/refresh-token", refreshToken);

module.exports = router;
