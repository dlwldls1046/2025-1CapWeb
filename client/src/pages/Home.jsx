import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          //background: '#f9fafb',
          paddingTop: '60px',
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
          <h1
            style={{ fontSize: '42px', fontWeight: 'bold', color: '#1e293b' }}
          >
            누구나 쉽게 사용할 수 있는 AI 기반 패킷 분석 플랫폼
          </h1>
          <p style={{ fontSize: '18px', marginTop: '20px', color: '#475569' }}>
            네트워크 보안, 더 이상 전문가만의 영역이 아닙니다.
          </p>
          <Link to='/intro'>
            <button
              style={{
                marginTop: '30px',
                padding: '12px 30px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              서비스 소개 보기
            </button>
          </Link>
        </div>

        {/* 요약 카드 섹션 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            padding: '40px 20px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { title: 'AI 탐지', desc: '보안 위협을 자동 분류' },
            {
              title: '초보자 가능',
              desc: '기술 지식이 없어도 바로 사용 가능',
            },
            {
              title: '마이페이지',
              desc: '개인 분석 기록 모아보기',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '280px',
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600' }}>
                {item.title}
              </h3>
              <p style={{ marginTop: '12px', color: '#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
