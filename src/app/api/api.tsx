import { Optional } from "@silverhand/essentials";
import axios from 'axios';
import { cryptoMiddleware } from '@/middlewares/cryptoMiddleware';

// 创建 Axios 实例
const apiClient = axios.create({
    baseURL: process.env.BaseURL,
});

// 添加请求拦截器
apiClient.interceptors.request.use(cryptoMiddleware, (error) => {
    return Promise.reject(error);
});


// 定义一个接口，描述你的数据对象的结构
interface Item {
    hits: number;
    picThumb: string;
    remarks: string;
    id: number;
    typeId1: number;
    name: string;
    pic: string;
    blurb: string;
}

interface DataItem {
    words: string[];
}

interface VideoComponent {
    title: string;
    url: string;
    index: number;
}

const BaseURL = process.env.BaseURL; // 确保环境变量正确

// 检查用户是否登录的函数
const checkLoginStatus = async (): Promise<boolean> => {
    try {
        const response = await axios.get('/api/getUserInfo');
        // 如果返回不是 401，说明用户已登录
        console.log('Login status:', response.status);
        return response.status === 200;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.error('User not logged in');
            return false;
        }
        console.error('Error checking login status:', error);
        return false;
    }
};

// 搜索视频的函数
const fetchSearchResults = async (keyword: string, page = "1", size = 10) => {
    const isLoggedIn = await checkLoginStatus(); // 检查是否登录
    if (!isLoggedIn) {
        // 如果用户未登录，展示错误信息
        return false;
    }

    try {
        const response = await apiClient.post(`${BaseURL}/api/query/ole/search`, {
            keyword,
            page,
            size
        });

        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results:', error, keyword);
        return false;
    }
};

// 关键词联想的函数
const fetchKeywordSuggestions = async (keyword: string) => {
    const isLoggedIn = await checkLoginStatus(); // 检查是否登录
    if (!isLoggedIn) {
        throw new Error('You must Sign in to use this feature');
    }

    try {
        // console.log(`Sending POST request to /api/query/ole/keyword with keyword: ${keyword}`);
        const response = await apiClient.post(`${BaseURL}/api/query/ole/keyword`, {
            keyword
        });
        return response.data.data.flatMap((item: DataItem) => item.words);
    } catch (error) {
        console.error('Error fetching keyword suggestions:', error);
        throw error;
    }
};

// 获取视频详情
const fetchVideoDetails = async (id: string): Promise<VideoComponent[]> => {
    try {
        const response = await apiClient.post(`${BaseURL}/api/query/ole/detail`, { id });
        const urls = response.data.data.urls;

        if (!Array.isArray(urls)) {
            console.error('Invalid response:', response.data);
        }

        const videoDetails: VideoComponent[] = urls.map((item: { title: string; url: string }, idx: number) => ({
            title: item.title,
            url:  item.url,
            index: idx + 1,
        }));

        return videoDetails;
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    }
};

let cachedPublicKey: string | null = null;
// 获取公钥
const getPublicKey = async (): Promise<string> => {
    if (cachedPublicKey) {
        return cachedPublicKey;
    }

    try {
        const response = await axios.get(`${BaseURL}/api/crypto/getPublicKey`);
        const publicKey = response.data.public_key;
        if (!publicKey) {
            throw new Error('Public key not found');
        }
        cachedPublicKey = publicKey; // 缓存公钥
        return publicKey;
    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error;
    }
};


// 获取趋势数据
const fetchTrending = async (period: string, typeID: number) => {
    try {
        const response = await apiClient.post(`${BaseURL}/api/trending/${period}/trend`, {
            params: { "typeID": typeID }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending data:', error);
        throw error;
    }
};

// 获取 v2 版本的趋势数据
const fetchTrendingV2 = async (typeID: number, count: Optional<number> = 10) => {
    try {
        const response = await apiClient.post(`${BaseURL}/api/trending/v2/${typeID}?amount=${count}`, {});
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending data:', error);
        throw error;
    }
};

export type { VideoComponent };
export { fetchVideoDetails };
export { fetchKeywordSuggestions };
export { fetchSearchResults };
export type { Item };
export { getPublicKey };
export { fetchTrending };
export { fetchTrendingV2 };
export { checkLoginStatus };
