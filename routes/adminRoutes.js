const express = require("express");
const { register, login } = require("../controllers/userController");
const {
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/assignments", authenticate, authorize("admin"), getAssignments);
router.post(
  "/assignments/:id/accept",
  authenticate,
  authorize("admin"),
  acceptAssignment
);
router.post(
  "/assignments/:id/reject",
  authenticate,
  authorize("admin"),
  rejectAssignment
);

module.exports = router;
