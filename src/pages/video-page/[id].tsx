import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { fetchVideoDetails } from "@/app/api/api"; // 保留获取视频详情的函数
import Navbar from '@/components/nav'; // 导航栏组件
import Footer from '@/components/footer'; // 页脚组件

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [videoDetails, setVideoDetails] = useState<{ title: string, url: string }[]>([]); // 定义视频详情的类型
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(`Sending POST request to /api/query/ole/detail with keyword: ${id}`);
                try {
                    const details = await fetchVideoDetails(id as string);
                    console.log('Fetched video details:', details);
                    setVideoDetails(details); // 设置视频详情
                } catch (error) {
                    console.error('Error fetching video details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    // 点击视频链接时打开新页面
    const handleVideoClick = (url: string) => {
        if (url) {
            const embedUrl = `https://player.viloud.tv/embed/play?url=${url}`;
            window.open(embedUrl, '_blank'); // 在新标签页中打开嵌入式播放器
        } else {
            console.error('Video URL is empty or undefined');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-5">
                {loading ? (
                    <div className="text-center mt-5">Loading...</div>
                ) : (
                    <ul className="list-none p-0 mt-5 text-left">
                        {videoDetails.map((video, index) => (
                            <li
                                key={index}
                                className={`py-2 ${index < videoDetails.length - 1 ? 'border-b border-gray-700' : ''} hover:bg-gray-700`}
                                onClick={() => handleVideoClick(video.url)} // 点击时打开新网页
                            >
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()} // 禁用默认的链接行为
                                    className="text-white no-underline"
                                >
                                    {video.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default VideoPage;
