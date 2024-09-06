import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { fetchVideoDetails } from "@/app/api/api";
import type { VideoComponent } from "@/app/api/api";
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import ReactPlayer from 'react-player';

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [videoDetails, setVideoDetails] = useState<VideoComponent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(`Sending POST request to /api/query/ole/detail with keyword: ${id}`);
                try {
                    const details = await fetchVideoDetails(id as string);
                    console.log('Fetched video details:', details);
                    setVideoDetails(details);
                    if (details.length > 0) {
                        console.log('Setting initial video URL:', details[0].url);
                        setCurrentVideoUrl(details[0].url); // 默认设置第一个视频的 URL
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

    const handleVideoClick = (url: string) => {
        if (url) {
            setCurrentVideoUrl(url);
        } else {
            console.error('Video URL is empty or undefined');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-5">
                <div className="bg-black h-112 relative">
                    {currentVideoUrl ? (
                        <ReactPlayer
                            url={currentVideoUrl}
                            playing
                            controls
                            width="100%"
                            height="100%"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                            No video selected
                        </div>
                    )}
                </div>
                {loading ? (
                    <div className="text-center mt-5">Loading...</div>
                ) : (
                    <ul className="list-none p-0 mt-5 text-left">
                        {videoDetails.map((video, index) => (
                            <li
                                key={index}
                                className={`py-2 ${index < videoDetails.length - 1 ? 'border-b border-gray-700' : ''} hover:bg-gray-700`}
                                onClick={() => handleVideoClick(video.url)}
                            >
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
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