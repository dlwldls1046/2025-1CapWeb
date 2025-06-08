import { useState } from 'react'

function Register() {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [msg, setMsg] = useState('')

  const handleSignupRequest = async () => {
    if (!userId || !email || !password || !confirmPassword) {
      setMsg('모든 항목을 입력해주세요')
      return
    }
    if (password !== confirmPassword) {
      setMsg('비밀번호가 일치하지 않습니다')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        setMsg('코드 전송에 실패했습니다')
        return
      }

      const data = await res.json()
      setVerificationCode(data.code) // 실제 서비스에서는 제거해야 함
      setCodeSent(true)
      setMsg('이메일로 코드가 전송되었습니다')
    } catch (err) {
      console.error(err)
      setMsg('서버와의 연결에 실패했습니다')
    }
  }

  const handleRegister = async () => {
    if (!codeSent) {
      setMsg('이메일 인증을 먼저 진행해주세요')
      return
    }
    if (codeInput !== verificationCode) {
      setMsg('인증 코드가 일치하지 않습니다')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, password }),
      })

      const text = await res.text()
      setMsg(text)
    } catch (err) {
      console.error(err)
      setMsg('회원가입 중 오류 발생')
    }
  }

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '1.5rem' }}>회원가입</h2>
        <input
          type='text'
          placeholder='사용자 ID'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={inputStyle}
        />
        <input
          type='email'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        {!codeSent && (
          <button style={buttonStyle} onClick={handleSignupRequest}>
            회원가입하기
          </button>
        )}

        {codeSent && (
          <>
            <input
              type='text'
              placeholder='인증코드 입력'
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              style={inputStyle}
            />
            <button style={buttonStyle} onClick={handleRegister}>
              최종 회원가입
            </button>
          </>
        )}

        <p style={{ marginTop: '1rem', color: 'red' }}>{msg}</p>
      </div>
    </div>
  )
}

export default Register

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
}

const formStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
}

const inputStyle = {
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
}

const buttonStyle = {
  padding: '10px',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
}
