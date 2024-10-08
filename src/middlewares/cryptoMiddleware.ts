import axios from 'axios';

const BaseURL = process.env.BaseURL; // 确保环境变量正确
// 获取公钥
const getPublicKey = async (): Promise<string> => {
    try {
        const response = await axios.options(`${BaseURL}/api/crypto/getPublicKey`);
        const publicKey = response.data; // 假设公钥从返回数据中获取
        if (!publicKey) {
            throw new Error('Public key not found');
        }
        return publicKey;
    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error;
    }
};

// 加密数据并通过 API 路由进行处理
const encryptData = async (data: any, publicKey: string) => {
    const response = await axios.post('/api/encryptData', {
        data,
        publicKey,
    });
    return response.data.encryptedData;
};

export const cryptoMiddleware = async (config: any) => {
    const publicKey = await getPublicKey();

    // 仅在特定请求中加密数据
    if (config.url.includes('/api/query/ole/search') ||
        config.url.includes('/api/query/ole/keyword') ||
        config.url.includes('/api/query/ole/detail')) {

        if (config.data) {
            config.data = await encryptData(config.data, publicKey);
        }
    }
    return config;
};
