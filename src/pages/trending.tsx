// pages/trending.tsx
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import { SearchBox } from '@/components/search/searchbox'
import { fetchTrending } from '@/app/api/api'
import type { Item } from '@/app/api/api'
import { useRouter } from 'next/router'

type Period = 'day' | 'week' | 'month' | 'all'

type TypeKey = 0 | 1 | 2 | 3 | 4

const PERIOD_TABS: { key: Period; label: string }[] = [
  { key: 'day', label: '日榜' },
  { key: 'week', label: '周榜' },
  { key: 'month', label: '月榜' },
  { key: 'all', label: '总榜' },
]

const TYPE_TABS: { key: TypeKey; label: string }[] = [
  { key: 0 as TypeKey, label: '全部' },
  { key: 1 as TypeKey, label: '电影' },
  { key: 2 as TypeKey, label: '连续剧' },
  { key: 3 as TypeKey, label: '综艺' },
  { key: 4 as TypeKey, label: '动漫' },
]

const TYPE_LABEL: Record<Exclude<TypeKey, 0>, string> = {
  1: '电影',
  2: '连续剧',
  3: '综艺',
  4: '动漫',
}

const Fire = () => <span aria-label="热度" title="热度">🔥</span>

function useQueryState() {
  const router = useRouter()
  const [period, setPeriod] = useState<Period>('day')
  const [typeID, setTypeID] = useState<TypeKey>(0)

  // read from query on mount
  useEffect(() => {
    if (!router.isReady) return
    const qPeriod = String(router.query.period || '').toLowerCase()
    const qType = Number(router.query.type)

    if (qPeriod && ['day', 'week', 'month', 'all'].includes(qPeriod)) {
      setPeriod(qPeriod as Period)
    }
    if (!Number.isNaN(qType) && [0, 1, 2, 3, 4].includes(qType)) {
      setTypeID(qType as TypeKey)
    }
  }, [router.isReady, router.query.period, router.query.type])

  // push to URL on change (shallow)
  useEffect(() => {
    if (!router.isReady) return
    const curPeriod = String(router.query.period || 'day')
    const curType = Number(router.query.type || 0)
    if (curPeriod === period && curType === typeID) return
    const query: Record<string, string> = { period }
    query.type = String(typeID)
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
  }, [period, typeID, router])

  return { period, setPeriod, typeID, setTypeID }
}

export default function Trending() {
  const { period, setPeriod, typeID, setTypeID } = useQueryState()

  const [singleItems, setSingleItems] = useState<Item[]>([])
  const [columns, setColumns] = useState<Record<1 | 2 | 3 | 4, Item[]>>({ 1: [], 2: [], 3: [], 4: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch logic
  useEffect(() => {
    let cancel = false

    const loadAll = async () => {
      try {
        setLoading(true)
        setError(null)
        const typeIds: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4]
        const data = await Promise.all(typeIds.map((t) => fetchTrending(period, t)))
        if (cancel) return
        const map: Record<1 | 2 | 3 | 4, Item[]> = { 1: [], 2: [], 3: [], 4: [] }
        typeIds.forEach((t, i) => {
          map[t] = Array.isArray(data[i]) ? (data[i] as Item[]) : []
        })
        setColumns(map)
      } catch (e: any) {
        if (cancel) return
        setError(e?.message || '获取趋势数据失败')
        setColumns({ 1: [], 2: [], 3: [], 4: [] })
      } finally {
        if (!cancel) setLoading(false)
      }
    }

    const loadSingle = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTrending(period, typeID as number)
        if (cancel) return
        setSingleItems(Array.isArray(data) ? (data as Item[]) : [])
      } catch (e: any) {
        if (cancel) return
        setError(e?.message || '获取趋势数据失败')
        setSingleItems([])
      } finally {
        if (!cancel) setLoading(false)
      }
    }

    if (typeID === 0) {
      loadAll()
    } else {
      loadSingle()
    }

    return () => {
      cancel = true
    }
  }, [period, typeID])

  const totalHits = useMemo(() => {
    if (typeID === 0) {
      return ([1, 2, 3, 4] as const)
        .map((t) => columns[t])
        .flat()
        .reduce((sum, it) => sum + (Number(it.hits) || 0), 0)
    }
    return singleItems.reduce((sum, it) => sum + (Number(it.hits) || 0), 0)
  }, [columns, singleItems, typeID])

  const getImageUrl = (pic?: string) => {
    if (!pic) return '/placeholder.svg'
    return pic.startsWith('http') ? pic : `https://www.olevod.tv/${pic}`
  }

  // Ranking list component (first with cover, rest as list)
  const RankingList: React.FC<{ title: string; items: Item[]; typeKey: 1 | 2 | 3 | 4 }> = ({ title, items, typeKey }) => {
    const top = items[0]
    const rest = items.slice(1, 10)

    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span>📺</span>
            <h3 className="text/base md:text-lg font-semibold">{title}</h3>
          </div>
          <Link
            href={{ pathname: '/trending', query: { period, type: typeKey } }}
            className="text-xs text-gray-300 hover:text-white"
          >
            更多
          </Link>
        </div>

        {/* Top 1 with cover (only show cover for the first item) */}
        {top && (
          <Link href={`/video-page/${top.id}`} className="block">
            <div className="flex gap-3 p-4">
              <div className="relative w-20 h-28 md:w-24 md:h-36 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                <Image
                  src={getImageUrl(top.picThumb || top.pic)}
                  alt={top.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center justify-center w-5 h-5 rounded bg-fuchsia-600 text-[11px] font-bold mr-2">1</div>
                <span className="font-semibold line-clamp-1 align-middle">{top.name}</span>
                <div className="mt-1 text-xs text-gray-300 line-clamp-2">{top.blurb || '—'}</div>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <Fire /> {Number(top.hits || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* List 2..10 */}
        <ol className="px-2 pb-2">
          {rest.map((it, idx) => (
            <li key={it.id} className="group">
              <Link href={`/video-page/${it.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/40 to-gray-950/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl">🏅</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">排行榜</h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
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

          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            {TYPE_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTypeID(t.key)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  typeID === t.key
                    ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-600/30'
                    : 'bg-white/5 border-white/15 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 max-w-xl mx-auto">
            <SearchBox placeholder="搜索你关心的番剧 / 电影 / 关键词…" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: typeID === 0 ? 3 : 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 h-72 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">😢</div>
            <h3 className="text-2xl font-bold mb-2">加载失败</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : typeID === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render multi columns: Movie, Series, Variety, Anime */}
            <RankingList title={TYPE_LABEL[1]} items={columns[1]} typeKey={1} />
            <RankingList title={TYPE_LABEL[2]} items={columns[2]} typeKey={2} />
            <RankingList title={TYPE_LABEL[3]} items={columns[3]} typeKey={3} />
            {/* If space allows, show 4th below on small screens */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <RankingList title={TYPE_LABEL[4]} items={columns[4]} typeKey={4} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1">
            <RankingList title={TYPE_LABEL[typeID as Exclude<TypeKey, 0>]} items={singleItems} typeKey={(typeID as 1|2|3|4)} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
