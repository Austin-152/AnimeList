// components/Trends.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Item } from '@/app/api/api';
import {useEffect} from "react";

interface TrendingListProps {
  title: string;
  items: Item[];
  gradientFrom: string;
  gradientTo: string;
}

export default function Trends({ title, items, gradientFrom, gradientTo }: TrendingListProps) {
    useEffect(() => {
        // 预加载api数据
    }, []);
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
        <div className={`h-0.5 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} w-24`}></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto px-4 lg:max-w-4xl">
        {items.map((item) => (
          <Card className="group" key={item.id}>
            <Link
              href={`/video-page/${item.id}`}
              className="block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="relative h-80 w-full">
                {item.pic ? (
                  <Image
                    alt={item.name}
                    className="object-cover w-full h-full rounded-t-lg"
                    src={`https://www.olevod.tv/${item.pic}`}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-500">
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
  );
}
