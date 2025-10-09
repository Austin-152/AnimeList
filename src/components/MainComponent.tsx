import React, { useState } from 'react';
import { Alert } from 'antd';
import {SearchBox} from "@/components/search/searchbox";
import Link from 'next/link';

export function Index() {
  const [error] = useState<string | null>(null);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - 增强版 */}
        <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-50 py-20 md:py-32 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden">
          {/* 背景动画效果 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to Anime Hub
            </h1>
            <p className="text-lg md:text-2xl mt-4 max-w-3xl mx-auto text-gray-200 mb-8">
              Discover the latest and greatest anime series, movies, and more. Your ultimate destination for anime entertainment.
            </p>
            <SearchBox placeholder="Search for anime..." />

            {/* 快速链接按钮 */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href="/trending">
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
                  🔥 Trending Now
                </button>
              </Link>
              <Link href="/movies">
                <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
                  🎬 Movies
                </button>
              </Link>
              <Link href="/series">
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
                  📺 Series
                </button>
              </Link>
            </div>
          </div>
        </section>

        {error && <Alert message={error} type="error" showIcon className="mt-4" />}

        {/* 统计数据区块 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-3xl font-bold text-purple-600">10,000+</div>
                <div className="text-gray-600 mt-2">Anime Titles</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold text-pink-600">50,000+</div>
                <div className="text-gray-600 mt-2">Active Users</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-indigo-600">100,000+</div>
                <div className="text-gray-600 mt-2">Reviews</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-2">🌟</div>
                <div className="text-3xl font-bold text-yellow-600">24/7</div>
                <div className="text-gray-600 mt-2">Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* 特色功能区块 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Why Choose Anime Hub?</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Everything you need for the best anime experience</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  🚀
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast Updates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get the latest episodes and movies as soon as they're released. Never miss out on your favorite series.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  🎨
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">HD Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy crystal-clear streaming in high definition. Experience anime the way it was meant to be seen.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  💬
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join thousands of anime fans. Share reviews, recommendations, and connect with fellow enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 热门分类区块 */}
        <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Popular Categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Action', emoji: '⚔️', color: 'from-red-500 to-red-600' },
                { name: 'Romance', emoji: '💕', color: 'from-pink-500 to-pink-600' },
                { name: 'Comedy', emoji: '😂', color: 'from-yellow-500 to-yellow-600' },
                { name: 'Fantasy', emoji: '🧙', color: 'from-purple-500 to-purple-600' },
                { name: 'Sci-Fi', emoji: '🚀', color: 'from-blue-500 to-blue-600' },
                { name: 'Horror', emoji: '👻', color: 'from-gray-700 to-gray-800' },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`p-6 bg-gradient-to-br ${category.color} rounded-xl text-white text-center cursor-pointer hover:shadow-2xl transition-all transform hover:scale-110`}
                >
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <div className="font-semibold">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 行动号召区块 */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Anime Journey Today!</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join our community and explore thousands of anime titles. From classics to the latest releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trending">
                <button className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                  Browse Anime
                </button>
              </Link>
              <button className="px-10 py-4 bg-transparent border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
