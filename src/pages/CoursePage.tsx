import { useState, useCallback } from 'react';
import axios from 'axios';
import { useCourses } from '../api/useCourses';
import { createCourse, updateCourse, deleteCourse } from '../api/courseApi';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import CourseForm from '../components/CourseForm';
import type { Course, CourseFormValues } from '../types/course';

interface ApiErrorResponse {
    message?: string;
    [key: string]: unknown;
}

export const CoursePage = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Lấy đúng các giá trị mà useCourses trả về: state và errorMessage
    const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page, 5);

    const handleSearch = useCallback((newKeyword: string) => {
        setKeyword(newKeyword);
        setPage(0);
    }, []);

    const extractErrorMessage = (err: unknown): string => {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
            const data = err.response?.data;
            if (data?.message) return data.message;
            if (data) {
                const firstFieldError = Object.values(data).find((v) => typeof v === 'string');
                if (firstFieldError) return firstFieldError as string;
            }
        }
        return 'Đã xảy ra lỗi, vui lòng thử lại.';
    };

    const handleFormSubmit = async (values: CourseFormValues) => {
        setSubmitting(true);
        setFormError(null);
        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, values);
            } else {
                await createCourse(values);
            }
            setEditingCourse(null);
            refetch();
        } catch (err: unknown) {
            setFormError(extractErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (course: Course) => {
        if (!window.confirm(`Xóa môn học "${course.tenMonHoc}"?`)) return;
        try {
            await deleteCourse(course.id);
            refetch();
        } catch (err: unknown) {
            alert(extractErrorMessage(err));
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <h2>Quản lý môn học (Admin)</h2>

            <CourseForm
                editingCourse={editingCourse}
                onSubmit={handleFormSubmit}
                onCancel={() => setEditingCourse(null)}
                submitting={submitting}
                serverError={formError}
            />

            <SearchBox onSearch={handleSearch} placeholder="Nhập tên môn học cần tìm..." />

            <div style={{ marginTop: '20px' }}>
                <CourseList
                    courses={courses}
                    state={state}
                    errorMessage={errorMessage}
                    onRetry={refetch}
                    onEdit={setEditingCourse}
                    onDelete={handleDelete}
                />
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};