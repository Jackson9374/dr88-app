import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import SalesManagement from './pages/Sales/SalesManagement';
import AgentManagement from './pages/Agent/AgentManagement';
import Settlement from './pages/Settlement/Settlement';
import Notice from './pages/Notice/Notice';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// 인증 보호 컴포넌트
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 로그인 상태일 때 접근 제한
const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<Signup />} />

        {/* 인증이 필요한 라우트 */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
