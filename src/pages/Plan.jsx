// src/pages/Plan.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSearchResults } from '../../redux/slice/searchSlice';
import Sidebar from '../components/common/Sidebar';
import SearchComponent from '../components/Plan/SearchComponent';
import MajorBubble from '../components/Plan/MajorBubble';
import GeneralBubble from '../components/Plan/GeneralBubble';
import CanvasContainer from '../components/Plan/CanvasContainer';
import { addBubble } from '../../redux/slice/bubbleSlice';
import { ReactFlowProvider } from 'reactflow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // DndProvider 백엔드 설정

const PageContainer = styled.div`
    display: flex;
    background-color: #f9f9f9;
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
    gap: 10px;
    overflow-x: auto;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    max-width: 1000px;
    white-space: nowrap;
`;

export default function Plan() {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.search.results);
    const bubbles = useSelector((state) => state.bubbles.bubbles);

    const handleSelectCourse = (course) => {
        dispatch(addBubble(course));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {' '}
            {/* DndProvider 추가 */}
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

                    <SectionTitle>전공 과목 목록</SectionTitle>
                    <BubblesContainer>
                        {bubbles
                            .filter((course) => course.subjectArea === '전공' || course.subjectArea === '전필')
                            .map((course) => (
                                <MajorBubble key={course.id} course={course} />
                            ))}
                    </BubblesContainer>

                    <SectionTitle>교양 과목 목록</SectionTitle>
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

                    <ReactFlowProvider>
                        <CanvasContainer />
                    </ReactFlowProvider>
                </MainContent>
            </PageContainer>
        </DndProvider>
    );
}
