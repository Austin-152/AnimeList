// pages/index.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import React, { useCallback, useState, useEffect } from 'react';
import { fetchSearchResults, fetchTrendingV2, fetchKeywordSuggestions, Item } from '@/app/api/api';
import { type LogtoContext } from '@logto/next';
import useSWR from 'swr';
import Navbar from './nav';
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import TrendingList from '@/components/trends';

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function Index() {
  useEffect(() => {
    const imageUrls = [
      'https://s2.loli.net/2024/09/02/1HJGwBEmPztjuqV.png',
      'https://s2.loli.net/2024/09/02/KzLYndJyPIuZeNX.png',
      'https://s2.loli.net/2024/09/02/H6xcZrlyU3YG4hg.png',
      'https://s2.loli.net/2024/09/02/P5EuMjwSD8YNc3V.png',
      'https://s2.loli.net/2024/09/02/I2Ds8ectFn4dmrq.png',
      'https://s2.loli.net/2024/09/02/Fknt4aT2dGrUJyA.png',
      'https://s2.loli.net/2024/09/02/aWtusRi7fIZ58DH.png',
      'https://s2.loli.net/2024/09/02/dDUSTu83tYBclsM.png',
      'https://s2.loli.net/2024/09/02/BbgRAQ8dVt9UmTn.png',
      'https://s2.loli.net/2024/09/02/Yl6WpiEw5b2cOV1.png'
    ];

    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const [trendingMovies, setTrendingMovies] = useState<Item[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<Item[]>([]);
  const [trendingVarietyShows, setTrendingVarietyShows] = useState<Item[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Item[]>([]);

  useEffect(() => {
    fetchTrendingV2(1).then(setTrendingMovies);
    fetchTrendingV2(2).then(setTrendingTVShows);
    fetchTrendingV2(3).then(setTrendingVarietyShows);
    fetchTrendingV2(4).then(setTrendingAnime);
  }, []);

  const handleSearch = async (event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event?.preventDefault();

    try {
      setIsLoading(true);
      setData([]);
      setSuggestions([]);
      const results = await fetchSearchResults(keyword, "1", 10);
      if (!Array.isArray(results.data)) {
        console.error("failed to fetch suggestion");
      }

      const data = results.data.reduce((acc: Item[], item: { list: Item[] | null }) => acc.concat(item.list || []), []);
      setData(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
      setSuggestions([]);
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    if (newKeyword) {
      debouncedFetchSuggestions(newKeyword);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(event);
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (keyword: string) => {
    const newSuggestions = await fetchKeywordSuggestions(keyword);
    setSuggestions(newSuggestions);
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 1000), [fetchSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setSuggestions([]);
    handleSearch().then(r => console.log(r));
  };

  const LoginURL = `${process.env.BaseURL}/api/auth/login`;
  const { data: userData } = useSWR<LogtoContext>('/api/logto/user');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section
          className="bg-gray-950 text-gray-50 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tighter"
            onMouseEnter={(e) => e.currentTarget.classList.add('animate-bounce')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('animate-bounce')}
          >
            Welcome to Anime Hub
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl text-center">
            Discover the latest and greatest anime series, movies, and more.
          </p>
          <form className="mt-8 w-full max-w-xl flex" onSubmit={handleSearch}>
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                className="bg-gray-800 border-gray-700 text-gray-50 pl-12 pr-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-700 relative z-10"
                placeholder="Search for anime..."
                type="search"
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />

              {/*联想搜索*/}
              {suggestions.length > 0 && (
                <div
                  className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 divide-y divide-gray-700 rounded-lg mt-1 z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 text-white hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Search
            </button>
          </form>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-20">
              <div className="flex items-center overflow-hidden">
                <div className="flex animate-scroll">
                  {[
                    'https://s2.loli.net/2024/09/02/1HJGwBEmPztjuqV.png',
                    'https://s2.loli.net/2024/09/02/KzLYndJyPIuZeNX.png',
                    'https://s2.loli.net/2024/09/02/H6xcZrlyU3YG4hg.png',
                    'https://s2.loli.net/2024/09/02/P5EuMjwSD8YNc3V.png',
                    'https://s2.loli.net/2024/09/02/I2Ds8ectFn4dmrq.png',
                    'https://s2.loli.net/2024/09/02/Fknt4aT2dGrUJyA.png',
                    'https://s2.loli.net/2024/09/02/aWtusRi7fIZ58DH.png',
                    'https://s2.loli.net/2024/09/02/dDUSTu83tYBclsM.png',
                    'https://s2.loli.net/2024/09/02/BbgRAQ8dVt9UmTn.png',
                    'https://s2.loli.net/2024/09/02/Yl6WpiEw5b2cOV1.png'
                  ].map((url, index) => (
                      <Image
                      key={index}
                      src={url}
                      alt={`Anime Strip ${index + 1}`}
                      className="w-64"
                      width={256}
                      height={144}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <style jsx>{`
            @keyframes initialBounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-30px);
              }
              60% {
                transform: translateY(-15px);
              }
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }

            h1 {
              animation: initialBounce 3s ease-in-out;
            }

            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
          `}</style>
        </section>

        {data.length > 0 ? (
          <section className="py-12 md:py-24 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center w-full">Search Results</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        alt={item.name}
                        className="object-cover w-full aspect-video"
                        src={`https://www.olevod.tv/${item.pic}`}
                        width={400}
                        height={225}
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                        <p className="text-gray-400 text-xs">更新至 {item.remarks.replace('更新至', '') || '未知集数'}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <section className="py-12 md:py-24 px-4 md:px-6">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
              没有找到结果
            </div>
            <TrendingList title="电影" items={trendingMovies} gradientFrom="blue-500" gradientTo="purple-500" />
            <TrendingList title="电视剧" items={trendingTVShows} gradientFrom="green-500" gradientTo="teal-500" />
            <TrendingList title="综艺" items={trendingVarietyShows} gradientFrom="pink-500" gradientTo="red-500" />
            <TrendingList title="动漫" items={trendingAnime} gradientFrom="yellow-500" gradientTo="orange-500" />
          </section>
        )}
      </main>
    </div>
  );
}
