// src/components/Plan/SearchComponent.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../assets/icons/search-icon.svg';

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    margin-bottom: 20px;
`;

const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    padding: 10px 40px 10px 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
`;

const IconWrapper = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    pointer-events: none;
`;

const SearchResults = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
    font-size: 1rem;
`;

const ResultItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }
`;

function SearchComponent({ onSearch, results = [], onSelectCourse }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        onSearch(query); // 검색어를 전달하여 API 호출
    };

    return (
        <SearchContainer>
            <SearchInputWrapper>
                <SearchInput type="text" value={searchTerm} onChange={handleSearch} placeholder="과목명 검색" />
                <IconWrapper>
                    <img src={searchIcon} alt="Search Icon" width="20" height="20" />
                </IconWrapper>
            </SearchInputWrapper>
            {Array.isArray(results) &&
                results.length > 0 && ( // results가 배열인지 확인
                    <SearchResults>
                        {results.map((course) => (
                            <ResultItem key={course.id} onClick={() => onSelectCourse(course)}>
                                {course.courseName} ({course.credit}학점)
                            </ResultItem>
                        ))}
                    </SearchResults>
                )}
        </SearchContainer>
    );
}

export default SearchComponent;
