// MajorCourseBubbles.jsx

import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const BubblesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    min-height: 250px;
    min-width: 600px;
`;

const Bubble = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-radius: 20px;
    color: white;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    line-height: 1.3;
    background-color: ${({ color }) => color};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    width: 100px;
    height: 100px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

function DraggableBubble({ course, color }) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'course',
            item: {
                courseName: course.courseName,
                courseCode: course.courseCode,
                credits: course.credits,
                timeSlots: course.timeSlots, // 요일 및 교시 정보
                color: color, // 강좌의 색상을 item 객체에 추가
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [course, color] // color 의존성 추가
    );

    return (
        <Bubble ref={drag} color={color} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {course.courseName} <br /> {course.courseCode}
        </Bubble>
    );
}

function MajorCourseBubbles({ courses }) {
    const colors = ['#A7D2CB', '#FFD3B4', '#FFAAA5', '#D4A5A5'];

    return (
        <BubblesContainer>
            {courses.map((course, index) => (
                <DraggableBubble key={course.courseCode} course={course} color={colors[index % colors.length]} />
            ))}
        </BubblesContainer>
    );
}

export default MajorCourseBubbles;
