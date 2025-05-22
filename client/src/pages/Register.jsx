import { useState } from 'react'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [msg, setMsg] = useState('')

  const handleSignupRequest = async () => {
    if (!email || !password || !confirmPassword) {
      setMsg('모든 항목을 입력해주세요.')
      return
    }

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!pwRegex.test(password)) {
      setMsg('비밀번호는 영문자 + 숫자 조합, 8자 이상이어야 합니다.')
      return
    }
    if (password !== confirmPassword) {
      setMsg('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.error('❌ 실패 응답:', text)
        setMsg('코드 전송에 실패했습니다')
        return
      }

      const data = await res.json()
      console.log('✅ 인증코드 전송 성공', data)
      setVerificationCode(data.code)
      setCodeSent(true)
      setMsg('이메일로 인증코드가 전송되었습니다.')
    } catch (err) {
      console.error('❌ 네트워크 오류:', err)
      setMsg('서버와의 연결에 실패했습니다')
    }
  }

  const handleRegister = async () => {
    if (!codeSent) {
      setMsg('이메일 인증을 먼저 진행해주세요.')
      return
    }
    if (codeInput !== verificationCode) {
      setMsg('인증코드가 일치하지 않습니다.')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const text = await res.text()
      setMsg(text)
    } catch (err) {
      console.error('❌ 회원가입 요청 실패:', err)
      setMsg('회원가입 중 오류 발생')
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>회원가입</h2>
        {!codeSent ? (
          <>
            <input
              type='email'
              placeholder='이메일 주소'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type='password'
              placeholder='비밀번호 확인'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleSignupRequest}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#111',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              인증코드 요청
            </button>
          </>
        ) : (
          <>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>
              이메일로 인증코드가 전송되었습니다.
            </p>
            <input
              type='text'
              placeholder='인증코드 입력'
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleRegister}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#111',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              회원가입 완료
            </button>
          </>
        )}
        {msg && (
          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
