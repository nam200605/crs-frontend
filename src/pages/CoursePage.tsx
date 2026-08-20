import { useState } from 'react';

interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    lecturer: string;
    registered: boolean;
}

export const CoursePage = () => {
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', code: 'INT1234', name: 'Lập trình Web', credits: 3, lecturer: 'Nguyễn Văn A', registered: false },
        { id: '2', code: 'INT5678', name: 'Cơ sở dữ liệu', credits: 3, lecturer: 'Trần Thị B', registered: false },
        { id: '3', code: 'INT9012', name: 'Kiến trúc máy tính', credits: 2, lecturer: 'Lê Văn C', registered: false },
    ]);

    const toggleRegister = (id: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, registered: !c.registered } : c));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Danh sách Học phần Mở đăng ký</h2>
            <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                <tr style={{ backgroundColor: '#222', color: '#fff' }}>
                    <th>Mã MH</th>
                    <th>Tên môn học</th>
                    <th>Số tín chỉ</th>
                    <th>Giảng viên</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.id}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.credits}</td>
                        <td>{course.lecturer}</td>
                        <td>{course.registered ? 'Đã đăng ký' : 'Chưa đăng ký'}</td>
                        <td>
                            <button
                                onClick={() => toggleRegister(course.id)}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: course.registered ? '#dc3545' : '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {course.registered ? 'Hủy đăng ký' : 'Đăng ký'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};