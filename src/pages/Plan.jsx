// src/pages/Plan.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Sidebar from '../components/common/Sidebar';
import SearchComponent from '../components/Plan/SearchComponent';
import MajorBubble from '../components/Plan/MajorBubble';
import GeneralBubble from '../components/Plan/GeneralBubble';
import CanvasContainer from '../components/Plan/CanvasContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchSearchResults } from '../../redux/slice/searchSlice';
import { addBubble } from '../../redux/slice/bubbleSlice';

const PageContainer = styled.div`
    display: flex;
    background-color: #f9f9f9;
    height: 2500px;
`;

const SidebarContainer = styled.div`
    background-color: #ffffff;
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
    margin-bottom: 20px;
`;

const Plan = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.search.results);
    const bubbles = useSelector((state) => state.bubbles.bubbles);

    const handleSearch = (query) => {
        dispatch(fetchSearchResults(query));
    };

    const handleSelectCourse = (course) => {
        dispatch(addBubble(course));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <PageContainer>
                <SidebarContainer>
                    <Sidebar />
                </SidebarContainer>
                <MainContent>
                    <TopBar>
                        <SearchSection>
                            <SearchComponent
                                onSearch={handleSearch}
                                results={searchResults}
                                onSelectCourse={handleSelectCourse}
                            />
                        </SearchSection>
                    </TopBar>

                    <SectionTitle>전공 과목</SectionTitle>
                    <BubblesContainer>
                        {bubbles
                            .filter((course) => course.subjectArea === '전공' || course.subjectArea === '전필')
                            .map((course) => (
                                <MajorBubble key={course.id} course={course} />
                            ))}
                    </BubblesContainer>

                    <SectionTitle>교양 과목</SectionTitle>
                    <BubblesContainer>
                        {bubbles
                            .filter((course) => ['공통교양', 'BSM', '기본소양'].includes(course.subjectArea))
                            .map((course) => (
                                <GeneralBubble key={course.id} course={course} />
                            ))}
                    </BubblesContainer>

                    <SectionTitle>학기별 과목 계획표</SectionTitle>
                    <CanvasContainer style={{ height: '1000px' }} />
                </MainContent>
            </PageContainer>
        </DndProvider>
    );
};

export default Plan;
