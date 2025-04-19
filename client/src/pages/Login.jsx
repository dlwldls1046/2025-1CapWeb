import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMsg(errorText);
        return;
      }

      const data = await res.json();
      console.log('✅ 로그인 성공! 받은 토큰:', data.token);
      setMsg('로그인 성공!');
      // 여기서 토큰 저장하거나 홈으로 이동 가능
      // localStorage.setItem('token', data.token);
      // navigate('/home');
    } catch (err) {
      console.error('❌ 로그인 요청 실패:', err);
      setMsg('서버 오류로 로그인 실패');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>로그인</button>
      <p>{msg}</p>
      <a href="/register">회원가입 하러 가기</a>
    </div>
  );
}

export default Login;
