import React, { useCallback, useState, useEffect } from 'react';
import { fetchSearchResults, fetchKeywordSuggestions, Item } from '@/app/api/api';
import { Alert, notification } from 'antd'; // 引入antd的Alert和notification组件
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/scene";
import {debounce} from "next/dist/server/utils";
import { useRouter } from 'next/router';

export function Index() {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);  // Added isLoading state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<string | null>(null); // 保存错误信息的状态
  const router = useRouter();  // 使用 useRouter 进行路由跳转

  // Fetch trending shows on mount
  useEffect(() => {
    // Removed fetching anime and variety shows
  }, []);

  // 处理搜索
  const handleSearch = useCallback(
      (event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        event?.preventDefault();

        if (keyword.trim()) {
          // 使用 window.open 在新标签页中打开页面
          const encodedKeyword = encodeURIComponent(keyword);
          console.log(`Searching for: ${encodedKeyword}`);
          window.open(`/search/${encodedKeyword}`, '_blank');  // 新标签页打开
        }
      },
      [keyword]
  );

  // 获取关键词建议
  const fetchSuggestions = useCallback(async (keyword: string) => {
    if (keyword) {
      try {
        const newSuggestions = await fetchKeywordSuggestions(keyword);
        setSuggestions(newSuggestions);
      } catch (error: unknown) {  // Specify error type as unknown
        // If you need more specific error handling, cast the error as an Error object
        if (error instanceof Error) {
          setError(error.message);
          notification.error({
            message: 'Error',
            description: error.message,
          });
        }
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
    const encodedKeyword = encodeURIComponent(suggestion);
    router.push(`/search/${encodedKeyword}`);  // 点击建议时跳转到动态路由
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/*<Scene/>*/}
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
      </main>
    </div>
  );
}
