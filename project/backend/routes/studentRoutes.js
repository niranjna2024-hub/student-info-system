const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


router.post("/", async (req, res) => {
  const { name, roll, email, department } = req.body;

  if (!name || !roll || !email || !department) {
    return res.status(400).json({ message: "All fields required" });
  }

  const student = new Student(req.body);
  const savedStudent = await student.save();
  res.json(savedStudent);
});

// UPDATE student (NEW - IMPORTANT)
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

module.exports = router;