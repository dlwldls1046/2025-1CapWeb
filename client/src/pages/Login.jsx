import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        setMsg(errorText)
        return
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      setMsg('로그인 성공!')
      navigate('/upload')
    } catch (err) {
      console.error('❌ 로그인 요청 실패:', err)
      setMsg('서버 오류로 로그인 실패')
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>로그인</h2>
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
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleLogin}
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
          로그인
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          계정이 없으신가요?{' '}
          <a href='/register' style={{ fontWeight: 'bold' }}>
            회원가입
          </a>
        </p>
        {msg && (
          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginPage
