import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const parsed = res.data.parsed;
      console.log('✅ 분석 결과:', parsed);
      setResult(parsed);

      // 👉 사용자 ID는 localStorage에서 토큰 decode하거나 가짜로 테스트 ID 사용
      const userId = '테스트UserID123'; // 실제로는 로그인한 유저 ID를 사용해야 함

      // ✅ 분석 결과 저장 요청
      await axios.post('http://localhost:5000/api/analysis/save', {
        userId: userId,
        filename: file.name,
        result: parsed,
      });

      console.log('✅ 결과 저장 완료');

    } catch (err) {
      console.error('❌ 업로드 실패:', err);
      alert('업로드 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📁 CSV 파일 업로드</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>
        업로드 및 저장
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>📊 분석 결과</h3>
          <pre>{JSON.stringify(result.slice(0, 5), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
