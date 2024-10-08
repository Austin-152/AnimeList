import axios from 'axios';

const BaseURL = process.env.BaseURL; // 确保环境变量正确

function setItemWithExpiry(key: string, value: string, ttl: number) {
    const now = new Date();
    // ttl 单位为秒

    const item = {
        value: value,
        expiry: now.getTime() + ttl * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // 检查过期
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}


// 获取公钥
const getPublicKey = async (): Promise<string> => {
    try {
        const cachedPublicKey = getItemWithExpiry('publicKey');
        if (cachedPublicKey) {
            return cachedPublicKey;
        } else {
            const response = await axios.options(`${BaseURL}/api/crypto/getPublicKey`);
            const publicKey = response.data; // 假设公钥从返回数据中获取
            setItemWithExpiry('publicKey', publicKey, 60 * 60); // 缓存1小时
            return publicKey;
        }
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
    let encrypted;
    if (config.url.includes('/api/query/ole/search') ||
        config.url.includes('/api/query/ole/keyword') ||
        config.url.includes('/api/query/ole/detail')) {

        // dump to json
        // param: timestamp (number), data (string)
        if (config.data) {
            encrypted = await encryptData(config.data, publicKey);
            // 构造 json
            config.data = JSON.stringify({
                timestamp: Date.now(),
                data: encrypted,
            });
        }
    }
    return config;
};
