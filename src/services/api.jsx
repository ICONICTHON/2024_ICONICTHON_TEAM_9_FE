import axios from 'axios';

// 기본 API 인스턴스 설정
const api = axios.create({
    baseURL: 'https://influencerdp.shop', // 여기에 API의 기본 URL을 입력하세요.
    headers: {
        'Content-Type': 'application/json',
    },
});

// GET 요청 함수
export const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('GET 요청 오류:', error);
        throw error;
    }
};

// POST 요청 함수
export const post = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error('POST 요청 오류:', error);
        throw error;
    }
};

// PUT 요청 함수
export const put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error('PUT 요청 오류:', error);
        throw error;
    }
};

// DELETE 요청 함수
export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error('DELETE 요청 오류:', error);
        throw error;
    }
};

export default api;
