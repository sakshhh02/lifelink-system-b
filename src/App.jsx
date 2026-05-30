import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import Verify from './pages/Verify';
import VerificationResult from './pages/VerificationResult';
import VerificationFailed from './pages/VerificationFailed';
import Share from './pages/Share';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vault" element={<Vault />} />
        <Route path="verify" element={<Verify />} />
        <Route path="verify/failed" element={<VerificationFailed />} />
        <Route path="verify/result/:documentId" element={<VerificationResult />} />
        <Route path="share" element={<Share />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
