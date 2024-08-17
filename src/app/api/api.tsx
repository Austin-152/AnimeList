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
// 定义一个异步函数 fetchSearchResults，用于获取搜索结果
// 这个函数接受三个参数：keyword（关键词），page（页码，默认为1），size（每页的数量，默认为10）
const fetchSearchResults = async (keyword: string, page="1", size=10) => {
    try {
        // 使用 axios 发送 POST 请求到指定的 URL
        // 请求参数包括 keyword、page 和 size
        console.log(`Sending POST request to https://testapi.tzpro.xyz/ with keyword: ${keyword}, page: ${page}, size: ${size}`);
        const response = await axios.post('https://testapi.tzpro.xyz/api/v1/search', {
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
export type { Item };