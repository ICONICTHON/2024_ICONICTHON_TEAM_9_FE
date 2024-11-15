import axios from 'axios';

// 베이스 URL 수정
const api = axios.create({
    baseURL: 'http://3.35.184.116', // API의 베이스 URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// API 요청 함수들
export const fetchData = async (endpoint, params = {}) => {
    try {
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== null && value !== '-전체-')
        );
        const response = await api.get(endpoint, { params: filteredParams });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('응답 에러:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('요청 오류:', error.request);
        } else {
            console.error('설정 오류:', error.message);
        }
        throw error;
    }
};

// 나머지 함수들 변경 필요 없음
export const postData = async (endpoint, data = {}, config = {}) => {
    try {
        const response = await api.post(endpoint, data, config);
        return response.data;
    } catch (error) {
        console.error(`POST 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

export const updateData = async (endpoint, data = {}) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`PUT 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error(`DELETE 요청 실패: ${endpoint}`, error);
        throw error;
    }
};
