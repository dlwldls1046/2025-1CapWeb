import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './pages/AuthContext'
//네브바, 푸터는 전체 페이지에 적용
import { Navbar, Footer } from './styles/Elements'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

import Intro from './pages/Intro'

import Diagram from './pages/Diagram'
import MyPage from './pages/MyPage'
import Contact from './pages/Contact'
import UploadPage from './pages/UploadPage'
import Attack from './pages/Attack'
import Members from './pages/Members'

function App() {
  const pageStyle = {
    background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <AuthProvider>
      <Router>
        <div style={pageStyle}>
          <Navbar />
          <div style={{ paddingTop: '70px', flex: 1 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />

              <Route path='/intro' element={<Intro />} />

              <Route path='/diagram' element={<Diagram />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/upload' element={<UploadPage />} />
              <Route path='/attack' element={<Attack />} />
              <Route path='/members' element={<Members />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
