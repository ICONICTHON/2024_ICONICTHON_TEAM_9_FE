// src/pages/Plan.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchComponent from '../components/Plan/SearchComponent';
import Sidebar from '../components/common/Sidebar';
import { fetchSearchResults } from '../../redux/slice/searchSlice';

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
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.search);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            dispatch(fetchSearchResults(searchTerm));
        }
    }, [searchTerm, dispatch]);

    const handleSelectCourse = (course) => {
        console.log('Selected Course:', course);
        setSelectedCourse(course);
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    return (
        <PageContainer>
            <Sidebar />
            <MainContent>
                <Header>과목 검색창</Header>
                <SearchComponent onSearch={handleSearch} results={results} onSelectCourse={handleSelectCourse} />
                {selectedCourse && (
                    <div>
                        <h3>선택된 과목</h3>
                        <p>과목명: {selectedCourse.courseName}</p>
                        <p>학점: {selectedCourse.credit}</p>
                    </div>
                )}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </MainContent>
        </PageContainer>
    );
}
