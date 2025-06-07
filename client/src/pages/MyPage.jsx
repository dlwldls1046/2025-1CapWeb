import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyPage() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5050/logs-json', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('📄 마이페이지 응답 데이터:', response.data)
        setLogs(response.data)
      } catch (err) {
        console.error('❌ 예측 로그 요청 실패:', err)
        alert('예측 로그를 불러오지 못했습니다.')
      }
    }

    fetchLogs()
  }, [])

  const handleDownload = async (filename) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      const res = await fetch(`http://localhost:5050/download/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('다운로드 실패')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (err) {
      console.error('❌ 다운로드 실패:', err)
      alert('CSV 파일 다운로드 중 오류가 발생했습니다.')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📑 나의 예측 이력</h2>

      {logs.length === 0 ? (
        <p>예측 기록이 없습니다.</p>
      ) : (
        <table
          style={{
            width: '100%',
            marginTop: '1rem',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={cellStyle}>시간</th>
              <th style={cellStyle}>파일명</th>
              <th style={cellStyle}>공격 유형</th>
              <th style={cellStyle}>위험도</th>
              <th style={cellStyle}>다운로드</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={cellStyle}>{log.timestamp}</td>
                <td style={cellStyle}>{log.filename}</td>
                <td style={cellStyle}>{log.attack}</td>
                <td style={cellStyle}>{log.risk_level}</td>
                <td style={cellStyle}>
                  <button
                    onClick={() => handleDownload(log.filename)}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    다운로드
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
}
