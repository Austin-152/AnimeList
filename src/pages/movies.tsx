import React, { useEffect, useState, type JSX } from 'react';
import Link from 'next/link';
import { SearchBox } from '@/components/search/searchbox';
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import TrendingList from "@/components/trends";
import { fetchTrendingV2, Item } from "@/app/api/api";
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

interface Movie {
  id: string;
  title: string;
  coverImage: string;
  rating?: number;
  year?: string;
  duration?: string;
  genre?: string[];
}

export default function Movies(): JSX.Element {
  const [trendingMovies, setTrendingMovies] = useState<Item[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  useEffect(() => {
    fetchTrendingV2(1, 30).then(setTrendingMovies);
  }, []); // 添加空数组作为依赖项，确保只在组件挂载时运行一次

  useEffect(() => {
    // TODO: Replace with your actual API call
    const fetchMovies = async () => {
      try {
        // const response = await fetch('/api/movies');
        // const data = await response.json();
        // setMovies(data);

        // Placeholder for now
        setMovies([]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const genres = ['All', 'Action', 'Romance', 'Comedy', 'Fantasy', 'Sci-Fi', 'Horror', 'Drama', 'Mystery'];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-5">
        <TrendingList title="电影" items={trendingMovies} gradientFrom="blue-500" gradientTo="purple-500" />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🎬</span>
            <h1 className="text-4xl md:text-6xl font-bold">Anime Movies</h1>
          </div>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-8">
            Explore an extensive collection of anime movies. From epic adventures to heartwarming stories.
          </p>
          <SearchBox placeholder="Search for movies..." />
        </div>
      </section>

      {/* Genre Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎯</span> Filter by Genre
          </h2>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all">
            <span>⭐</span> Top Rated
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all">
            <span>📅</span> Latest Release
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all">
            <span>🔥</span> A-Z
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all">
            <span>🎭</span> Most Popular
          </button>
        </div>
      </section>

      {/* Movies Grid Section */}
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
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Unable to load movies</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Try Again
            </button>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🧞‍♂️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No movies found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/video-page/${movie.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <div className="aspect-[2/3] bg-gradient-to-br from-indigo-200 to-purple-200">
                      {movie.coverImage && (
                        <Image
                          src={movie.coverImage}
                          alt={movie.title}
                          width={400}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-white text-sm">
                          {movie.duration && (
                            <span className="flex items-center gap-1">
                              ⏱️ {movie.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {movie.rating && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ⭐ {movie.rating}
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Movie
                    </div>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    {movie.year && <span>{movie.year}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Watch Anime Movies?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-xl font-bold mb-2">Complete Stories</h3>
              <p className="text-purple-100">Experience full narratives in one sitting without waiting for episodes.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2">Stunning Animation</h3>
              <p className="text-purple-100">Movie-quality animation with breathtaking visuals and details.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="text-xl font-bold mb-2">Diverse Genres</h3>
              <p className="text-purple-100">From action-packed adventures to emotional dramas and everything in between.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
