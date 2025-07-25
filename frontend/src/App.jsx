// App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import ProtectedRoute from './routes/ProtectedRoute';
import DynamicIndexRoute from './routes/DynamicIndexRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/index"
          element={
            <ProtectedRoute>
              <DynamicIndexRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:serialNumber"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
