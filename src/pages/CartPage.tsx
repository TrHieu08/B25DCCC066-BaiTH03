import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import { useTheme } from '../context/ThemeContext';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const { theme } = useTheme();

  if (cartItems.length === 0) {
    return (
      <div
        className={`rounded-2xl border p-10 text-center ${
          theme === 'light'
            ? 'bg-white border-sky-100'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        <h2 className="text-xl font-bold mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm opacity-75 mb-6">
          Hãy chọn thêm sản phẩm từ cửa hàng nhé!
        </p>
        <Link className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition" to="/">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
          Giỏ hàng ({totalQuantity} sản phẩm)
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="px-3 py-1.5 rounded-lg text-sm border border-red-300 text-red-600 hover:bg-red-50 transition cursor-pointer"
        >
          Xoá toàn bộ giỏ
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map(({ product, quantity }) => (
          <div
            key={product.id}
            className={`rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${
              theme === 'light'
                ? 'bg-white border-sky-100'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain bg-white p-1.5 rounded-lg border border-sky-50"
              />
              <div>
                <Link className="font-semibold hover:text-sky-600 line-clamp-1" to="{`/products/${product.id}`}">
                  {product.title}
                </Link>
                <p className="text-sm text-sky-600 font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-sky-200 rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.id, quantity: quantity - 1 })
                    )
                  }
                  className="px-3 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.id, quantity: quantity + 1 })
                    )
                  }
                  className="px-3 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="font-bold w-20 text-right">
                ${(product.price * quantity).toFixed(2)}
              </span>

              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`rounded-xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'light'
            ? 'bg-white border-sky-100'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        <div>
          <p className="text-sm opacity-75">
            Tổng số lượng: <strong>{totalQuantity}</strong>
          </p>
          <p className="text-xl font-bold text-sky-600">
            Tổng tiền: ${totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition cursor-pointer"
        >
          Tiến hành Thanh toán →
        </button>
      </div>
    </div>
  );
};

export default CartPage;