import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const MAX_CREDITS = 18;

const TimeTableContainer = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    grid-template-rows: repeat(26, 30px); /* 30분 단위로 나누기 위해 26 블록 (오후 9시까지) */
    gap: 2px;
    padding: 20px;
    background-color: #f3f4f6;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 800px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const TimeSlot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: ${({ color }) => color || '#ffffff'};
    color: #333;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    cursor: context-menu;

    &:hover {
        background-color: ${({ color }) => color || '#f1f5f9'};
    }
`;

const HeaderCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
    color: #4b5563;
    background-color: #e5e7eb;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Footer = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 1rem;
    color: #374151;
`;

const ContextMenu = styled.div`
    position: absolute;
    background-color: #ffe0cc;
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 0.9rem;
    color: #333;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    z-index: 10;
    cursor: pointer;
`;

function parseTimeSlots(timeSlots) {
    if (!timeSlots) return [];

    const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
    return timeSlots.flatMap((slot) => {
        const [dayPart, timeRange] = slot.split('/');
        const day = dayMap[dayPart.slice(0, 1)];
        const [start, end] = timeRange.split('-').map((time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours + minutes / 60;
        });

        if (day === undefined || start === undefined || end === undefined) return [];

        const slots = [];
        for (let time = start; time < end; time += 0.5) {
            const rowIndex = (time - 8) * 2;
            slots.push({ day, rowIndex });
        }
        return slots;
    });
}

function TimeTableComponent() {
    const [credits, setCredits] = useState(0);
    const [slots, setSlots] = useState(Array(130).fill(null)); // 26시간 블록 * 5일 = 130 슬롯
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, slotIndex: null });

    const handleAddCourse = (course) => {
        console.log('Adding course:', course);

        const timeSlotIndexes = parseTimeSlots(course.timeSlots);
        console.log('Parsed time slots:', timeSlotIndexes);

        const canAdd = timeSlotIndexes.every(({ day, rowIndex }) => !slots[rowIndex * 5 + day]);

        if (!canAdd) {
            alert('해당 시간대에 이미 과목이 배치되었습니다.');
            return;
        }

        if (credits + course.credits > MAX_CREDITS) {
            alert('최대 신청 학점을 초과할 수 없습니다.');
            return;
        }

        const newSlots = [...slots];
        timeSlotIndexes.forEach(({ day, rowIndex }) => {
            newSlots[rowIndex * 5 + day] = {
                name: course.courseName,
                code: course.courseCode,
                color: course.color || '#A7D2CB',
            };
        });

        setSlots(newSlots);
        setCredits((prevCredits) => prevCredits + course.credits);

        console.log('Updated slots with colors:', newSlots);
    };

    const handleRightClick = (event, slotIndex) => {
        event.preventDefault();
        if (slots[slotIndex]) {
            setContextMenu({ visible: true, x: event.pageX, y: event.pageY, slotIndex });
        }
    };

    const handleDeleteCourse = () => {
        const slotData = slots[contextMenu.slotIndex];
        if (slotData) {
            const updatedSlots = slots.map((slot) => (slot && slot.code === slotData.code ? null : slot));
            setSlots(updatedSlots);
            setCredits((prevCredits) => prevCredits - 3); // adjust credit deduction as needed
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    const handleClickOutside = () => {
        if (contextMenu.visible) {
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu]);

    const [, drop] = useDrop({
        accept: 'course',
        drop: (item) => handleAddCourse(item),
    });

    return (
        <div>
            <TimeTableContainer ref={drop}>
                <HeaderCell></HeaderCell>
                <HeaderCell>월</HeaderCell>
                <HeaderCell>화</HeaderCell>
                <HeaderCell>수</HeaderCell>
                <HeaderCell>목</HeaderCell>
                <HeaderCell>금</HeaderCell>
                {[...Array(26)].map((_, hour) => (
                    <React.Fragment key={hour}>
                        <HeaderCell>
                            {8 + Math.floor(hour / 2)}:{hour % 2 === 0 ? '00' : '30'}
                        </HeaderCell>
                        {[...Array(5)].map((_, day) => (
                            <TimeSlot
                                key={`${day}-${hour}`}
                                color={slots[hour * 5 + day]?.color}
                                onContextMenu={(event) => handleRightClick(event, hour * 5 + day)}
                            >
                                {slots[hour * 5 + day] ? (
                                    <>
                                        {slots[hour * 5 + day].name}
                                        <br />
                                        {slots[hour * 5 + day].code}
                                    </>
                                ) : (
                                    ''
                                )}
                            </TimeSlot>
                        ))}
                    </React.Fragment>
                ))}
            </TimeTableContainer>

            <ContextMenu
                visible={contextMenu.visible}
                style={{ top: contextMenu.y, left: contextMenu.x }}
                onClick={handleDeleteCourse}
            >
                시간표에서 삭제
            </ContextMenu>

            <Footer>
                총 신청 학점: {credits} / {MAX_CREDITS}
            </Footer>
        </div>
    );
}

export default TimeTableComponent;
