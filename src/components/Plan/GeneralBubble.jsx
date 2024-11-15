// src/components/Plan/GeneralBubble.jsx
import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
    background-color: #ffeb3b;
    color: #333;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
    }
`;

function GeneralBubble({ course }) {
    return <Bubble>{course.courseName}</Bubble>;
}

export default GeneralBubble;
