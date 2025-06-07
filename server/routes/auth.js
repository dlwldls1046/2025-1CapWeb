const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

// ✅ 인증코드 전송
router.post('/send-code', async (req, res) => {
  const { email } = req.body

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  console.log(`📧 ${email}에게 전송된 인증코드: ${code}`)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '회원가입 인증코드',
    text: `인증코드: ${code}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ code }) // 실제 서비스에서는 code 저장만 하고 응답 X
  } catch (err) {
    console.error(err)
    res.status(500).send('메일 전송 실패')
  }
})

// ✅ 회원가입
router.post('/register', async (req, res) => {
  const { userId, email, password } = req.body

  try {
    const existingEmail = await User.findOne({ email })
    if (existingEmail) return res.status(400).send('이미 등록된 이메일입니다')

    const existingUserId = await User.findOne({ userId })
    if (existingUserId)
      return res.status(400).send('이미 사용 중인 사용자 ID입니다')

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ userId, email, password: hashed })
    await user.save()

    res.send('회원가입 완료!')
  } catch (err) {
    console.error(err)
    res.status(500).send('회원가입 실패')
  }
})

// ✅ 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  console.log('>>> auth.js: /login 핸들러 진입') // ← 이 로그가 찍혀야 함

  try {
    const user = await User.findOne({ email })
    if (!user) {
      console.log('>>> auth.js: 사용자를 찾을 수 없음')
      return res.status(401).send('사용자를 찾을 수 없습니다')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('>>> auth.js: 비밀번호 불일치')
      return res.status(401).send('비밀번호가 일치하지 않습니다')
    }

    // 여기서 user.userId(예: "이태")가 제대로 들어오는지 확인
    console.log('>>> auth.js: user._id =', user._id)
    console.log('>>> auth.js: user.userId =', user.userId)

    const token = jwt.sign({ sub: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    console.log('>>> auth.js: 발급된 JWT (payload):', jwt.decode(token))

    return res.json({ token: token })
  } catch (err) {
    console.error(err)
    return res.status(500).send('서버 오류')
  }
})

module.exports = router
