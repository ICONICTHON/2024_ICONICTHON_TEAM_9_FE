import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/common/Sidebar';

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f9f9f9;
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f7f7f7;
`;

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ffffff;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
    gap: 10px;
`;

const Dropdown = styled.select`
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const InputField = styled.input`
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 8px 15px;
    font-size: 1rem;
    color: white;
    background-color: #d2691e;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #b2541a;
    }
`;

const TableContainer = styled.div`
    margin-top: 20px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f2f2f2;
    padding: 10px;
    font-weight: bold;
    color: #333;
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
`;

const Cell = styled.div`
    padding: 8px;
    color: #333;
    text-align: center;
`;

export default function Timetable() {
    const [year, setYear] = useState('2024');
    const [semester, setSemester] = useState('2학기');
    const [studentId] = useState('2019112421');
    const [name] = useState('이종혁');
    const [professor, setProfessor] = useState('');
    const [courseCode, setCourseCode] = useState('');

    return (
        <PageContainer>
            <Sidebar />
            <MainContent>
                <Header>
                    <Dropdown>
                        <option>조직분류</option>
                        <option>서울캠퍼스</option>
                        <option>분교캠퍼스</option>
                    </Dropdown>
                    <Dropdown>
                        <option>학부(서울)</option>
                        <option>학부(분교)</option>
                    </Dropdown>
                    <Dropdown value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </Dropdown>
                    <Dropdown value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option value="1학기">1학기</option>
                        <option value="2학기">2학기</option>
                    </Dropdown>
                    <Dropdown>
                        <option>개설대학</option>
                        <option>공과대학</option>
                        <option>사회과학대학</option>
                    </Dropdown>
                    <Dropdown>
                        <option>주야</option>
                        <option>주간</option>
                        <option>야간</option>
                    </Dropdown>
                    <Dropdown>
                        <option>개설학과</option>
                        <option>컴퓨터공학과</option>
                        <option>경영학과</option>
                    </Dropdown>
                    <Dropdown>
                        <option>개설전공</option>
                        <option>전공1</option>
                        <option>전공2</option>
                    </Dropdown>
                    <Dropdown>
                        <option>요일</option>
                        <option>월요일</option>
                        <option>화요일</option>
                    </Dropdown>
                    <Dropdown>
                        <option>시작시간</option>
                        <option>09:00</option>
                        <option>10:00</option>
                    </Dropdown>
                    <InputField type="text" value={studentId} readOnly placeholder="학번" />
                    <InputField type="text" value={name} readOnly placeholder="성명" />
                    <InputField
                        type="text"
                        placeholder="담당교원명"
                        value={professor}
                        onChange={(e) => setProfessor(e.target.value)}
                    />
                    <Dropdown>
                        <option>영역</option>
                        <option>기초</option>
                        <option>전공</option>
                    </Dropdown>
                    <InputField
                        type="text"
                        placeholder="학수번호/교과목명"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                    <SearchButton>조회</SearchButton>
                </Header>
                <TableContainer>
                    <TableHeader>
                        <Cell>No</Cell>
                        <Cell>수강신청</Cell>
                        <Cell>학수번호</Cell>
                        <Cell>교과목명</Cell>
                        <Cell>개설학과전공</Cell>
                        <Cell>이수구분</Cell>
                        <Cell>영역</Cell>
                    </TableHeader>
                    {[1, 2, 3].map((item, index) => (
                        <TableRow key={index}>
                            <Cell>{index + 1}</Cell>
                            <Cell>신청</Cell>
                            <Cell>123456</Cell>
                            <Cell>예제 과목명</Cell>
                            <Cell>컴퓨터공학과</Cell>
                            <Cell>전공</Cell>
                            <Cell>기초</Cell>
                        </TableRow>
                    ))}
                </TableContainer>
            </MainContent>
        </PageContainer>
    );
}
