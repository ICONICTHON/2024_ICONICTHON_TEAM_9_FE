import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/common/Sidebar';
import SearchResultsTable from '../components/Timetable/SearchResultsTable';
import SearchForm from '../components/Timetable/SearchForm';
import MajorCourseBubbles from '../components/Timetable/MajorCourseBubbles';
import GeneralCourseBubbles from '../components/Timetable/GeneralCourseBubbles';
import TimeTableComponent from '../components/Timetable/TimeTableComponent';
import mockData from '../data/mockData.json';

const PageContainer = styled.div`
    display: flex;
    background-color: #f9f9f9;
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
`;

const ContentArea = styled.div`
    display: flex;
    flex: 1;
    margin-top: 20px;
`;

const LeftSection = styled.div`
    flex: 2;
    margin-right: 20px;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default function Timetable() {
    const [curriculum, setCurriculum] = useState('-전체-');
    const [area, setArea] = useState('-전체-');
    const [department, setDepartment] = useState('-전체-');
    const [major, setMajor] = useState('-전체-');
    const [searchResults, setSearchResults] = useState([]);
    const [majorCourses, setMajorCourses] = useState([]);
    const [generalCourses, setGeneralCourses] = useState([]);

    const handleSearch = () => {
        setSearchResults(mockData);
    };

    const handleAddCourse = (course) => {
        // 중복 검사
        const isDuplicate = [...majorCourses, ...generalCourses].some((c) => c.courseCode === course['학수강좌번호']);

        if (isDuplicate) {
            alert('동일한 학수번호의 과목은 담길 수 없습니다!');
            return;
        }

        const courseData = {
            courseName: course['교과목명'],
            courseCode: course['학수강좌번호'],
            credits: course['학점'], // 학점 정보 추가
            // 필요한 다른 데이터 추가 가능
        };

        if (course['교과과정'] === '전공') {
            setMajorCourses((prevCourses) => [...prevCourses, courseData]);
        } else {
            setGeneralCourses((prevCourses) => [...prevCourses, courseData]);
        }
    };

    return (
        <PageContainer>
            <Sidebar />
            <MainContent>
                <SearchForm
                    curriculum={curriculum}
                    area={area}
                    department={department}
                    major={major}
                    onCurriculumChange={(e) => setCurriculum(e.target.value)}
                    onAreaChange={(e) => setArea(e.target.value)}
                    onDepartmentChange={(e) => setDepartment(e.target.value)}
                    onMajorChange={(e) => setMajor(e.target.value)}
                    onSearch={handleSearch}
                />
                <SearchResultsTable data={searchResults} onAddCourse={handleAddCourse} />

                <ContentArea>
                    <LeftSection>
                        <h3>시간표</h3>
                        <TimeTableComponent />
                    </LeftSection>
                    <RightSection>
                        <div>
                            <h3>전공 과목 목록</h3>
                            <MajorCourseBubbles courses={majorCourses} />
                        </div>
                        <div>
                            <h3>교양 과목 목록</h3>
                            <GeneralCourseBubbles courses={generalCourses} />
                        </div>
                    </RightSection>
                </ContentArea>
            </MainContent>
        </PageContainer>
    );
}
