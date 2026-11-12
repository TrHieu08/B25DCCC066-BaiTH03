import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  clearCart,
} from '../features/cart/cartSlice';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const { user } = useAuth();
  const { theme } = useTheme();

  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div
        className={`max-w-lg mx-auto rounded-2xl border p-8 text-center shadow-sm ${
          theme === 'light'
            ? 'bg-white border-sky-100'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-2xl font-bold text-sky-600 mb-2">
          Đặt hàng thành công!
        </h2>
        <p className="text-sm opacity-80 mb-6">
          Cảm ơn <strong>{user?.username}</strong> đã mua sắm tại ShopMini.
        </p>
        <Link className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition" to="/">
          Về Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto rounded-2xl border p-6 md:p-8 shadow-sm ${
        theme === 'light'
          ? 'bg-white border-sky-100'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-4">
        Thanh toán đơn hàng
      </h1>
      <p className="text-sm mb-6">
        Khách hàng: <strong>{user?.username}</strong>
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center py-6">
          <p className="mb-4">Không có sản phẩm nào để thanh toán.</p>
          <Link className="text-sky-600 font-semibold hover:underline" to="/">
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-sky-100 dark:divide-slate-700 mb-6">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="py-3 flex items-center justify-between text-sm"
              >
                <span className="line-clamp-1 pr-4">
                  {product.title} <strong>x{quantity}</strong>
                </span>
                <span className="font-semibold">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-sky-200 dark:border-slate-700 pt-4 mb-6 flex items-center justify-between">
            <span className="font-medium">
              Tổng cộng ({totalQuantity} sản phẩm):
            </span>
            <span className="text-2xl font-bold text-sky-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition cursor-pointer"
          >
            Đặt hàng
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;