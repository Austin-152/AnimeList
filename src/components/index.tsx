import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import React, { useCallback, useState, useEffect } from 'react';
import { fetchSearchResults } from '@/app/api/api';
import { Item } from "@/app/api/api";
import { fetchKeywordSuggestions } from '@/app/api/api';
import { type LogtoContext } from '@logto/next';
import useSWR from 'swr';

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
      const img = new Image();
      img.src = url;
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const keywords = event ? (event.currentTarget.elements[0] as HTMLInputElement).value : keyword;

    try {
      setIsLoading(true);
      setData([]);
      setSuggestions([]); // 4. 开始搜索后关闭提示框
      const results = await fetchSearchResults(keyword, "1", 10);
      if (!Array.isArray(results.data)) {
        throw new Error('fetchSearchResults did not return an array');
      }

      const data = results.data.reduce((acc: Item[], item: { list: Item[] | null }) => acc.concat(item.list || []), []);
      setData(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
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

  const fetchSuggestions = async (keyword: string) => {
    const newSuggestions = await fetchKeywordSuggestions(keyword);
    setSuggestions(newSuggestions);
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 1000), []);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setSuggestions([]);
    handleSearch().then(r => console.log(r));
  };

  const LoginURL = `${process.env.BaseURL}/api/auth/login`;
  const { data: userData } = useSWR<LogtoContext>('/api/logto/user');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-950 text-gray-50 px-4 md:px-6 py-3 flex items-center justify-between">
        <Link className="flex items-center gap-2 font-bold text-lg" href="#">
          <FanIcon className="w-6 h-6" />
          <span>Anime Hub</span>
        </Link>
        <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex items-center gap-6`}>
          {userData?.isAuthenticated ? (
            <p>
              Hello, {userData.claims?.sub},
              <button
                onClick={() => {
                  window.location.assign('/api/logto/sign-out');
                }}
              >
                Sign Out
              </button>
            </p>
          ) : (
            <p>
              <button className="text-white hover:bg-[#333]"
                onClick={() => {
                  window.location.assign('/api/logto/sign-in');
                }}
              >
                Sign In
              </button>
            </p>
          )}
        </nav>
        <Button
          className="md:hidden"
          size="icon"
          variant="ghost"
          onClick={toggleMenu}
        >
          <MenuIcon className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
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
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
              <Input
                  className="bg-gray-800 border-gray-700 text-gray-50 pl-12 pr-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-700 relative z-10"
                  placeholder="Search for anime..."
                  type="search"
                  value={keyword}
                  onChange={handleInputChange}
              />
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
                        <img
                            key={index}
                            src={url}
                            alt={`Anime Strip ${index + 1}`}
                            className="w-64"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
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

        <section className="py-12 md:py-24 px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Search results</h2>
            <Link className="text-sm md:text-base hover:underline" href="#">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`}>
                    <img
                        alt={item.name}
                        className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity duration-300"
                        height="300"
                        src={`https://www.olevod.tv/${item.pic}`}
                        width="200"
                    />
                    <div className="mt-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.blurb}</p>
                    </div>
                  </Link>
                </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path
            d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
        />
        <path d="M12 12v.01"/>
      </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12"/>
        <line x1="4" x2="20" y1="6" y2="6"/>
        <line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
  );
}

export { FanIcon, MenuIcon, SearchIcon };
