import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
    courses: Course[];
    state?: LoadState;
    loading?: boolean;
    error?: string | null;
    errorMessage?: string;
    onRetry: () => void;
    onEdit?: (course: Course) => void;
    onDelete?: (course: Course) => void;
}

export default function CourseList({
                                       courses,
                                       state,
                                       loading,
                                       error,
                                       errorMessage,
                                       onRetry,
                                       onEdit,
                                       onDelete
                                   }: CourseListProps) {
    const isLoading = loading || state === 'loading';
    const errorMsg = error || errorMessage;
    const isError = Boolean(errorMsg) || state === 'error';
    const isEmpty = (!courses || courses.length === 0) || state === 'empty';

    if (isLoading) return <p>Đang tải danh sách môn học...</p>;

    if (isError) {
        return (
            <div style={{ color: '#b91c1c' }}>
                <p>{errorMsg || 'Đã xảy ra lỗi khi tải dữ liệu.'}</p>
                <button onClick={onRetry}>Thử lại</button>
            </div>
        );
    }

    if (isEmpty) return <p>Không tìm thấy môn học nào phù hợp.</p>;

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #333' }}>
                <th>Tên môn học</th>
                <th>Số tín chỉ</th>
                <th>Số chỗ còn lại</th>
                <th style={{ textAlign: 'center' }}>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {courses.map((course) => {
                const record = course as unknown as Record<string, number | undefined>;
                const credits = course.soTinChi ?? record.tinChi ?? record.credits ?? 3;

                return (
                    <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td>{course.tenMonHoc}</td>
                        <td>{credits}</td>
                        <td style={{ color: course.soChoConLai === 0 ? '#b91c1c' : 'inherit' }}>
                            {course.soChoConLai} / {course.soChoToiDa}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(course)}
                                    style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
                                >
                                    Sửa
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(course)}
                                    style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
                                >
                                    Xóa
                                </button>
                            )}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}