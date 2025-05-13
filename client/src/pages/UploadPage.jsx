import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [savedInfo, setSavedInfo] = useState(null); // ✅ 저장 결과 상태 추가

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
      // ✅ Flask AI 서버에 POST 요청 (.pcap 분석)
      const res = await axios.post('http://localhost:5050/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ AI 분석 결과:', res.data);
      setResult(res.data);

      // ✅ 저장 요청
      const userId = '테스트UserID123';
      const saveRes = await axios.post('http://localhost:5000/api/analysis/save', {
        userId: userId,
        filename: file.name,
        result: res.data,
      });

      console.log('✅ 결과 저장 완료:', saveRes.data);
      setSavedInfo(saveRes.data.data); // 🔥 저장 결과를 상태에 기록

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

      {savedInfo && (
        <div style={{ marginTop: '2rem', color: 'green' }}>
          ✅ 저장 완료됨 ({new Date(savedInfo.createdAt).toLocaleString()})
        </div>
      )}
    </div>
  );
}

export default UploadPage;
