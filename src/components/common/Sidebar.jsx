import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
    width: 130px;
    background-color: #ffffff;
    border-right: 1px solid #e0e0e0;
    padding: 20px;
    height: 100vh;

    font-size: 1.2rem;
`;

const SidebarTitle = styled.h2`
    font-size: 1.2rem;
    color: #d2691e;
    margin-bottom: 20px;
`;

const MenuItem = styled.div`
    margin: 15px 0;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #d2691e;
    }
`;

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <SidebarContainer>
            <SidebarTitle>메뉴</SidebarTitle>
            <MenuItem onClick={() => navigate('/timetable')}>시간표 짜기</MenuItem>
            <MenuItem onClick={() => navigate('/plan')}>4년 수강 계획표</MenuItem>
        </SidebarContainer>
    );
}
