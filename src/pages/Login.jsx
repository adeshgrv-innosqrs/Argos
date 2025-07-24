import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password || !role) {
      setError('All fields are required');
      return;
    }
    if (role !== 'annotator') {
      setError('Only Annotator login is enabled');
      return;
    }

    setError('');
    login({ username, role });
    navigate('/index');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F1FA] p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#00ABE4] mb-8">Argos Login</h2>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            >
              <option value="">Choose your role</option>
              <option value="annotator">Annotator</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              {role === 'annotator' ? 'Annotator ID' : 'Username'}
            </label>
            <input
              type="text"
              placeholder={role === 'annotator' ? 'Enter your annotator ID' : 'Enter your username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#00ABE4] text-white py-3 rounded-lg font-semibold hover:bg-[#008ec2] transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300">
            <FcGoogle className="text-xl" />
            <span className="font-medium">Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;