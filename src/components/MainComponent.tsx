import React, { useCallback, useState, useEffect } from 'react';
import { fetchSearchResults, fetchTrendingV2, fetchKeywordSuggestions, Item } from '@/app/api/api';
import { Alert, notification } from 'antd'; // 引入antd的Alert和notification组件
import useSWR from 'swr';
import Navbar from './nav';
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import TrendingList from '@/components/trends';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {debounce} from "next/dist/server/utils";
import {Scene} from "@/components/scene";

export function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [trendingTVShows, setTrendingTVShows] = useState<Item[]>([]);
  const [trendingVarietyShows, setTrendingVarietyShows] = useState<Item[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null); // 保存错误信息的状态

  // Fetch trending shows on mount
  useEffect(() => {
    fetchTrendingV2(3).then(setTrendingVarietyShows);
    fetchTrendingV2(4).then(setTrendingAnime);
  }, []);

  // 处理搜索
  const handleSearch = useCallback(async (event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event?.preventDefault();

    if (!keyword.trim()) return;

    try {
      setIsLoading(true);
      setData([]);
      setSuggestions([]);
      const results = await fetchSearchResults(keyword, "1", 10);
      if (Array.isArray(results.data)) {
        const data = results.data.reduce((acc: Item[], item: { list: Item[] | null }) => acc.concat(item.list || []), []);
        setData(data);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  // 获取关键词建议
  const fetchSuggestions = useCallback(async (keyword: string) => {
    if (keyword) {
      try {
        const newSuggestions = await fetchKeywordSuggestions(keyword);
        setSuggestions(newSuggestions);
      } catch (error: any) {
        // 如果捕获到错误，更新错误信息
        setError(error.message);
        // 使用 notification 显示全局提示框
        notification.error({
          message: 'Error',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    if (!isComposing && newKeyword) {
      debouncedFetchSuggestions(newKeyword);
    } else {
      setSuggestions([]);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    if (keyword) {
      debouncedFetchSuggestions(keyword);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setSuggestions([]);
    handleSearch().then(r => console.log(r));
  };

  return (
    <div className="flex flex-col min-h-screen">
            <Scene/>
      <main className="flex-1">
        <section className="bg-gray-950 text-gray-50 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Welcome to Anime Hub</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl text-center">Discover the latest and greatest anime series, movies, and more.</p>

          {/* 搜索框 */}
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
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
              />

              {/* 显示建议 */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 divide-y divide-gray-700 rounded-lg mt-1 z-10">
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
            <Button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Search
            </Button>
          </form>

          {/* 错误信息提示 */}
          {error && <Alert message={error} type="error" showIcon className="mt-4" />}
        </section>

        {/* 搜索结果 */}
        {data.length > 0 ? (
          <section className="py-12 md:py-24 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`}>
                    <div className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <Image
                          alt={item.name}
                          className="object-cover w-full aspect-video"
                          src={`https://www.olevod.tv/${item.pic}`}
                          width={400}
                          height={225}
                          layout="responsive"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                          <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                          <p className="text-gray-400 text-xs">更新至 {item.remarks.replace('更新至', '') || '未知集数'}</p>
                        </div>
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
              <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              没有找到结果
            </div>

            {/* 热门综艺与动漫 */}
            <TrendingList title="综艺" items={trendingVarietyShows} gradientFrom="pink-500" gradientTo="red-500" />
            <TrendingList title="动漫" items={trendingAnime} gradientFrom="yellow-500" gradientTo="orange-500" />
          </section>
        )}
      </main>
    </div>
  );
}
