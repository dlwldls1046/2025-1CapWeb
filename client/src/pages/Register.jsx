import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSignupRequest = async () => {
    if (!email || !password || !confirmPassword) {
      setMsg('모든 항목을 입력해주세요');
      return;
    }
    if (password !== confirmPassword) {
      setMsg('비밀번호가 일치하지 않습니다');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('❌ 실패 응답:', text);
        setMsg('코드 전송에 실패했습니다');
        return;
      }

      const data = await res.json();
      console.log('✅ 인증코드 전송 성공', data);
      setVerificationCode(data.code); // 실제 서비스에서는 이 줄은 제거해야 함
      setCodeSent(true);
      setMsg('이메일로 코드가 전송되었습니다');
    } catch (err) {
      console.error('❌ 네트워크 오류:', err);
      setMsg('서버와의 연결에 실패했습니다');
    }
  };

  const handleRegister = async () => {
    if (!codeSent) {
      setMsg('이메일 인증을 먼저 진행해주세요');
      return;
    }
    if (codeInput !== verificationCode) {
      setMsg('인증 코드가 일치하지 않습니다');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();
      console.log('✅ 최종 회원가입 응답:', text);
      setMsg(text);
    } catch (err) {
      console.error('❌ 회원가입 요청 실패:', err);
      setMsg('회원가입 중 오류 발생');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /><br />

      {!codeSent && (
        <button onClick={handleSignupRequest}>회원가입하기</button>
      )}

      {codeSent && (
        <>
          <p>이메일로 코드가 전송되었습니다.</p>
          <input
            type="text"
            placeholder="인증코드 입력"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          /><br />
          <button onClick={handleRegister}>최종 회원가입</button>
        </>
      )}

      <p>{msg}</p>
    </div>
  );
}

export default Register;
