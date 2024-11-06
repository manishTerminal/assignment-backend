const Assignment = require("../models/assignment");

exports.getAssignments = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access. Only admins can view assignments." });
    }
    const assignments = await Assignment.find({ adminId: req.user._id })
      .populate('userId', 'username') 
      .select('task createdAt userId');
    if (assignments.length === 0) {
        return res.status(404).json({ error: "No assignments found." });
    }
    res.json(assignments);
  };

exports.acceptAssignment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ error: "Assignment ID is required." });
  }
  const assignment = await Assignment.findById(id);
  if (!assignment) {
      return res.status(404).json({ error: "Assignment not found." });
  }
  await Assignment.findByIdAndUpdate(id, { status: "accepted" });
  res.json({ message: "Assignment accepted" });
};

exports.rejectAssignment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ error: "Assignment ID is required." });
  }
  const assignment = await Assignment.findById(id);
  if (!assignment) {
      return res.status(404).json({ error: "Assignment not found." });
  }
  await Assignment.findByIdAndUpdate(id, { status: "rejected" });
  res.json({ message: "Assignment rejected" });
};
