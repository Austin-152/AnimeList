// pages/trending.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchBox } from '@/components/search/searchbox';
import 'tailwindcss/tailwind.css';

// interface AnimeItem {
//   id: string;
//   title: string;
//   coverImage: string;
//   rating?: number;
//   year?: string;
//   episodes?: number;
//   status?: string;
// }

export default function Trending() {
  const [trendingAnime, setTrendingAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with your actual API call
    const fetchTrendingAnime = async () => {
      try {
        // const response = await fetch('/api/trending');
        // const data = await response.json();
        // setTrendingAnime(data);

        // Placeholder for now
        setTrendingAnime([]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending anime');
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🔥</span>
            <h1 className="text-4xl md:text-6xl font-bold">Trending Now</h1>
          </div>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-8">
            Discover what&apos;s hot in the anime world right now. The most popular series everyone is watching.
          </p>
          <SearchBox placeholder="Search trending anime..." />
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-md">
              All
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all">
              Action
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all">
              Romance
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all">
              Comedy
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all">
              Fantasy
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all">
              Sci-Fi
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 rounded-xl aspect-[2/3] mb-3"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : trendingAnime.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No trending anime found</h3>
            <p className="text-gray-600">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingAnime.map((anime) => (
              <Link key={anime.id} href={`/video-page/${anime.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <div className="aspect-[2/3] bg-gradient-to-br from-purple-200 to-pink-200">
                      {anime.coverImage && (
                        <img
                          src={anime.coverImage}
                          alt={anime.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      🔥 Trending
                    </div>
                    {anime.rating && (
                      <div className="absolute bottom-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ⭐ {anime.rating}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {anime.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    {anime.year && <span>{anime.year}</span>}
                    {anime.episodes && <span>• {anime.episodes} eps</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <div className="text-purple-200">Total Views</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="text-purple-200">Trending Titles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-200">Active Viewers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Daily</div>
              <div className="text-purple-200">Updates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
