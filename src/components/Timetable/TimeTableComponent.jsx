// TimeTableComponent.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const MAX_CREDITS = 18;

const TimeTableContainer = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    grid-template-rows: repeat(12, 60px);
    gap: 2px;
    padding: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 700px;
`;

const TimeSlot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: ${({ isOccupied }) => (isOccupied ? '#ffdbdb' : '#ffffff')};
    position: relative;
    cursor: pointer;
`;

const HeaderCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: #f2f2f2;
`;

const Footer = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 1rem;
`;

function parseTimeSlot(timeSlot) {
    if (!timeSlot) return []; // Check for undefined timeSlot and return an empty array

    const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
    const [dayPart, timeRange] = timeSlot.split(/(?=\d)/);
    const day = dayMap[dayPart];
    const [startHour] = timeRange.split('-');
    const startHourIndex = parseFloat(startHour) - 8;

    return day !== undefined && startHourIndex >= 0 ? [{ day, startHour: startHourIndex }] : [];
}

function TimeTableComponent() {
    const [credits, setCredits] = useState(0);
    const [slots, setSlots] = useState(Array(60).fill(null));

    const handleAddCourse = (course) => {
        const timeSlots = course.timeSlots.flatMap(parseTimeSlot);

        const canAdd = timeSlots.every(({ day, startHour }) => !slots[startHour * 5 + day]);

        if (!canAdd) {
            alert('해당 시간대에 이미 과목이 배치되었습니다.');
            return;
        }

        if (credits + course.credits > MAX_CREDITS) {
            alert('최대 신청 학점을 초과할 수 없습니다.');
            return;
        }

        const newSlots = [...slots];
        timeSlots.forEach(({ day, startHour }) => {
            newSlots[startHour * 5 + day] = course.courseName;
        });

        setSlots(newSlots);
        setCredits((prevCredits) => prevCredits + course.credits);
    };

    const [, drop] = useDrop({
        accept: 'course',
        drop: (item) => handleAddCourse(item),
    });

    return (
        <div>
            <TimeTableContainer ref={drop}>
                <HeaderCell></HeaderCell>
                <HeaderCell>Mon</HeaderCell>
                <HeaderCell>Tue</HeaderCell>
                <HeaderCell>Wed</HeaderCell>
                <HeaderCell>Thu</HeaderCell>
                <HeaderCell>Fri</HeaderCell>
                {[...Array(12)].map((_, hour) => (
                    <>
                        <HeaderCell key={`hour-${hour}`}>{8 + hour}:00</HeaderCell>
                        {[...Array(5)].map((_, day) => (
                            <TimeSlot key={`${day}-${hour}`} isOccupied={!!slots[hour * 5 + day]}>
                                {slots[hour * 5 + day] ? slots[hour * 5 + day] : ''}
                            </TimeSlot>
                        ))}
                    </>
                ))}
            </TimeTableContainer>
            <Footer>
                총 신청 학점: {credits} / {MAX_CREDITS}
            </Footer>
        </div>
    );
}

export default TimeTableComponent;
