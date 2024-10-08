import forge from 'node-forge';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
    data: Record<string, unknown>;
    publicKey: string;
}

interface ResponseData {
    error?: string;
    encryptedData?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const { data, publicKey }: RequestBody = req.body;

        try {
            const key = forge.pki.publicKeyFromPem(publicKey);
            console.log('Data:', JSON.stringify(data));
            const encryptedData = key.encrypt(forge.util.encodeUtf8(JSON.stringify(data)), 'RSA-OAEP');

            res.status(200).json({ encryptedData: forge.util.encode64(encryptedData) });
        } catch (error) {
            res.status(500).json({ error: 'Encryption failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
