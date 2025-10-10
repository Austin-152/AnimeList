import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import { SearchBox } from '@/components/search/searchbox'
import { fetchTrending } from '@/app/api/api'
import type { Item } from '@/app/api/api'
import { useRouter } from 'next/router'

// Periods follow API: day/week/month/all
type Period = 'day' | 'week' | 'month' | 'all'
// Subtype for Series page: 2=电视剧, 4=动漫
type SubType = 2 | 4

const PERIOD_TABS: { key: Period; label: string }[] = [
  { key: 'day', label: '日榜' },
  { key: 'week', label: '周榜' },
  { key: 'month', label: '月榜' },
  { key: 'all', label: '总榜' },
]

const SUBTYPE_TABS: { key: SubType; label: string }[] = [
  { key: 2, label: '连续剧' },
  { key: 4, label: '动漫' },
]

const Fire = () => <span aria-label="热度" title="热度">🔥</span>

function useQueryState() {
  const router = useRouter()
  const [period, setPeriod] = useState<Period>('day')
  const [subtype, setSubtype] = useState<SubType>(2)

  // initialize from URL
  useEffect(() => {
    if (!router.isReady) return
    const qPeriod = String(router.query.period || '').toLowerCase()
    const qSub = Number(router.query.subtype)

    if (qPeriod && ['day', 'week', 'month', 'all'].includes(qPeriod)) {
      setPeriod(qPeriod as Period)
    }
    if (!Number.isNaN(qSub) && [2, 4].includes(qSub)) {
      setSubtype(qSub as SubType)
    }
  }, [router.isReady, router.query.period, router.query.subtype])

  // write to URL
  useEffect(() => {
    if (!router.isReady) return
    const nextQuery = { period, subtype }
    const curPeriod = String(router.query.period || 'day')
    const curSubtype = Number(router.query.subtype || 2)
    if (curPeriod === period && curSubtype === subtype) return
    router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true }
    ).then(() => {})
  }, [period, subtype, router])

  return { period, setPeriod, subtype, setSubtype }
}

export default function Series() {
  const { period, setPeriod, subtype, setSubtype } = useQueryState()

  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancel = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTrending(period, subtype)
        if (cancel) return
        setItems(Array.isArray(data) ? (data as Item[]) : [])
      } catch (e: any) {
        if (cancel) return
        setError(e?.message || '获取剧集数据失败')
        setItems([])
      } finally {
        if (!cancel) setLoading(false)
      }
    }
    load().then(r => r)
    return () => {
      cancel = true
    }
  }, [period, subtype])

  const totalHits = useMemo(() => items.reduce((s, it) => s + (Number(it.hits) || 0), 0), [items])

  const getImageUrl = (pic?: string) => {
    if (!pic) return '/placeholder.svg'
    return pic.startsWith('http') ? pic : `https://www.olevod.tv/${pic}`
  }

  const top = items[0]
  const rest = items.slice(1, 20)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/40 to-gray-950/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl">📺</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">剧集榜</h1>
          </div>

          {/* Period */}
          <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
            {PERIOD_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setPeriod(t.key)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  period === t.key
                    ? 'bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg shadow-fuchsia-600/30'
                    : 'bg-white/5 border-white/15 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Subtype */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            {SUBTYPE_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setSubtype(t.key)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  subtype === t.key
                    ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-600/30'
                    : 'bg-white/5 border-white/15 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 max-w-xl mx-auto">
            <SearchBox placeholder="搜索你关心的剧集 / 动漫…" />
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <div className="text-gray-400">条目</div>
              <div className="text-lg font-semibold">{loading ? '—' : items.length}</div>
            </div>
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <div className="text-gray-400">累计热度</div>
              <div className="text-lg font-semibold">{loading ? '—' : totalHits.toLocaleString()}</div>
            </div>
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <div className="text-gray-400">时间窗口</div>
              <div className="text-lg font-semibold">{PERIOD_TABS.find((p) => p.key === period)?.label}</div>
            </div>
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <div className="text-gray-400">分类</div>
              <div className="text-lg font-semibold">{subtype === 2 ? '连续剧' : '动漫'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 gap-5">
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 h-72 animate-pulse" />
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 h-96 animate-pulse" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">😢</div>
            <h3 className="text-2xl font-bold mb-2">加载失败</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-2xl font-bold mb-2">暂无数据</h3>
            <p className="text-gray-400">稍后再来看看新的趋势吧～</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)] gap-6">
            {/* Top with cover */}
            {top && (
              <Link href={`/video-page/${top.id}`} className="block">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-36 md:w-28 md:h-40 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                      <Image
                        src={getImageUrl(top.picThumb || top.pic)}
                        alt={top.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded bg-fuchsia-600 text-xs font-bold mr-2">1</div>
                      <span className="font-semibold text-lg align-middle line-clamp-1">{top.name}</span>
                      <div className="mt-1 text-sm text-gray-300 line-clamp-2">{top.blurb || '—'}</div>
                      <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                        <Fire /> {Number(top.hits || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* List 2..20 */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <ol className="divide-y divide-white/10">
                {rest.map((it, idx) => (
                  <li key={it.id}>
                    <Link href={`/video-page/${it.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5">
                      <div
                        className={`inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-bold ${
                          idx + 2 === 2 ? 'bg-orange-500' : idx + 2 === 3 ? 'bg-amber-500' : 'bg-gray-600'
                        }`}
                      >
                        {idx + 2}
                      </div>
                      <div className="min-w-0 flex-1 text-sm line-clamp-1">{it.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Fire /> {Number(it.hits || 0).toLocaleString()}
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
