// ============================
// File: src/pages/api/danmuku.ts
// ============================
// JSON danmaku feed example. artplayer-plugin-danmuku supports JSON and XML.
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { vid } = req.query
    // TODO: Replace with your storage lookup
    const demo: Array<{ text: string; time: number; color?: string; mode?: number }> = [
        { text: '开整！', time: 0.5, color: '#ffffff', mode: 0 },
        { text: '好耶', time: 3.2, color: '#00eaff', mode: 1 },
        { text: `vid=${vid} 弹幕已就绪`, time: 5.8, color: '#ff66cc', mode: 0 },
    ]
    res.status(200).json(demo)
}
