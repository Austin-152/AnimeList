import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSearchResults, Item } from '@/app/api/api';
import { Alert } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import 'tailwindcss/tailwind.css';
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Head from 'next/head';

export default function SearchPage() {
    const router = useRouter();
    const { keyword } = router.query;
    const [data, setData] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!keyword || typeof keyword !== 'string' || !keyword.trim()) return;

            try {
                setIsLoading(true);
                const results = await fetchSearchResults(decodeURIComponent(keyword), "1", 10);
                if (Array.isArray(results.data)) {
                    const fetchedData = results.data.reduce((acc: Item[], item: { list: Item[] | null }) => acc.concat(item.list || []), []);
                    setData(fetchedData);
                } else {
                    console.error("Failed to fetch search results");
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError('Error fetching search results');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [keyword]);

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>{decodeURIComponent(keyword as string)} - AnimeList</title>
            </Head>
            <Navbar />
            <main className="flex-1">
                <section className="py-12 md:py-24 px-4 md:px-6">
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <Alert message={error} type="error" showIcon className="mt-4" />
                    ) : data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {data.map((item) => (
                                <Card className="group" key={item.id}>
                                    <Link href={`/video-page/${item.id}`}>
                                        <div className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                            <div className="relative">
                                                <Image
                                                    alt={item.name}
                                                    className="object-cover w-full"
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
                    ) : (
                        <div className="text-center">
                            <Image
                                src="/notFound.svg"
                                alt="404 Not Found"
                                width={400}
                                height={400}
                                className="mx-auto"
                            />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Oops! No results found for "{decodeURIComponent(keyword as string)}"</h2>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
