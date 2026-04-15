import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PredictionProvider } from './context/PredictionContext';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { PreviewPage } from './pages/PreviewPage';
import { ResultsPage } from './pages/ResultsPage';
import { LastInvestigationPage } from './pages/LastInvestigationPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <PredictionProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
            <Route path="preview" element={<ProtectedRoute><PreviewPage /></ProtectedRoute>} />
            <Route path="results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
            <Route path="last" element={<ProtectedRoute><LastInvestigationPage /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PredictionProvider>
    </AuthProvider>
  );
}
