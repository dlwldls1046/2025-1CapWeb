// routes/analysis.js

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const csv = require('csv-parser')
const jwt = require('jsonwebtoken')

const AnalysisResult = require('../models/AnalysisResult') // Mongoose 모델
const router = express.Router()

// Multer 설정: 임시 저장 폴더(uploads/)로 파일 업로드
const upload = multer({ dest: 'uploads/' })

// ▶︎ 1. 파일 업로드 및 CSV 파싱 (결과만 미리보기 형태로 반환)
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file

  if (!file) {
    return res.status(400).send('파일이 없습니다.')
  }

  // 로컬에 저장된 임시 파일 경로
  const filePath = path.join(__dirname, '..', file.path)
  const results = []

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV 파싱 결과 (첫 5줄):', results.slice(0, 5))

      // 1) 파싱한 일부 결과를 그대로 반환 (프론트엔드가 확인용으로 사용)
      res.json({
        message: '파일 업로드 및 파싱 성공!',
        preview: results.slice(0, 5),
        count: results.length,
        parsed: results, // ▶ 프론트에서 save 요청 시 이 데이터를 함께 보낼 수 있음
      })

      // 2) 임시 파일 삭제 (취사선택)
      fs.unlink(filePath, () => {})
    })
    .on('error', (err) => {
      console.error('CSV 파싱 실패:', err)
      res.status(500).send('CSV 파싱 실패')
    })
})

// ▶︎ 2. 분석 결과 저장 (JWT 검증 후, 토큰 payload의 userId를 저장)
router.post('/save', async (req, res) => {
  // 1) Authorization 헤더에서 Bearer 토큰 추출
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).send('Authorization 헤더가 없습니다.')
  }

  // “Bearer eyJhbGciOiJIUzI1NiIsInR…” 같은 형식
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res
      .status(401)
      .send('Authorization 헤더 형식이 잘못되었습니다. (Bearer <token>)')
  }
  const token = parts[1]

  let decoded
  try {
    // 2) JWT 검증 (서버 비밀키가 process.env.JWT_SECRET과 일치해야 함)
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.error('JWT 검증 실패:', err)
    return res.status(401).send('유효하지 않은 토큰입니다.')
  }

  // 3) 토큰 페이로드에서 실제 userId 추출
  const realUserId = decoded.userId // 로그인 시 token에 넣었던 값 ("이태" 등)
  console.log('>>> analysis.js: 토큰에서 추출한 realUserId =', realUserId)

  // 4) 프론트에서 보낸 filename / result 데이터
  const { filename, result } = req.body
  if (!filename || !result) {
    return res.status(400).send('filename 혹은 result가 누락되었습니다.')
  }

  // 5) MongoDB에 저장 (new AnalysisResult)
  try {
    const newRecord = new AnalysisResult({
      userId: realUserId,
      filename: filename,
      result: result, // 프론트에서 받아 온 JSON 객체
      createdAt: new Date(),
    })
    await newRecord.save()

    // 저장된 문서를 그대로 응답 (필요에 따라 필드 조정 가능)
    return res.json({
      message: '분석 결과 저장 성공!',
      data: newRecord,
    })
  } catch (err) {
    console.error('>>> analysis.js: 저장 실패:', err)
    return res.status(500).send('서버 오류로 저장 실패')
  }
})

module.exports = router
