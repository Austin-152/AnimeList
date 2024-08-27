// pages/api/submit.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const response = await axios.post('https://your-api-endpoint.com/api/v1/trending', req.body);
//             // 将POST请求的body传递到目标API
//             res.status(200).json(response.data);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching data', error });
//         }
//     } else {
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
