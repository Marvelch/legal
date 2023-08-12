const { legals, create } = require("../controllers/legalController");
const express = require("express");

const router = express.Router();

router.get("/", legals);
router.post("/", create);
// router.get("/:id", verifyToken, show);
// router.patch("/:id", verifyToken, update);
// router.delete("/:id", verifyToken, destroy);

module.exports = router;
