// 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';
// 首先需要引入axios 如果没安装的话 在终端输入npm i axios 安装一下
// 定义一个接口，描述你的数据对象的结构
interface Item {
    id: number;
    typeId1: number;
    name: string;
    picThumb: string;
    blurb: string;
}

interface DataItem {
    words: string[];
}

// 定义一个异步函数 fetchSearchResults，用于获取搜索结果
// 这个函数接受三个参数：keyword（关键词），page（页码，默认为1），size（每页的数量，默认为10）
const fetchSearchResults = async (keyword: string, page="1", size=10) => {
    try {
        console.log(`Sending POST request to https://testapi.tzpro.xyz/ with keyword: ${keyword}, page: ${page}, size: ${size}`);
        const response = await axios.post('/api/query/ole/search', {
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

// 在 api.tsx 文件中添加
const fetchKeywordSuggestions = async (keyword: string) => {
    try {
        console.log(`Sending POST request to /api/query/keyword with keyword: ${keyword}`);
        const response = await axios.post('/api/query/ole/keyword', {
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

export { fetchKeywordSuggestions };
export { fetchSearchResults };
export type { Item };