// types.ts
import 'tailwindcss/tailwind.css';

export interface Item {
  id: number;
  typeId: number;
  typeId1: number;
  name: string;
  picThumb?: string;
  pic?: string;
  blurb: string;
  remarks?: string;
  vip: boolean;
  new: boolean;
  hits: number;
  area: string;
  year: string;
  preFree: number;
}

// pages/trending.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from 'react';
import { fetchTrending, fetchTrendingV2 } from '@/app/api/api';
import Navbar from '@/components/nav';
import Image from "next/image";

export default function Trending() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-24 px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center w-full">排行榜</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">电影</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingMovies.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      {item.pic ? (
                        <Image
                          alt={item.name}
                          className="object-cover w-full aspect-video"
                          src={`https://www.olevod.tv/${item.pic}`}
                            // 384 x 560
                                width={384}
                                height={560}
                        />
                      ) : (
                        <div className="bg-gray-800 w-full aspect-video flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                        <p className="text-gray-400 text-xs">热度: {item.hits}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">电视剧</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingTVShows.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      {item.pic ? (
                        <Image
                          alt={item.name}
                          className="object-cover w-full aspect-video"
                          src={`https://www.olevod.tv/${item.pic}`}
                          // 384 x 560
                            width={384}
                            height={560}
                        />
                      ) : (
                        <div className="bg-gray-800 w-full aspect-video flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                        <p className="text-gray-400 text-xs">热度: {item.hits}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">综艺</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingVarietyShows.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      {item.pic ? (
                        <Image
                          alt={item.name}
                          className="object-cover w-full aspect-video"
                          src={`https://www.olevod.tv/${item.pic}`}
                          width={384}
                            height={560}
                        />
                      ) : (
                        <div className="bg-gray-800 w-full aspect-video flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                        <p className="text-gray-400 text-xs">热度: {item.hits}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">动漫</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingAnime.map((item) => (
                <Card className="group" key={item.id}>
                  <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      {item.pic ? (
                        <Image
                          alt={item.name}
                          className="object-cover w-full aspect-video"
                          src={`https://www.olevod.tv/${item.pic}`}
                            width={384}
                            height={560}
                        />
                      ) : (
                        <div className="bg-gray-800 w-full aspect-video flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                        <p className="text-gray-400 text-xs">热度: {item.hits}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
