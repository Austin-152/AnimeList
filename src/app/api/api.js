// 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';

// 定义一个异步函数 fetchSearchResults，用于获取搜索结果
// 这个函数接受三个参数：keyword（关键词），page（页码，默认为1），size（每页的数量，默认为10）
const fetchSearchResults = async (keyword, page=1, size=10) => {
    try {
        // 使用 axios 发送 GET 请求到指定的 URL
        // 请求参数包括 keyword、page 和 size
        const response = await axios.get('https://api.tzpro.xyz/api/v1/search', {
            params: {
                keyword,
                page,
                size
            }
        });

        // 如果请求成功，返回响应数据
        return response.data;
    } catch (error) {
        // 如果请求失败，打印错误信息并抛出错误
        console.error('Error fetching search results:', error);
        throw error;
    }
};

// 导出 fetchSearchResults 函数，使其可以在其他文件中被导入和使用
export { fetchSearchResults };