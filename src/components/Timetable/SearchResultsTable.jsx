// src/components/Timetable/SearchResultsTable.jsx
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
    margin-top: 20px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    max-height: 300px;
    overflow: hidden;
    max-width: 1400px;
`;

const ScrollableTable = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    max-height: 300px;
    display: block;
    width: 100%;
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(80px, 1fr)) repeat(17, minmax(150px, 1fr));
    background-color: #f2f2f2;
    padding: 8px;
    font-weight: bold;
    color: #333;
    min-width: 100%;
    width: 3120px;
    box-sizing: border-box;
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(80px, 1fr)) repeat(17, minmax(150px, 1fr));
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
    white-space: nowrap;
    box-sizing: border-box;
`;

const Cell = styled.div`
    padding: 4px;
    color: #333;
    font-size: 0.9rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const AddButton = styled.button`
    padding: 2px 15px;
    font-size: 0.9rem;
    color: white;
    background: linear-gradient(135deg, #b0b0b0, #7a7a7a);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #7a7a7a, #b0b0b0);
        transform: scale(1.05);
        box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: scale(0.95);
    }
`;

function SearchResultsTable({ data = [], onAddCourse }) {
    return (
        <TableContainer>
            <ScrollableTable>
                <TableHeader>
                    <Cell>번호</Cell>
                    <Cell>수업담기</Cell>
                    <Cell>학수강좌번호</Cell>
                    <Cell>교과목명</Cell>
                    <Cell>학년</Cell>
                    <Cell>교과과정</Cell>
                    <Cell>교과영역구분</Cell>
                    <Cell>교원명</Cell>
                    <Cell>비고</Cell>
                    <Cell>수업캠퍼스</Cell>
                    <Cell>요일/교시</Cell>
                    <Cell>강의실</Cell>
                    <Cell>학점</Cell>
                    <Cell>이론</Cell>
                    <Cell>실습</Cell>
                    <Cell>공학설계</Cell>
                    <Cell>강의유형</Cell>
                    <Cell>강의종류</Cell>
                    <Cell>원어강의</Cell>
                    <Cell>이수구분</Cell>
                    <Cell>개설대학</Cell>
                    <Cell>교과목영문명</Cell>
                    <Cell>개설학부</Cell>
                    <Cell>개설학과</Cell>
                </TableHeader>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <Cell>{index + 1}</Cell>
                        <Cell>
                            <AddButton
                                onClick={() =>
                                    onAddCourse({
                                        id: item.id,
                                        courseName: item.courseName,
                                        courseCode: item.courseCode,
                                        credit: item.credit,
                                        instructorName: item.instructorName,
                                        classSchedule: item.classSchedule ? item.classSchedule.split(',') : [],
                                        classRoom: item.classRoom,
                                        color: item.curriculum === '전공' ? '#A2D2FF' : '#FFD67F',
                                        curriculum: item.curriculum, // curriculum 속성 추가
                                    })
                                }
                            >
                                담기
                            </AddButton>
                        </Cell>
                        {Object.values(item)
                            .slice(1)
                            .map((value, idx) => (
                                <Cell key={idx}>{value}</Cell>
                            ))}
                    </TableRow>
                ))}
            </ScrollableTable>
        </TableContainer>
    );
}

export default SearchResultsTable;
