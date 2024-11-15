// src/pages/TimeTable.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/common/Sidebar';
import SearchResultsTable from '../components/Timetable/SearchResultsTable';
import SearchForm from '../components/Timetable/SearchForm';
import MajorCourseBubbles from '../components/Timetable/MajorCourseBubbles';
import GeneralCourseBubbles from '../components/Timetable/GeneralCourseBubbles';
import TimeTableComponent from '../components/Timetable/TimeTableComponent';
import { fetchData } from '../services/api';

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
    max-width: 1600px;
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
    const [searchParams, setSearchParams] = useState({
        curriculum: '-전체-',
        subjectArea: '-전체-',
        openingCollege: '-전체-',
        openingDepartment: '-전체-',
        openingMajor: '-전체-',
        campus: '-전체-',
        lectureCategory: '-전체-',
        classSchedule: '-전체-',
        instructorName: '',
        keyword: '',
    });

    const [searchResults, setSearchResults] = useState([]);
    const [majorCourses, setMajorCourses] = useState([]);
    const [generalCourses, setGeneralCourses] = useState([]);

    const handleSearch = async () => {
        const queryParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value !== '-전체-' && value !== '')
        );

        console.log('Sending Query Parameters:', JSON.stringify(queryParams));

        try {
            const data = await fetchData('/api/lecture-schedules/search', queryParams);
            console.log('Received Response Data:', data);
            setSearchResults(data.data || []);
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다.', error);
        }
    };

    const handleAddCourse = (course) => {
        const isDuplicate = [...majorCourses, ...generalCourses].some((c) => c.courseCode === course.courseCode);
        if (isDuplicate) {
            alert('동일한 학수번호의 과목은 담길 수 없습니다!');
            return;
        }

        // 전공과 교양 과목 분류 기준을 교과과정 필드(curriculum)로 판단
        if (course.curriculum === '전공') {
            setMajorCourses((prevCourses) => [...prevCourses, course]);
        } else {
            setGeneralCourses((prevCourses) => [...prevCourses, course]);
        }
    };

    const handleDeleteCourse = (courseCode) => {
        setMajorCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
        setGeneralCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
    };

    const updateSearchParam = (key, value) => {
        setSearchParams((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <PageContainer>
            <Sidebar />
            <MainContent>
                <SearchForm
                    curriculum={searchParams.curriculum}
                    subjectArea={searchParams.subjectArea}
                    openingCollege={searchParams.openingCollege}
                    openingDepartment={searchParams.openingDepartment}
                    openingMajor={searchParams.openingMajor}
                    campus={searchParams.campus}
                    lectureCategory={searchParams.lectureCategory}
                    classSchedule={searchParams.classSchedule}
                    instructorName={searchParams.instructorName}
                    keyword={searchParams.keyword}
                    onCurriculumChange={(e) => updateSearchParam('curriculum', e.target.value)}
                    onAreaChange={(e) => updateSearchParam('subjectArea', e.target.value)}
                    onOpeningCollegeChange={(e) => updateSearchParam('openingCollege', e.target.value)}
                    onOpeningDepartmentChange={(e) => updateSearchParam('openingDepartment', e.target.value)}
                    onOpeningMajorChange={(e) => updateSearchParam('openingMajor', e.target.value)}
                    onCampusChange={(e) => updateSearchParam('campus', e.target.value)}
                    onLectureCategoryChange={(e) => updateSearchParam('lectureCategory', e.target.value)}
                    onClassScheduleChange={(e) => updateSearchParam('classSchedule', e.target.value)}
                    onInstructorNameChange={(e) => updateSearchParam('instructorName', e.target.value)}
                    onKeywordChange={(e) => updateSearchParam('keyword', e.target.value)}
                    onSearch={handleSearch}
                />

                <SearchResultsTable data={searchResults} onAddCourse={handleAddCourse} />

                <ContentArea>
                    <LeftSection>
                        <TimeTableComponent />
                    </LeftSection>
                    <RightSection>
                        <div>
                            <h3>전공 과목 목록</h3>
                            <MajorCourseBubbles courses={majorCourses} onDeleteCourse={handleDeleteCourse} />
                        </div>
                        <div>
                            <h3>교양 과목 목록</h3>
                            <GeneralCourseBubbles courses={generalCourses} onDeleteCourse={handleDeleteCourse} />
                        </div>
                    </RightSection>
                </ContentArea>
            </MainContent>
        </PageContainer>
    );
}
