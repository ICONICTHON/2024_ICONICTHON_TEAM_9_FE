// src/components/Plan/MajorBubble.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Bubble = styled.div`
    background-color: #4caf50;
    color: #fff;
    min-width: 120px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
    border: ${(props) => (props.isMandatory ? '3px solid black' : 'none')};

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
    }
`;

const HoverMenu = styled.div`
    position: absolute;
    top: ${(props) => props.position.top}px;
    left: ${(props) => props.position.left}px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    padding: 10px;
    width: 220px;
    font-size: 0.9rem;
    color: #000;
    z-index: 1000;
`;

const MenuRow = styled.div`
    padding: 8px 0;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f7f7f7;
    }
`;

const PrerequisiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin-left: 10px;
    margin-top: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const PrerequisiteTitle = styled.div`
    font-weight: bold;
    font-size: 0.85rem;
    color: #4caf50;
    margin-bottom: 5px;
`;

const PrerequisiteBubble = styled.div`
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    font-size: 0.85rem;
    color: #333;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
`;

function MajorBubble({ course }) {
    const [isHover, setIsHover] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
    const [showPrerequisites, setShowPrerequisites] = useState(false);

    const handleMouseEnter = (event) => {
        const rect = event.target.getBoundingClientRect();
        setHoverPosition({
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX,
        });
        setIsHover(true);
    };

    const handleClickOutside = (event) => {
        if (isHover && !event.target.closest('.hover-menu')) {
            setIsHover(false);
        }
    };

    useEffect(() => {
        if (isHover) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isHover]);

    const isMandatory = course.subjectArea === '전필';
    const displaySemester = course.semester === 3 ? '1,2학기' : `${course.semester} 학기`;

    return (
        <>
            <Bubble isMandatory={isMandatory} onClick={handleMouseEnter}>
                {course.courseName}
            </Bubble>
            {isHover &&
                ReactDOM.createPortal(
                    <HoverMenu
                        position={hoverPosition}
                        className="hover-menu"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        <MenuRow>{course.courseName}</MenuRow>
                        <MenuRow>{course.credit} 학점</MenuRow>
                        <MenuRow>{displaySemester}</MenuRow>
                        <MenuRow
                            onMouseEnter={() => setShowPrerequisites(true)}
                            onMouseLeave={() => setShowPrerequisites(false)}
                        >
                            선이수정보
                            {showPrerequisites && (
                                <PrerequisiteContainer>
                                    <PrerequisiteTitle>선이수과목:</PrerequisiteTitle>
                                    {course.prerequisites && course.prerequisites.length > 0 ? (
                                        course.prerequisites.map((prerequisite, index) => (
                                            <PrerequisiteBubble key={index}>
                                                {prerequisite.courseName}
                                            </PrerequisiteBubble>
                                        ))
                                    ) : (
                                        <PrerequisiteBubble>없음</PrerequisiteBubble>
                                    )}
                                </PrerequisiteContainer>
                            )}
                        </MenuRow>
                    </HoverMenu>,
                    document.body
                )}
        </>
    );
}

export default MajorBubble;
