import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { fetchVideoDetails } from "@/app/api/api"; // 保留获取视频详情的函数
import Navbar from '@/components/nav'; // 导航栏组件
import Footer from '@/components/footer'; // 页脚组件
import { Player } from '@lottiefiles/react-lottie-player'; // 引入Lottie动画库

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [videoDetails, setVideoDetails] = useState<{ title: string, url: string }[]>([]); // 定义视频详情的类型
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<string>(''); // 当前播放的视频URL

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(`Sending POST request to /api/query/ole/detail with keyword: ${id}`);
                try {
                    const details = await fetchVideoDetails(id as string);
                    console.log('Fetched video details:', details);
                    setVideoDetails(details); // 设置视频详情
                    if (details.length > 0) {
                        setCurrentVideo(details[0].url); // 默认播放第一集
                    }
                } catch (error) {
                    console.error('Error fetching video details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    // 点击视频链接时更新当前播放的视频
    const handleVideoClick = (url: string) => {
        if (url) {
            setCurrentVideo(url); // 设置当前播放的视频URL
        } else {
            console.error('Video URL is empty or undefined');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5 pb-20"> {/* 添加pb-20 */}
            <Navbar />
            <div className="max-w-4xl mx-auto mt-5">
                {/* 视频播放器 */}
                <div className="w-full h-[500px] mb-8 flex justify-center items-center">
                    {loading ? (
                        <Player
                            src="https://lottie.host/5c91a04a-3803-4265-8c9c-cf2e5d714358/nCMNGSQU9i.json"
                            className="w-48 h-48" // 缩小动画的大小
                            autoplay
                            loop
                        />
                    ) : currentVideo ? (
                        <iframe
                            src={`https://www.hlsplayer.net/embed?type=m3u8&src=${currentVideo}`}
                            allowFullScreen
                            className="w-full h-full rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="text-center text-gray-400">Loading...</div>
                    )}
                </div>


                {/* 视频选集 */}
                {loading ? (
                    <div className="text-center mt-5"></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {videoDetails.map((video, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer transition-transform transform hover:scale-105 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 hover:bg-gray-700`}
                                onClick={() => handleVideoClick(video.url)} // 点击时更改播放视频
                            >
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()} // 禁用默认的链接行为
                                    className="text-white no-underline block"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                                    <p className="text-sm text-gray-400">Episode {index + 1}</p>

                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br/> {/* 添加换行 */}
            <br/>
            <Footer/>
        </div>
    );
}

export default VideoPage;
