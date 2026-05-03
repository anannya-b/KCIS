import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewAssessment from './pages/NewAssessment';
import Processing from './pages/Processing';
import Result from './pages/Result';
import History from './pages/History';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-assessment" element={<NewAssessment />} />
            <Route path="processing" element={<Processing />} />
            <Route path="result" element={<Result />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
