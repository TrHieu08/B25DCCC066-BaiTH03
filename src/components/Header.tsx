import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <header
      className={`sticky top-0 z-50 shadow-md transition-colors ${
        theme === 'light'
          ? 'bg-sky-600 text-white'
          : 'bg-slate-800 text-sky-300 border-b border-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Link className="text-2xl font-bold tracking-tight flex items-center gap-2" to="/">
          <span>🌊 ShopMini</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link className="px-3 py-1.5 rounded-lg hover:bg-white/15 transition" to="/">
            Trang chủ
          </Link>

          <Link className="px-3 py-1.5 rounded-lg bg-white text-sky-700 font-semibold hover:bg-sky-50 transition flex items-center gap-1.5 shadow-sm" to="/cart">
            <span>🛒 Giỏ hàng</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-sky-600 text-white">
              {totalQuantity}
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold">Xin chào, {user.username}</span>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-lg bg-sky-800 text-white hover:bg-sky-900 transition cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link className="px-3 py-1.5 rounded-lg border border-white/80 hover:bg-white/15 transition" to="/login">
              Đăng nhập
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer"
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;