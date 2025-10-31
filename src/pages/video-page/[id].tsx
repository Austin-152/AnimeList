import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { fetchVideoDetails } from '@/app/api/api'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Cookies from 'js-cookie'

const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((m) => m.Player), { ssr: false })

const VideoPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [videoDetails, setVideoDetails] = useState<{ title: string; url: string }[]>([])
  const [videoName, setVideoName] = useState<string>('Loading...')
  const [loading, setLoading] = useState<boolean>(true)
  const [currentVideo, setCurrentVideo] = useState<string>('')

  const currentIndex = useMemo(() => videoDetails.findIndex(v => v.url === currentVideo), [videoDetails, currentVideo])
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < videoDetails.length - 1

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      try {
        const details = await fetchVideoDetails(id as string)
        setVideoDetails(details.urls)
        setVideoName(details.name)

        // 从 cookie 读取上次观看的集数
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

    fetchData().then(() => {})
  }, [id])

  const handleVideoClick = useCallback((url: string) => {
    if (!url) return
    setCurrentVideo(url)
    // 保存当前观看的集数到 cookie (有效期30天)
    Cookies.set(`video_progress_${id}` as string, url, { expires: 30 })
  }, [id])

  const playPrev = useCallback(() => {
    if (!hasPrev) return
    const prevUrl = videoDetails[currentIndex - 1]?.url
    if (prevUrl) handleVideoClick(prevUrl)
  }, [hasPrev, videoDetails, currentIndex, handleVideoClick])

  const playNext = useCallback(() => {
    if (!hasNext) return
    const nextUrl = videoDetails[currentIndex + 1]?.url
    if (nextUrl) handleVideoClick(nextUrl)
  }, [hasNext, videoDetails, currentIndex, handleVideoClick])

  // 键盘快捷键：左右切换集数
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        playPrev()
      } else if (e.key === 'ArrowRight') {
        playNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [playPrev, playNext])

  const copyCurrentLink = useCallback(async () => {
    try {
      const url = `${window.location.origin}${router.asPath}`
      await navigator.clipboard.writeText(url)
      // 轻量提示：使用浏览器原生提示
      alert('播放页链接已复制')
    } catch (e) {
      console.error('复制失败', e)
    }
  }, [router.asPath])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>{videoName} - {videoDetails[0]?.title}</title>
        <meta name="description" content="次世代免费动漫影像平台 - 极速 · 超清 · 智能发现" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar 独立区域，避免受下方布局影响 */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-24">
        {/* 标题与信息 */}
        <section className="pt-6 md:pt-8">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">
            {videoName}
          </h1>
          {!loading && (
            <p className="mt-1 text-sm text-gray-400">
              共 {videoDetails.length} 集{currentIndex >= 0 ? ` · 当前第 ${currentIndex + 1} 集` : ''}
            </p>
          )}
        </section>

        {/* 播放器区域 */}
        <section className="mt-4 md:mt-6">
          <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden neon-edges bg-black/60">
            <div className="absolute inset-0 flex items-center justify-center">
              {loading ? (
                <LottiePlayer
                  src="https://lottie.host/5c91a04a-3803-4265-8c9c-cf2e5d714358/nCMNGSQU9i.json"
                  className="w-28 h-28 md:w-40 md:h-40"
                  autoplay
                  loop
                />
              ) : currentVideo ? (
                <iframe
                  src={`https://m3u8player.org/player.html?url=${encodeURIComponent(currentVideo)}`}
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="text-center text-gray-400">暂无可播放视频</div>
              )}
            </div>
          </div>

          {/* 播放控制 */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={playPrev}
              disabled={!hasPrev}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${hasPrev ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
            >
              上一集
            </button>
            <button
              onClick={playNext}
              disabled={!hasNext}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${hasNext ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
            >
              下一集
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={copyCurrentLink}
                className="px-3 py-2 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
              >
                复制播放页链接
              </button>
            </div>
          </div>
        </section>

        {/* 分集列表 */}
        {!loading && videoDetails.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2">选择剧集</h2>
            {/* 移动端横向滚动，桌面端自动换行 */}
            <div className="flex md:block overflow-x-auto gap-2 md:gap-3 pb-2 md:pb-0">
              <div className="flex md:flex-wrap md:gap-3 gap-2 min-w-full md:min-w-0">
                {videoDetails.map((video, index) => {
                  const isActive = currentVideo === video.url
                  return (
                    <button
                      key={video.url + index}
                      onClick={() => handleVideoClick(video.url)}
                      className={`shrink-0 md:shrink md:basis-auto px-3 md:px-4 py-2 rounded-md text-sm transition-colors border ${isActive ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
                      title={video.title}
                    >
                      {video.title || `第 ${index + 1} 集`}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default VideoPage