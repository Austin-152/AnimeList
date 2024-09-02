import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { fetchVideoDetails } from "@/app/api/api";
import type { VideoComponent } from "@/app/api/api";
import Navbar from '@/components/nav';

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;


    // 使用 VideoComponent 接口定义状态
    const [videoDetails, setVideoDetails] = useState<VideoComponent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');  // 当前播放的视频 URL


    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(`Sending POST request to /api/query/ole/detail with keyword: ${id}`);
                try {
                    const details = await fetchVideoDetails(id as string);
                    console.log('Fetched video details:', details);  // 打印请求返回的数据
                    setVideoDetails(details);
                } catch (error) {
                    console.error('Error fetching video details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);  // id 作为依赖，确保在 id 变化时重新触发
    const handlePlayButtonClick = () => {
        if (videoDetails.length > 0) {
            setCurrentVideoUrl(videoDetails[0].url);
        }
    };

    return (
        <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <Navbar />
            <div style={{maxWidth: '800px', margin: '0 auto', marginTop: '20px'}}>
                {/* 视频播放区域 */}
                <div style={{backgroundColor: '#000', height: '450px', position: 'relative'}}>
                    {currentVideoUrl ? (
                        <video
                            controls
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={"https://player.viloud.tv/embed/play?url=" + currentVideoUrl}
                        />
                    ) : (
                        <button
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '10px 20px',
                                backgroundColor: '#555',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                borderRadius: '8px', // 添加圆角
                            }}
                            onClick={handlePlayButtonClick}
                        >
                            Play
                        </button>
                    )}
                </div>


                {/* 显示加载指示器 */}
                {loading ? (
                    <div style={{textAlign: 'center', marginTop: '20px'}}>Loading...</div>
                ) : (
                    // 集数列表
                    <ul style={{listStyleType: 'none', padding: 0, marginTop: '20px', textAlign: 'left'}}>
                        {videoDetails.map((video, index) => (
                            <li
                                key={index}
                                style={{padding: '10px 0', borderBottom: index < videoDetails.length - 1 ? '1px solid #444' : 'none'}}
                                onClick={() => setCurrentVideoUrl("https://player.viloud.tv/embed/play?url=" + video.url)}
                            >
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();  // 阻止默认的导航行为
                                        setCurrentVideoUrl(video.url);  // 设置当前视频 URL
                                    }}
                                    style={{color: '#fff', textDecoration: 'none'}}
                                >
                                    {video.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default VideoPage;
