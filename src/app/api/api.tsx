// 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';
// 首先需要引入axios 如果没安装的话 在终端输入npm i axios 安装一下
// 定义一个接口，描述你的数据对象的结构
interface Item {
    id: number;
    typeId1: number;
    name: string;
    pic: string;
    blurb: string;
}
const BaseURL = process.env.BaseURL
console.log('BaseURL:', BaseURL);
// 定义一个异步函数 fetchSearchResults，用于获取搜索结果
// 这个函数接受三个参数：keyword（关键词），page（页码，默认为1），size（每页的数量，默认为10）
const fetchSearchResults = async (keyword: string, page="1", size=10) => {
    try {
        // noq: no-console
        console.log(`Sending POST request to https://testapi.tzpro.xyz/ with keyword: ${keyword}, page: ${page}, size: ${size}`);
        const response = await axios.post(`${BaseURL}/api/query/ole/search`, {
            keyword,
            page,
            size
        });

        // Return response.data.data instead of response.data
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};

interface DataItem {
    words: string[];
}
// 关键词联想
const fetchKeywordSuggestions = async (keyword: string) => {
    try {
        console.log(`Sending POST request to /api/query/keyword with keyword: ${keyword}`);
        const response = await axios.post(`${BaseURL}/api/query/ole/keyword`, {
            keyword
        });

        // Extract words from each item in the data array and flatten them into a single array
        const suggestions = response.data.data.flatMap((item: DataItem) => item.words);

        return suggestions;
    } catch (error) {
        console.error('Error fetching keyword suggestions:', error);
        throw error;
    }
};
// 定义 VideoCommponent 类型
interface VideoComponent {
    title: string;
    url: string;
    index: number;
}

// 获取视频详情
const fetchVideoDetails = async (id: string): Promise<VideoComponent[]> => {
    try {

        const response = await axios.post(`${BaseURL}/api/query/ole/detail`, { id });

        // 访问 response.data.data.urls 数组
        const urls = response.data.data.urls;

        if (!Array.isArray(urls)) {
            throw new Error('Unexpected data structure: urls is not an array');
        }

        // 将 urls 数组映射为 VideoComponent 数组
        const videoDetails: VideoComponent[] = urls.map((item: any, idx: number) => ({
            title: item.title,
            url: item.url,
            index: idx + 1,
        }));

        console.log('Mapped video details:', videoDetails);

        return videoDetails;
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    }
};


export type {VideoComponent};
export { fetchVideoDetails };

export { fetchKeywordSuggestions };
export { fetchSearchResults };
export type { Item };
