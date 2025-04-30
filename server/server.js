const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결됨'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// 라우터 등록
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes); // 🔥 업로드 라우터 추가

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API 서버 작동 중!');
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});
