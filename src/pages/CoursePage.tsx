import { useState, useCallback } from 'react';
import { useCourses } from '../api/useCourses';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

export const CoursePage = () => {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);

    // Gọi API lấy 5 môn/trang
    const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page, 5);

    // Dùng useCallback để tránh re-render trùng lặp
    const handleSearch = useCallback((newKeyword: string) => {
        setKeyword(newKeyword);
        setPage(0); // Reset về trang 1 khi gõ từ khóa mới
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <h2>Danh sách Học phần Mở đăng ký</h2>

            {/* Ô tìm kiếm có xử lý Debounce */}
            <SearchBox onSearch={handleSearch} placeholder="Nhập tên môn học cần tìm..." />

            {/* Danh sách hiển thị tự động xử lý 4 trạng thái */}
            <div style={{ marginTop: '20px' }}>
                <CourseList
                    courses={courses}
                    state={state}
                    errorMessage={errorMessage}
                    onRetry={refetch}
                />
            </div>

            {/* Thanh điều hướng trang */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};