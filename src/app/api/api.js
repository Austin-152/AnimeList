// api.js
import axios from 'axios';

const fetchSearchResults = async (keyword, page=1, size=10) => {
    try {
        const response = await axios.get('https://api.tzpro.xyz/api/v1/search', {
            params: {
                keyword,
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};

export { fetchSearchResults };
