import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import TrendingList from "@/components/trends";
import React, { useEffect, useState } from "react";
import { fetchTrendingV2, Item } from "@/app/api/api";
import 'tailwindcss/tailwind.css';

export default function Series(): JSX.Element {
    const [trendingTVShows, setTrendingTVShows] = useState<Item[]>([]);

    useEffect(() => {
           fetchTrendingV2(2,30).then(setTrendingTVShows);
    }, []); // 添加空数组作为依赖项，确保只在组件挂载时运行一次

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-5">
                <TrendingList title="电视剧" items={trendingTVShows} gradientFrom="green-500" gradientTo="teal-500" />
            </div>
            <Footer />
        </div>
    );
}
