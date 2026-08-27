import axios from 'axios';
import type { Course, PageResponse } from '../types/course';

// Gọi API thông qua Gateway (cổng 8080 hoặc port Gateway bạn thiết lập)
const API_BASE_URL = 'http://localhost:8080/api/courses';

export const getCourses = (keyword: string, page: number, size: number) => {
    return axios.get<PageResponse<Course>>(API_BASE_URL, {
        params: {
            keyword,
            page,
            size,
        },
    });
};