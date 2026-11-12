import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl border p-4 flex flex-col justify-between transition shadow-sm hover:shadow-md ${
        theme === 'light'
          ? 'bg-white border-sky-100 text-slate-800'
          : 'bg-slate-800 border-slate-700 text-slate-100'
      }`}
    >
      <div>
        <Link className="block" to="{`/products/${product.id}`}">
          <div className="h-48 bg-white rounded-lg p-4 flex items-center justify-center mb-3">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
            />
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 mb-2">
            {product.category}
          </span>
          <h3 className="font-semibold text-base line-clamp-2 mb-2 hover:text-sky-600 transition">
            {product.title}
          </h3>
        </Link>
      </div>

      <div className="pt-3 border-t border-sky-50 dark:border-slate-700 flex items-center justify-between gap-2 mt-2">
        <span className="text-lg font-bold text-sky-600">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition cursor-pointer"
        >
          + Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;