const express = require("express");
const {
  register,
  login,
  uploadAssignment,
  getAllAdmins,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload", authenticate, authorize("user"), uploadAssignment);
router.get("/admins", authenticate, getAllAdmins);

module.exports = router;
