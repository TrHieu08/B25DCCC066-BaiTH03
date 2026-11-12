import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-extrabold text-sky-600 mb-4">404</h1>
      <p className="text-lg font-medium mb-6">
        Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition" to="/">
        Quay về Trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;