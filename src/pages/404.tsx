import React from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      {/* 图片 */}
      <img
        src="/notFound.svg"
        alt="Page Not Found"
        className="w-64 h-64 mb-8 animate-bounce"
      />

      {/* 404 标题 */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-pulse">
        404
      </h1>

      {/* 描述 */}
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* 返回主页按钮 */}
      <Link
        href="/"
        className="px-6 py-3 text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
