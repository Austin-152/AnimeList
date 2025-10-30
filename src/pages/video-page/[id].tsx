import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css'
import { Button, Row, Col } from 'antd'
import { fetchVideoDetails } from '@/app/api/api'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import dynamic from 'next/dynamic'
import Head from "next/head"
import Cookies from 'js-cookie'

const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((m) => m.Player), { ssr: false })

const VideoPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [videoDetails, setVideoDetails] = useState<{ title: string; url: string }[]>([])
  const [videoName, setVideoName] = useState<string>('Loading...')
  const [loading, setLoading] = useState<boolean>(true)
  const [currentVideo, setCurrentVideo] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const details = await fetchVideoDetails(id as string)
          setVideoDetails(details.urls)
          setVideoName(details.name)

          // 尝试从 cookie 读取上次观看的集数
          const savedVideoUrl = Cookies.get(`video_progress_${id}`)

          if (savedVideoUrl && details.urls.some(v => v.url === savedVideoUrl)) {
            setCurrentVideo(savedVideoUrl)
          } else if (details.urls.length > 0) {
            setCurrentVideo(details.urls[0].url)
          }
        } catch (error) {
          console.error('Error fetching video details:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData().then((r) => r)
  }, [id])

  const handleVideoClick = (url: string) => {
    if (url) {
      setCurrentVideo(url)
      // 保存当前观看的集数到 cookie (有效期30天)
      Cookies.set(`video_progress_${id}`, url, { expires: 30 })
    } else {
      console.error('Video URL is empty or undefined')
    }
  }

  return (
      <div className="bg-gray-900 text-white min-h-screen p-5 pb-20">
        <Head>
          <title>{videoName} - {videoDetails[0]?.title}</title>
          <meta name="description" content="次世代免费动漫影像平台 - 极速 · 超清 · 智能发现" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-5">
          <div className="w-full h-[500px] mb-8 flex justify-center items-center">
            {loading ? (
                <LottiePlayer
                    src="https://lottie.host/5c91a04a-3803-4265-8c9c-cf2e5d714358/nCMNGSQU9i.json"
                    className="w-48 h-48"
                    autoplay
                    loop
                />
            ) : currentVideo ? (
                <iframe
                    src={`https://m3u8player.org/player.html?url=${currentVideo}`}
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
  )
}

export default VideoPage