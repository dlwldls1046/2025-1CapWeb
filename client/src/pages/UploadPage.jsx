import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 업로드 및 분석 요청
  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // ✅ Flask AI 서버에 POST 요청 보내기 (.pcap 파일 분석)
      const res = await axios.post('http://localhost:5050/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ AI 분석 결과:', res.data);
      setResult(res.data);

      // ✅ 필요 시 DB 저장도 가능 (주석 해제 후 사용)
      /*
      const userId = '테스트UserID123';
      await axios.post('http://localhost:5000/api/analysis/save', {
        userId: userId,
        filename: file.name,
        result: res.data,
      });
      console.log('✅ 결과 저장 완료');
      */

    } catch (err) {
      console.error('❌ 분석 실패:', err);
      alert('분석 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📁 PCAP 파일 업로드</h2>
      <input type="file" accept=".pcap" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>
        분석 요청
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>📊 분석 결과</h3>
          <p><strong>공격 유형:</strong> {result.attack}</p>
          <p><strong>설명:</strong> {result.description}</p>
          <p><strong>위험도:</strong> {result.risk_level}</p>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
