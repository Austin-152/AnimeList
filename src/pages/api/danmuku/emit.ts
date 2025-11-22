// ============================
// File: src/pages/api/danmuku/emit.ts
// ============================
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    const { vid, text, time, color, mode } = req.body || {}

    if (!vid || typeof text !== 'string' || typeof time !== 'number') {
        return res.status(400).json({ ok: false, msg: 'bad danmaku' })
    }

    // TODO: persist to DB/storage here
    // await db.insert({ vid, text, time, color, mode, createdAt: Date.now() })

    return res.status(200).json({ ok: true })
}
