"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { SearchBox } from '@/components/search/searchbox'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Tech-styled Animated Homepage
export function Index() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const featuresRef = useRef<HTMLDivElement | null>(null)
  const showcaseRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero reveal
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-hero-layer="grid"]', { opacity: 0, duration: 0.8 })
      .from('[data-hero-title]', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
      .from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('[data-hero-particles] .particle', { y: 20, opacity: 0, duration: 0.8, stagger: 0.05 }, '-=0.5')

    // Mouse parallax for subtle depth
    const parallaxTargets = gsap.utils.toArray<HTMLElement>('[data-parallax]')
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 2
      const y = (e.clientY / h - 0.5) * 2
      parallaxTargets.forEach((el, i) => {
        const strength = (i + 1) * 2
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, overwrite: true })
      })
    }
    window.addEventListener('mousemove', onMove)

    // Scroll reveal for features
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    })

    // Showcase horizontal fade-in
    if (showcaseRef.current) {
      gsap.from(showcaseRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' },
      })
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      ScrollTrigger.getAll().forEach((st) => st.kill())
      tl.kill()
    }
  }, [])

  const featureCards = [
    {
      title: 'Ultra-fast Streaming',
      desc: 'Optimized edge delivery with instant seek and minimal buffering.',
      icon: '🚀',
      gradient: 'from-violet-500/20 to-fuchsia-500/20',
    },
    {
      title: 'Cinematic Quality',
      desc: 'HDR-ready pipeline and crisp subtitles for every device.',
      icon: '🎞️',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      title: 'Personalized Discovery',
      desc: 'Smart recommendations powered by your watch history.',
      icon: '🧠',
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      title: 'Community-first',
      desc: 'Lists, reviews, and social watch parties built-in.',
      icon: '🌐',
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
  ]

  const showcaseItems = [
    { title: 'Trending', href: '/trending', tag: 'Now' },
    { title: 'Movies', href: '/movies', tag: 'Cinema' },
    { title: 'Series', href: '/series', tag: 'Seasons' },
    { title: 'Discover', href: '/search/Naruto', tag: 'AI Picks' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[80vh] md:min-h-[88vh] flex items-center justify-center"
      >
        {/* Grid and effects */}
        <div
          data-hero-layer="grid"
          className="absolute inset-0 hero-grid opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/40 to-gray-950/80" />
        <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.08]" />

        {/* Floating particles */}
        <div
          data-hero-particles
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              data-parallax
              className={`particle absolute rounded-full bg-fuchsia-400/30 blur-[2px] shadow-[0_0_16px_rgba(217,70,239,0.35)]`}
              style={{
                top: `${10 + (i * 7) % 80}%`,
                left: `${5 + (i * 11) % 90}%`,
                width: 6 + ((i * 3) % 10),
                height: 6 + ((i * 3) % 10),
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1
              data-hero-title
              className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05]"
            >
              次世代动漫影像平台
              <span className="block mt-2 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                极速 · 超清 · 智能发现
              </span>
            </h1>
            <p
              data-hero-sub
              className="mt-5 text-base md:text-lg text-gray-300 max-w-2xl"
            >
              为动漫发烧友打造的专业观影站点：更快的检索与播放、更清晰的画质、更聪明的推荐，让探索与追番更顺手。
            </p>

            <div className="mt-8">
              <SearchBox placeholder="搜索你想看的番剧、电影或关键词…" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3" data-hero-cta>
              <Link href="/trending" className="group">
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 hover:bg-fuchsia-500 transition">
                  🔥 立即探索热榜
                </span>
              </Link>
              <Link href="/movies" className="group">
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 transition">
                  🎬 电影
                </span>
              </Link>
              <Link href="/series" className="group">
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 transition">
                  📺 剧集
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            为什么选择我们？
            <span className="block text-base md:text-lg text-gray-400 font-normal mt-2">
              以工程化与设计美学驱动的观影体验
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featureCards.map((f) => (
              <div
                key={f.title}
                data-reveal
                className={`glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${f.gradient} hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE / QUICK NAV */}
      <section ref={showcaseRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-gray-900/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">快速导航</h2>
            <Link href="/trending" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm md:text-base">查看全部 →</Link>
          </div>

          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
              {showcaseItems.map((item, idx) => (
                <CarouselItem key={item.title} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link href={item.href} className="block group">
                    <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden border border-white/10 bg-[url('/anime-background.jpg')] bg-cover bg-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-fuchsia-900/20 group-hover:from-gray-900/30 transition" />
                      <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur">
                        {item.tag}
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-lg md:text-xl font-semibold text-white drop-shadow">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-300">点我进入 →</div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-8 md:-left-12" />
            <CarouselNext className="-right-8 md:-right-12" />
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="relative rounded-3xl border border-white/10 p-10 md:p-14 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur">
            <div className="absolute inset-0 rounded-3xl pointer-events-none neon-edges" />
            <h3 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              现在，就开始沉浸式观影
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">加入我们，用更快更美的方式拥抱每一帧热爱。</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/trending" className="inline-flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 hover:bg-fuchsia-500 transition">
                  立即开始
                </span>
              </Link>
              <Link href="/report" className="inline-flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 transition">
                  提交反馈
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
