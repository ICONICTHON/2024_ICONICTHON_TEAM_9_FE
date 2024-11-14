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
        // Mock data를 검색 결과로 설정
        setSearchResults(mockData);
    };

    const handleAddCourse = (course) => {
        // 중복 확인
        const isDuplicate = [...majorCourses, ...generalCourses].some((c) => c.courseCode === course.courseCode);
        if (isDuplicate) {
            alert('동일한 학수번호의 과목은 담길 수 없습니다!');
            return;
        }

        // 전공 여부에 따라 분리해서 추가
        if (course.courseType === '전공') {
            setMajorCourses((prevCourses) => [...prevCourses, course]);
        } else {
            setGeneralCourses((prevCourses) => [...prevCourses, course]);
        }
    };

    const handleDeleteCourse = (courseCode) => {
        setMajorCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
        setGeneralCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
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
                        <h2>시간표</h2>
                        <TimeTableComponent />
                    </LeftSection>
                    <RightSection>
                        <div>
                            <h3>전공 과목 목록</h3>
                            <MajorCourseBubbles
                                courses={majorCourses}
                                onAddToHopeCourses={() => {}}
                                onDeleteCourse={handleDeleteCourse}
                            />
                        </div>
                        <div>
                            <h3>교양 과목 목록</h3>
                            <GeneralCourseBubbles
                                courses={generalCourses}
                                onAddToHopeCourses={() => {}}
                                onDeleteCourse={handleDeleteCourse}
                            />
                        </div>
                    </RightSection>
                </ContentArea>
            </MainContent>
        </PageContainer>
    );
}
