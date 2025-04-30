const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ✅ ObjectId → String (임시 테스트용)
  filename: { type: String, required: true },
  result: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AnalysisResult', analysisResultSchema);
