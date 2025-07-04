import express from 'express';
import Syllabus from '../models/Syllabus.js';

const router = express.Router();

// Upload new syllabus
router.post('/upload', async (req, res) => {
  try {
    const { studentId, parentId, fileName, fileUrl, extractedText, academicYear, grade, board, subject } = req.body;

    const syllabus = new Syllabus({
      studentId,
      parentId,
      fileName,
      fileUrl,
      extractedText,
      academicYear,
      grade,
      board,
      subject,
    });

    await syllabus.save();

    res.json({ success: true, syllabus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get syllabi for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const syllabi = await Syllabus.find({ studentId: req.params.studentId });
    res.json({ success: true, syllabi });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

