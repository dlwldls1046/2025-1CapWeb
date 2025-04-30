const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const AnalysisResult = require('../models/AnalysisResult'); // ✅ 분석 결과 모델 추가

const router = express.Router();

// 임시 저장 폴더
const upload = multer({ dest: 'uploads/' });

// 파일 업로드 및 CSV 파싱
router.post('/', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('파일이 없습니다.');
  }

  const filePath = path.join(__dirname, '..', file.path);
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV 파싱 결과:', results.slice(0, 5)); // 일부 미리보기
      // TODO: 여기에서 AI 분석 로직 연결
      res.json({
        message: '파일 업로드 및 파싱 성공!',
        preview: results.slice(0, 5),
        count: results.length,
        parsed: results, // 👉 프론트에서 저장 요청할 때 이걸 넘기면 됨
      });

      fs.unlink(filePath, () => {}); // 임시 파일 삭제
    })
    .on('error', (err) => {
      console.error('CSV 파싱 실패:', err);
      res.status(500).send('CSV 파싱 실패');
    });
});

// 분석 결과 저장
router.post('/save', async (req, res) => {
  const { userId, filename, result } = req.body;

  if (!userId || !filename || !result) {
    return res.status(400).send('필수 값이 없습니다.');
  }

  try {
    const newRecord = new AnalysisResult({ userId, filename, result });
    await newRecord.save();
    res.json({ message: '저장 성공!' });
  } catch (err) {
    console.error('저장 실패:', err);
    res.status(500).send('서버 오류로 저장 실패');
  }
});

module.exports = router;
