import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import SalesManagement from './pages/Sales/SalesManagement';
import AgentManagement from './pages/Agent/AgentManagement';
import Settlement from './pages/Settlement/Settlement';
import Notice from './pages/Notice/Notice';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  // 실제 서비스에서는 전역 상태 관리(Context/Redux)를 사용하겠지만, 
  // 여기서는 로컬 스토리지 기반의 간단한 예시로 구현합니다.
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 인증이 필요한 라우트 */}
        <Route path="/" element={isLoggedIn ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<SalesManagement />} />
          <Route path="agent" element={<AgentManagement />} />
          <Route path="settlement" element={<Settlement />} />
          <Route path="notice" element={<Notice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
