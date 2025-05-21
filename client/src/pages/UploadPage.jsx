import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts'

// ✅ 한글 변환 매핑
const featureNameMap = {
  mean_ip_len: '평균 IP 길이',
  std_ip_len: 'IP 길이 표준편차',
  syn_count: 'SYN 패킷 수',
  udp_port_variety: 'UDP 포트 다양성',
  tcp_port_variety: 'TCP 포트 다양성',
  tcp_seq_var: 'TCP 순서 변화량',
  icmp_type_8_ratio: 'ICMP Echo 비율',
  arp_reply_ratio: 'ARP 응답 비율',
  arp_src_ip_unique: 'ARP 출발지 IP 수',
  mean_udp_len: 'UDP 평균 길이',
  'ip.len': 'IP 길이',
  'ip.ttl': 'TTL 값',
  'tcp.seq': 'TCP 시퀀스 번호',
  'udp.length': 'UDP 길이',
}

function UploadPage() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [savedInfo, setSavedInfo] = useState(null)
  const [btnColor, setBtnColor] = useState('#bbb')
  const [graphData, setGraphData] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setResult(null)
    setGraphData(null)

    try {
      const predictRes = await axios.post(
        'http://localhost:5050/predict',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setResult(predictRes.data)

      const graphRes = await axios.get(
        `http://localhost:5050/graph-detail?filename=${file.name}`
      )
      setGraphData(graphRes.data)

      const userId = '테스트UserID123'
      const saveRes = await axios.post(
        'http://localhost:5000/api/analysis/save',
        {
          userId,
          filename: file.name,
          result: predictRes.data,
        }
      )
      setSavedInfo(saveRes.data.data)
    } catch (err) {
      console.error('❌ 분석 실패:', err)
      alert('분석 실패')
    }
  }

  const barChartData =
    graphData &&
    Object.entries(graphData.feature_comparison || {}).map(([key, value]) => ({
      name: featureNameMap[key] || key,
      현재값: value.current,
      정상평균: value.normal_avg,
    }))

  let importanceData =
    graphData &&
    Object.entries(graphData.feature_importance || {})
      .map(([key, value]) => ({
        name: featureNameMap[key] || key,
        value: value,
      }))
      .filter((item) => item.value > 0)

  if (importanceData && importanceData.length === 0) {
    importanceData = [{ name: '기본값', value: 1 }]
  }

  return (
    <div
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <h2>PCAP 파일 업로드</h2>
        <span style={{ color: '#777' }}>
          2025 캡스톤디자인 - AI 기반 보안 분석 시스템
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          padding: '1.5rem',
          borderRadius: '10px',
        }}
      >
        <input type='file' accept='.pcap' onChange={handleFileChange} />
        <span style={{ marginLeft: '1rem', color: '#555' }}>
          {file?.name || '파일 선택'}
        </span>
        <button
          onClick={handleUpload}
          onMouseEnter={() => setBtnColor('#a5a5a5')}
          onMouseLeave={() => setBtnColor('#f5f5f5')}
          style={{
            marginLeft: '1rem',
            backgroundColor: btnColor,
            color: '#222',
            border: '1px solid #999',
            padding: '6px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          분석 요청
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            border: '1px solid #888',
            borderRadius: '10px',
            backgroundColor: '#3a3a3a',
            color: '#eee',
          }}
        >
          <h3>분석 결과</h3>
          <div style={{ marginBottom: '0.8rem' }}>
            <strong>공격 유형:</strong>{' '}
            <span style={{ color: '#ff7070' }}>{result.attack}</span>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <strong>설명:</strong> <span>{result.description}</span>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <strong>위험도:</strong>{' '}
            <span
              style={{
                color:
                  result.risk_level === '높음'
                    ? '#ff5252'
                    : result.risk_level === '중간'
                    ? '#ffb74d'
                    : '#81c784',
              }}
            >
              {result.risk_level}
            </span>
          </div>
        </div>
      )}

      {savedInfo?.createdAt && (
        <div style={{ marginTop: '2rem', color: '#444' }}>
          저장 완료됨 ({new Date(savedInfo.createdAt).toLocaleString('ko-KR')})
        </div>
      )}

      {graphData && (
        <div style={{ marginTop: '3rem' }}>
          <h3>주요 지표 시각화</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4>현재값 vs 정상 평균</h4>
              {barChartData && barChartData.length > 0 ? (
                <BarChart width={500} height={300} data={barChartData}>
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='현재값' fill='#8884d8' />
                  <Bar dataKey='정상평균' fill='#82ca9d' />
                </BarChart>
              ) : (
                <p style={{ color: '#aaa' }}>
                  시각화할 비교 데이터가 없습니다.
                </p>
              )}
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4> 피처 중요도</h4>
              {importanceData && importanceData.length > 0 ? (
                <PieChart width={400} height={300}>
                  <Pie
                    data={importanceData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    fill='#ffb74d'
                    label
                    minAngle={10}
                    isAnimationActive={false}
                  />
                  <Tooltip />
                </PieChart>
              ) : (
                <p style={{ color: '#aaa' }}>중요 피처 데이터가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPage
