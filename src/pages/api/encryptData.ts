import JSEncrypt from 'jsencrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data, publicKey } = req.body;
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKey);

        const encryptedData = encryptor.encrypt(JSON.stringify(data));
        if (!encryptedData) {
            return res.status(500).json({ error: 'Encryption failed' });
        }

        res.status(200).json({ encryptedData });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
