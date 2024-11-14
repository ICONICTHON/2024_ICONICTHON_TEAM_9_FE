import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 10px;
    background-color: #4b5563;
    color: white;
    font-weight: bold;
    border: 1px solid #ddd;
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
`;

const DeleteButton = styled.button`
    padding: 5px 10px;
    color: white;
    background-color: #ff6b6b;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #ff4b4b;
    }
`;
function HopeCourseTable({ hopeCourses = [], onDelete }) {
    // 기본값 추가
    return (
        <TableContainer>
            <h3>희망강의신청목록</h3>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>삭제</TableHeader>
                        <TableHeader>우선순위</TableHeader>
                        <TableHeader>학수강좌번호</TableHeader>
                        <TableHeader>교과목명</TableHeader>
                        <TableHeader>학년</TableHeader>
                        <TableHeader>교과과정</TableHeader>
                        <TableHeader>교과영역구분</TableHeader>
                        <TableHeader>교원명</TableHeader>
                        <TableHeader>비고</TableHeader>
                        <TableHeader>수업캠퍼스</TableHeader>
                        <TableHeader>요일/교시</TableHeader>
                        <TableHeader>강의실</TableHeader>
                        <TableHeader>학점</TableHeader>
                        <TableHeader>이론</TableHeader>
                        <TableHeader>실습</TableHeader>
                        <TableHeader>공학설계</TableHeader>
                        <TableHeader>강의유형</TableHeader>
                        <TableHeader>강의종류</TableHeader>
                        <TableHeader>원어강의</TableHeader>
                        <TableHeader>이수구분</TableHeader>
                        <TableHeader>개설대학</TableHeader>
                        <TableHeader>교과목영문명</TableHeader>
                        <TableHeader>개설학부</TableHeader>
                        <TableHeader>개설학과</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {hopeCourses.map((course, index) => (
                        <TableRow key={course.courseCode}>
                            <TableCell>
                                <DeleteButton onClick={() => onDelete(course.courseCode)}>삭제</DeleteButton>
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{course.courseCode}</TableCell>
                            <TableCell>{course.courseName}</TableCell>
                            <TableCell>{course.grade}</TableCell>
                            <TableCell>{course.curriculum}</TableCell>
                            <TableCell>{course.area}</TableCell>
                            <TableCell>{course.teacher}</TableCell>
                            <TableCell>{course.remark}</TableCell>
                            <TableCell>{course.campus}</TableCell>
                            <TableCell>{course.timeSlots.join(', ')}</TableCell>
                            <TableCell>{course.room}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.theory}</TableCell>
                            <TableCell>{course.practice}</TableCell>
                            <TableCell>{course.design}</TableCell>
                            <TableCell>{course.type}</TableCell>
                            <TableCell>{course.classType}</TableCell>
                            <TableCell>{course.language}</TableCell>
                            <TableCell>{course.category}</TableCell>
                            <TableCell>{course.college}</TableCell>
                            <TableCell>{course.englishName}</TableCell>
                            <TableCell>{course.department}</TableCell>
                            <TableCell>{course.major}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
}

export default HopeCourseTable;
