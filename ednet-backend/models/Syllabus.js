import mongoose from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }, // optional
  fileName: String,
  fileUrl: String, // for future file storage URL if used
  extractedText: String,
  uploadDate: { type: Date, default: Date.now },
  academicYear: String,
  grade: String,
  board: String,
  subject: String,
});

export default mongoose.model('Syllabus', SyllabusSchema);

