const express = require("express");
const {
  users,
  create,
  show,
  update,
  destroy,
} = require("../controllers/userController");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/", verifyToken, users);
router.post("/", create);
router.get("/:id", verifyToken, show);
router.patch("/:id", verifyToken, update);
router.delete("/:id", verifyToken, destroy);

module.exports = router;
