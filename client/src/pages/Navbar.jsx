import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Navbar() {
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
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: '#000', // 검정색
          }}
        >
          캡스톤디자인
        </Link>
      </div>

      <input
        type='text'
        placeholder='공격 검색'
        style={{
          gridColumn: '3 / 6',
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#ddd',
          width: '100%',
        }}
      />

      <div style={{ gridColumn: '8 / 9' }}>
        <Link to='/upload' style={{ textDecoration: 'none', color: '#333' }}>
          패킷 탐지
        </Link>
      </div>

      <div
        style={{
          gridColumn: '9 / 11',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}
      >
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

export default Navbar
