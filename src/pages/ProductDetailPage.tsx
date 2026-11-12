import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useTheme } from '../context/ThemeContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);
  const { theme } = useTheme();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading') {
    return (
      <div className="text-center py-12 text-sky-600 font-medium">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold mb-4">Không tìm thấy sản phẩm.</p>
        <Link className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition" to="/">
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 shadow-sm ${
        theme === 'light'
          ? 'bg-white border-sky-100'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      <Link className="inline-block mb-6 text-sm font-medium text-sky-600 hover:underline" to="/">
        ← Quay lại danh sách sản phẩm
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white rounded-xl p-6 flex items-center justify-center h-80 border border-sky-50">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div>
          <span className="inline-block text-xs font-semibold uppercase px-3 py-1 rounded-full bg-sky-100 text-sky-700 mb-3">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-sky-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm leading-relaxed opacity-85 mb-6">
            {product.description}
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition cursor-pointer shadow-sm"
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;