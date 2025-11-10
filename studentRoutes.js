
import express from "express";
import Student from "../models/studentModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post("/", async (req, res) => {
  const { name, email, course } = req.body;
  const student = new Student({ name, email, course });
  await student.save();
  res.json({ message: "Student added successfully!" });
});

export default router;
