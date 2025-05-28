// src/styles/CommonElements.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../pages/AuthContext'

// ✅ 공통 스타일
export const pageStyle = {
  background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}

export const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '60px 20px 30px',
  fontFamily: 'sans-serif',
  lineHeight: '1.7',
}

export const titleStyle = {
  fontSize: '40px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '40px',
  color: '#1e293b',
}

export const sectionStyle = {
  backgroundColor: '#ffffffcc',
  padding: '30px',
  borderRadius: '14px',
  marginTop: '30px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease',
}

export const subtitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0f172a',
  marginBottom: '10px',
}

export const listStyle = {
  paddingLeft: '20px',
  marginTop: '10px',
  marginBottom: '10px',
}

export const ctaStyle = {
  display: 'inline-block',
  marginTop: '30px',
  backgroundColor: '#1e40af',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}

// ✅ Navbar 컴포넌트
export function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#eee',
        padding: '10px 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          gridColumn: '1 / 2',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none', color: '#000' }}>
          캡스톤디자인
        </Link>
      </div>

      {/* ✅ 오른쪽 버튼 영역 */}
      <div
        style={{
          gridColumn: '8 / 11',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}
      >
        <Link to='/upload' style={{ textDecoration: 'none', color: '#333' }}>
          패킷 탐지
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to='/mypage'
              style={{ textDecoration: 'none', color: '#333' }}
            >
              마이페이지
            </Link>
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                color: '#333',
                cursor: 'pointer',
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to='/login' style={{ textDecoration: 'none', color: '#333' }}>
              로그인
            </Link>
            <Link
              to='/register'
              style={{ textDecoration: 'none', color: '#333' }}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

// ✅ Footer 컴포넌트
export function Footer() {
  return (
    <footer
      style={{
        marginTop: '40px',
        padding: '15px 30px',
        backgroundColor: '#f1f1f1',
        color: '#444',
        textAlign: 'center',
        fontSize: '14px',
        borderTop: '1px solid #ccc',
      }}
    >
      © 2025 Capstone Design Project | 2조 [어떡하조]
    </footer>
  )
}
