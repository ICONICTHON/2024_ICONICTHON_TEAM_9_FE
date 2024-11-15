import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const BubblesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    min-height: 250px;
    min-width: 700px;
    margin-right: 100px;
`;

const Bubble = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-radius: 30px;
    color: black;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    background-color: ${({ color }) => color};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    width: 120px;
    height: 120px;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;

    &:hover {
        transform: scale(1.08);
        box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
    }
`;

const HoverMenu = styled.div`
    position: absolute;
    top: 90%;
    left: 3%;
    transform: translateX(-50%);
    background-color: #ffffff;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    color: #333;
    z-index: 1000;
    min-width: 240px;
    white-space: nowrap;
    border: 1px solid #ddd;
`;

const MenuItem = styled.div`
    padding: 5px 0;
    border-bottom: 1px solid #eaeaea;
    &:last-child {
        border-bottom: none;
    }
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: pointer;
    margin-top: 8px;
    width: 48%;
    transition: all 0.2s;

    &:first-child {
        background-color: #28a745;
        margin-right: 4%;
    }
    &:last-child {
        background-color: #dc3545;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

function DraggableBubble({ course, color, onAddToHopeCourses, onDeleteCourse }) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'course',
            item: () => {
                setIsHover(false); // Hide the menu when dragging starts
                return { ...course, color };
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [course, color]
    );

    const [isHover, setIsHover] = useState(false);

    return (
        <Bubble
            ref={drag}
            color={color}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {course.courseName} <br /> {course.courseCode}
            {isHover && (
                <HoverMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <MenuItem>
                        <strong>
                            {course.courseName} / {course.instructorName}
                        </strong>
                    </MenuItem>
                    <MenuItem>{course.credit} 학점</MenuItem>
                    <MenuItem>{course.classSchedule.join(', ')}</MenuItem>
                    <MenuItem>{course.classRoom}</MenuItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ActionButton onClick={() => onAddToHopeCourses(course)}>담기</ActionButton>
                        <ActionButton onClick={() => onDeleteCourse(course.courseCode)}>삭제</ActionButton>
                    </div>
                </HoverMenu>
            )}
        </Bubble>
    );
}

function MajorCourseBubbles({ courses, onAddToHopeCourses, onDeleteCourse }) {
    const colors = ['#A2D2FF', '#FFC4C4', '#FFD6A5', '#BDE0FE', '#C3FBD8', '#FF9CEE'];

    return (
        <BubblesContainer>
            {courses.map((course, index) => (
                <DraggableBubble
                    key={course.courseCode}
                    course={course}
                    color={colors[index % colors.length]}
                    onAddToHopeCourses={onAddToHopeCourses}
                    onDeleteCourse={onDeleteCourse}
                />
            ))}
        </BubblesContainer>
    );
}

export default MajorCourseBubbles;
