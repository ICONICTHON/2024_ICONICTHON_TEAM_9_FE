// src/pages/Plan.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../../redux/slice/searchSlice';
import SearchComponent from '../components/Plan/SearchComponent';
import Sidebar from '../components/common/Sidebar';

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f9f9f9;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Header = styled.div`
    padding-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

export default function Plan() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const dispatch = useDispatch();

    // search slice의 상태가 있는지 확인
    const { results = [], loading, error } = useSelector((state) => state.search || {});

    const handleSearch = (query) => {
        dispatch(fetchSearchResults(query));
    };

    const handleSelectCourse = (course) => {
        console.log('Selected Course:', course);
        setSelectedCourse(course);
    };

    return (
        <PageContainer>
            <Sidebar />
            <MainContent>
                <Header>과목 검색창</Header>
                <SearchComponent
                    onSearch={handleSearch}
                    results={results}
                    loading={loading}
                    onSelectCourse={handleSelectCourse}
                />
                {selectedCourse && (
                    <div>
                        <h3>선택된 과목</h3>
                        <p>과목명: {selectedCourse.courseName}</p>
                        <p>학점: {selectedCourse.credit}</p>
                    </div>
                )}
            </MainContent>
        </PageContainer>
    );
}
