// src/pages/UploadPage.jsx

import React, { useState } from 'react'
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

export default function UploadPage() {
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

    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setResult(null)
    setGraphData(null)
    setSavedInfo(null)

    try {
      // ✅ 분석 요청
      const predictRes = await axios.post(
        'http://localhost:5050/predict',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          transformRequest: [
            (data, headers) => {
              headers.Authorization = `Bearer ${token}`
              return data
            },
          ],
        }
      )
      setResult(predictRes.data)

      // ✅ 그래프 데이터 요청
      const graphRes = await axios.get(
        `http://localhost:5050/graph-detail?filename=${encodeURIComponent(
          file.name
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setGraphData(graphRes.data)

      // ✅ userId 추출 후 분석 결과 저장
      const payload = JSON.parse(atob(token.split('.')[1]))
      const realUserId = payload.userId

      const saveRes = await axios.post(
        'http://localhost:5050/api/analysis/save',
        {
          filename: file.name,
          result: predictRes.data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setSavedInfo(saveRes.data.data)
    } catch (err) {
      console.error('❌ UploadPage: 분석/저장 중 오류 =', err)
      alert('분석 또는 저장 중 오류가 발생했습니다.')
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
      style={{ minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}
    >
      <h2>📤 PCAP 파일 업로드</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input type='file' accept='.pcap' onChange={handleFileChange} />
        <span style={{ marginLeft: '1rem', color: '#555' }}>
          {file?.name || '파일 선택'}
        </span>
        <button
          onClick={handleUpload}
          style={{
            marginLeft: '1rem',
            backgroundColor: btnColor,
            color: '#222',
            border: '1px solid #999',
            padding: '6px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setBtnColor('#a5a5a5')}
          onMouseLeave={() => setBtnColor('#f5f5f5')}
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
            backgroundColor: '#f9f9f9',
            color: '#222',
          }}
        >
          <h3>분석 결과</h3>
          <p>
            <strong>공격 유형:</strong>{' '}
            <span style={{ color: '#ff7070' }}>{result.attack}</span>
          </p>
          <p>
            <strong>설명:</strong> {result.description}
          </p>
          <p>
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
          </p>
        </div>
      )}

      {savedInfo?.createdAt && (
        <div style={{ marginTop: '2rem', color: '#444' }}>
          저장 완료됨: {new Date(savedInfo.createdAt).toLocaleString('ko-KR')}
        </div>
      )}

      {graphData && (
        <div style={{ marginTop: '3rem' }}>
          <h3>📊 주요 지표 시각화</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4>현재값 vs 정상 평균</h4>
              {barChartData?.length > 0 ? (
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
              <h4>피처 중요도</h4>
              {importanceData?.length > 0 ? (
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
