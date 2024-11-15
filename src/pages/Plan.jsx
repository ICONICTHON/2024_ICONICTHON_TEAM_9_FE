// src/pages/Plan.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSearchResults } from '../../redux/slice/searchSlice';
import Sidebar from '../components/common/Sidebar';
import SearchComponent from '../components/Plan/SearchComponent';
import MajorBubble from '../components/Plan/MajorBubble';
import GeneralBubble from '../components/Plan/GeneralBubble';
import { addBubble } from '../../redux/slice/bubbleSlice';

const PageContainer = styled.div`
    display: flex;
    background-color: #f9f9f9;
    height: 100vh;
`;

const SidebarContainer = styled.div`
    width: 250px;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const SearchSection = styled.div`
    flex: 1;
`;

const SectionTitle = styled.h2`
    margin: 20px 0 10px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
`;

const BubblesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export default function Plan() {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.search.results);
    const bubbles = useSelector((state) => state.bubbles.bubbles); // Corrected path to bubbles

    const handleSelectCourse = (course) => {
        dispatch(addBubble(course));
    };

    return (
        <PageContainer>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <MainContent>
                <TopBar>
                    <SearchSection>
                        <SearchComponent
                            onSearch={(query) => dispatch(fetchSearchResults(query))}
                            results={searchResults}
                            onSelectCourse={handleSelectCourse}
                        />
                    </SearchSection>
                </TopBar>

                <SectionTitle>Major Courses</SectionTitle>
                <BubblesContainer>
                    {bubbles
                        .filter((course) => course.subjectArea === '전공' || course.subjectArea === '전필')
                        .map((course) => (
                            <MajorBubble key={course.id} course={course} />
                        ))}
                </BubblesContainer>

                <SectionTitle>General Courses</SectionTitle>
                <BubblesContainer>
                    {bubbles
                        .filter(
                            (course) =>
                                course.subjectArea === '공통교양' ||
                                course.subjectArea === 'BSM' ||
                                course.subjectArea === '기본소양'
                        )
                        .map((course) => (
                            <GeneralBubble key={course.id} course={course} />
                        ))}
                </BubblesContainer>
            </MainContent>
        </PageContainer>
    );
}
