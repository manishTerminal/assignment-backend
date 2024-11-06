const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Assignment = require("../models/assignment");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!["user", "admin"].includes(role))
    return res.status(400).json({ error: "Invalid role. Role must be 'user' or 'admin'." });

  if (username.trim() === "")
    return res.status(400).json({ error: "Username cannot be empty." });

  if (password.length < 8)
    return res.status(400).json({ error: "Password must be at least 8 characters long." });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(409).json({ error: "User already exists." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });

  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username.trim() === "")
    return res.status(400).json({ error: "Username cannot be empty." });

  if (password.length < 8)
    return res.status(400).json({ error: "Password must be at least 8 characters long." });

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({ error: "User not found." });

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials. Password does not match." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

exports.uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;
  if (task.trim() === "")
    return res.status(400).json({ error: "Task cannot be empty." });

  if (!adminId)
    return res.status(400).json({ error: "Admin ID is required." });

  const assignment = new Assignment({ userId: req.user._id, task, adminId });
  await assignment.save();
  res.status(201).json({ message: "Assignment uploaded successfully" });
};

exports.getAllAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" }, "username");
  if (admins.length === 0)
    return res.status(404).json({ error: "No admins found." });
  res.json(admins);
};
