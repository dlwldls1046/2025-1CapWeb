import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Intro from './pages/Intro'
import PacketAnalysis from './pages/PacketAnalysis'
import PacketSearch from './pages/PacketSearch'
import AIIntro from './pages/AIIntro'
import Diagram from './pages/Diagram'
import MyPage from './pages/MyPage'
import Contact from './pages/Contact'
import UploadPage from './pages/UploadPage' // ✅ 추가
import Attack from './pages/Attack'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/packet-analysis' element={<PacketAnalysis />} />
        <Route path='/packet-search' element={<PacketSearch />} />
        <Route path='/ai-intro' element={<AIIntro />} />
        <Route path='/diagram' element={<Diagram />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/upload' element={<UploadPage />} /> {/* ✅ 여기 추가 */}
        <Route path='/attack' element={<Attack />} />
      </Routes>
    </Router>
  )
}

export default App
