import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const fromPath = state?.from?.pathname ?? '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate(fromPath, { replace: true });
    } else {
      setError('Tên đăng nhập không được để trống và mật khẩu phải là 123456');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div
        className={`rounded-2xl border p-8 shadow-sm ${
          theme === 'light'
            ? 'bg-white border-sky-100'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-2 text-center">
          Đăng nhập ShopMini
        </h1>
        <p className="text-xs text-center opacity-75 mb-6">
          Gợi ý: Nhập tên bất kỳ, mật khẩu là <strong>123456</strong>
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                theme === 'light'
                  ? 'bg-sky-50/50 border-sky-200'
                  : 'bg-slate-700 border-slate-600 text-white'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập 123456"
              className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                theme === 'light'
                  ? 'bg-sky-50/50 border-sky-200'
                  : 'bg-slate-700 border-slate-600 text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;