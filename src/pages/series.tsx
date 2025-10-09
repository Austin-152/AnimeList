import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchBox } from '@/components/search/searchbox';
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import 'tailwindcss/tailwind.css';

interface Series {
  id: string;
  title: string;
  coverImage: string;
  rating?: number;
  year?: string;
  episodes?: number;
  status?: 'Ongoing' | 'Completed' | 'Upcoming';
  season?: string;
}

export default function Series() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    // TODO: Replace with your actual API call
    const fetchSeries = async () => {
      try {
        // const response = await fetch('/api/series');
        // const data = await response.json();
        // setSeries(data);

        // Placeholder for now
        setSeries([]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load series');
        setLoading(false);
      }
    };

    fetchSeries();
  }, [filter]);

  const statusFilters = ['All', 'Ongoing', 'Completed', 'Upcoming'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">📺</span>
            <h1 className="text-4xl md:text-6xl font-bold">Anime Series</h1>
          </div>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mb-8">
            Dive into captivating anime series. Follow your favorite characters through epic storylines and adventures.
          </p>
          <SearchBox placeholder="Search for series..." />
        </div>
      </section>

      {/* Status Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> Filter by Status
          </h2>
          <div className="flex flex-wrap gap-3">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
                  filter === status
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'Ongoing' && '🔄 '}
                {status === 'Completed' && '✅ '}
                {status === 'Upcoming' && '🔜 '}
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔄</div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">120+</div>
                <div className="text-sm text-gray-600">Ongoing</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✅</div>
              <div>
                <div className="text-2xl font-bold text-teal-600">500+</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔜</div>
              <div>
                <div className="text-2xl font-bold text-cyan-600">25+</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎬</div>
              <div>
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Episodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Series Grid Section */}
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
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Unable to load series</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Try Again
            </button>
          </div>
        ) : series.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No series found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {series.map((item) => (
              <Link key={item.id} href={`/video-page/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <div className="aspect-[2/3] bg-gradient-to-br from-emerald-200 to-teal-200">
                      {item.coverImage && (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-white text-sm">
                          {item.episodes && (
                            <span className="flex items-center gap-1">
                              📺 {item.episodes} eps
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {item.status && (
                      <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Ongoing' ? 'bg-green-500 text-white' :
                        item.status === 'Completed' ? 'bg-blue-500 text-white' :
                        'bg-orange-500 text-white'
                      }`}>
                        {item.status === 'Ongoing' && '🔄 '}
                        {item.status === 'Completed' && '✅ '}
                        {item.status === 'Upcoming' && '🔜 '}
                        {item.status}
                      </div>
                    )}
                    {item.rating && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ⭐ {item.rating}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    {item.year && <span>{item.year}</span>}
                    {item.season && <span>• {item.season}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Watch Anime Series?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-lg font-bold mb-2">Deep Storylines</h3>
              <p className="text-teal-100 text-sm">Immerse yourself in complex narratives that develop over multiple episodes.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-lg font-bold mb-2">Character Growth</h3>
              <p className="text-teal-100 text-sm">Watch characters evolve and develop throughout their journey.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-bold mb-2">World Building</h3>
              <p className="text-teal-100 text-sm">Explore richly detailed worlds with intricate lore and history.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
              <div className="text-4xl mb-3">💫</div>
              <h3 className="text-lg font-bold mb-2">Weekly Episodes</h3>
              <p className="text-teal-100 text-sm">Join the community in anticipation of each new episode release.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
