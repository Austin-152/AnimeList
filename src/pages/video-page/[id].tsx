import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { Button, Row, Col } from 'antd';
import { fetchVideoDetails } from "@/app/api/api";
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import { Player } from '@lottiefiles/react-lottie-player';

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [videoDetails, setVideoDetails] = useState<{ title: string, url: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const details = await fetchVideoDetails(id as string);
                    setVideoDetails(details);
                    if (details.length > 0) {
                        setCurrentVideo(details[0].url);
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
            setCurrentVideo(url);
        } else {
            console.error('Video URL is empty or undefined');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5 pb-20">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-5">
                <div className="w-full h-[500px] mb-8 flex justify-center items-center">
                    {loading ? (
                        <Player
                            src="https://lottie.host/5c91a04a-3803-4265-8c9c-cf2e5d714358/nCMNGSQU9i.json"
                            className="w-48 h-48"
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

                {loading ? (
                    <div className="text-center mt-5"></div>
                ) : (
                    <Row gutter={[16, 16]} justify="start">
                        {videoDetails.map((video, index) => (
                            <Col key={index}>
                                <Button
                                    type="default"
                                    style={{
                                        backgroundColor: currentVideo === video.url ? '#1890ff' : '#333',
                                        color: '#fff',
                                        borderColor: currentVideo === video.url ? '#1890ff' : 'transparent',
                                    }}
                                    onClick={() => handleVideoClick(video.url)}
                                >
                                    {video.title}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default VideoPage;
