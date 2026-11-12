import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/product/productSlice';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className={`rounded-2xl p-6 mb-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          theme === 'light'
            ? 'bg-white border-sky-100'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
            Danh sách sản phẩm
          </h1>
          <p className="text-sm opacity-75">
            Khám phá các sản phẩm chất lượng tại ShopMini
          </p>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              theme === 'light'
                ? 'bg-sky-50/50 border-sky-200 text-slate-800'
                : 'bg-slate-700 border-slate-600 text-white'
            }`}
          />
        </div>
      </div>

      {status === 'loading' && (
        <div className="text-center py-12 text-sky-600 font-medium">
          Đang tải danh sách sản phẩm...
        </div>
      )}

      {status === 'failed' && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-center">
          Lỗi: {error}
        </div>
      )}

      {status === 'succeeded' && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 opacity-75">
              Không tìm thấy sản phẩm nào phù hợp với từ khoá "{searchTerm}".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;