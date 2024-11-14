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
    min-height: 120px;
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
    min-width: 100px;
    min-height: 50px;
    transition: transform 0.2s;
    opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};

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
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [course]
    );

    return (
        <Bubble ref={drag} color={color} isDragging={isDragging}>
            {course.courseName} <br /> {course.courseCode}
        </Bubble>
    );
}

function GeneralCourseBubbles({ courses }) {
    const colors = ['#FFC3A0', '#FF9A8B', '#FF7E67', '#FF6B6B'];

    return (
        <BubblesContainer>
            {courses.map((course, index) => (
                <DraggableBubble key={index} course={course} color={colors[index % colors.length]} />
            ))}
        </BubblesContainer>
    );
}

export default GeneralCourseBubbles;
