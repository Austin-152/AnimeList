import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* 品牌介绍 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-2">🎬</span>
              Anime Hub
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your ultimate destination for discovering and enjoying the best anime content. Join our community today!
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <span className="text-xl">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <span className="text-xl">▶️</span>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🔗</span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Home
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Trending
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Series
                </Link>
              </li>
            </ul>
          </div>

          {/* 分类 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📚</span>
              Categories
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">⚔️</span>Action
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">💕</span>Romance
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">😂</span>Comedy
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">🧙</span>Fantasy
              </li>
            </ul>
          </div>

          {/* 支持与帮助 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/report" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Report Issue
                </Link>
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">›</span>FAQ
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">›</span>Contact Us
              </li>
              <li className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center">
                <span className="mr-2">›</span>Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* 底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-2">
              © 2024 TZPro LLC. All rights reserved. 🌟
            </p>
            <p className="text-gray-500 text-xs">
              Keep exploring the anime universe! 🌌✨
            </p>
          </div>

          {/* 开发者信息 */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Crafted with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span className="text-gray-400">by</span>
            <a href="https://github.com/binaryYuki" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center font-semibold">
              Yuki
              <svg className="ml-1 w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.371 0 0 5.371 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.579 0-.285-.011-1.04-.016-2.042-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.494.998.108-.775.419-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.656 1.649.246 2.873.121 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.807 5.625-5.479 5.922.43.37.815 1.096.815 2.211 0 1.596-.014 2.884-.014 3.276 0 .32.19.694.8.576C20.565 21.798 24 17.303 24 12c0-6.629-5.371-12-12-12z"/>
              </svg>
            </a>
            <span className="text-gray-400">&</span>
            <a href="https://github.com/Austin-152" className="text-pink-400 hover:text-pink-300 transition-colors flex items-center font-semibold">
              Austin
              <svg className="ml-1 w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.371 0 0 5.371 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.579 0-.285-.011-1.04-.016-2.042-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.494.998.108-.775.419-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.656 1.649.246 2.873.121 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.807 5.625-5.479 5.922.43.37.815 1.096.815 2.211 0 1.596-.014 2.884-.014 3.276 0 .32.19.694.8.576C20.565 21.798 24 17.303 24 12c0-6.629-5.371-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 装饰性底部条 */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
    </footer>
  );
};

export default Footer;
