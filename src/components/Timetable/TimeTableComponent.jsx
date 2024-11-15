import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const TimeTableContainer = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    grid-template-rows: repeat(31, 30px);
    gap: 2px;
    padding: 20px;
    background-color: #f3f4f6;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 800px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
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
`;

const HeaderCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({ transparent }) => (transparent ? 'transparent' : '#4b5563')};
    background-color: ${({ transparent }) => (transparent ? 'transparent' : '#e5e7eb')};
    padding: 5px;
    border-radius: 5px;
`;

const TimeLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    color: #6b7280;
    padding-left: 30px;
    padding-bottom: 22px;
`;

const Header = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    color: #374151;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    background-color: #edf2f7;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: 20px auto;
`;

const CreditInput = styled.input`
    width: 60px;
    font-size: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
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

function parseTimeSlots(classSchedule) {
    if (!classSchedule) return [];
    const dayMap = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
    return classSchedule.flatMap((slot) => {
        const [dayPart, timeRange] = slot.split('/');
        const day = dayMap[dayPart.slice(0, 1)];
        const [start, end] = timeRange.split('-').map((time) => {
            const [hours, minutes] = time.split(':').map(Number);
            let decimalTime = hours + minutes / 60;

            // 50분을 반올림 처리하여 30분 간격에 맞추기
            decimalTime = Math.round(decimalTime * 2) / 2;
            return decimalTime;
        });

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
    const [maxCredits, setMaxCredits] = useState(21);
    const [slots, setSlots] = useState(Array(150).fill(null));
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, slotIndex: null });

    const handleAddCourse = (course) => {
        const timeSlotIndexes = parseTimeSlots(course.classSchedule);
        const canAdd = timeSlotIndexes.every(({ day, rowIndex }) => !slots[rowIndex * 5 + day]);

        if (!canAdd) {
            alert('해당 시간대에 이미 과목이 배치되었습니다.');
            return;
        }

        if (credits + course.credit > maxCredits) {
            alert('최대 신청 학점을 초과할 수 없습니다.');
            return;
        }

        const newSlots = [...slots];
        timeSlotIndexes.forEach(({ day, rowIndex }) => {
            newSlots[rowIndex * 5 + day] = {
                name: course.courseName,
                code: course.courseCode,
                color: course.color || '#A7D2CB',
                credit: course.credit,
            };
        });

        setSlots(newSlots);
        setCredits((prevCredits) => prevCredits + course.credit);
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
            const courseCredits = slotData.credit;
            setSlots(updatedSlots);
            setCredits((prevCredits) => prevCredits - courseCredits);
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

    const times = Array.from({ length: 30 }, (_, i) => {
        const hour = 8 + Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour}:${minute}`;
    });

    return (
        <div>
            <Header>
                총 신청 학점: {credits} /
                <CreditInput
                    type="number"
                    value={maxCredits}
                    onChange={(e) => setMaxCredits(parseInt(e.target.value, 10))}
                />
                학점
            </Header>
            <TimeTableContainer ref={drop}>
                <HeaderCell transparent />
                <HeaderCell>월</HeaderCell>
                <HeaderCell>화</HeaderCell>
                <HeaderCell>수</HeaderCell>
                <HeaderCell>목</HeaderCell>
                <HeaderCell>금</HeaderCell>
                {times.map((time, hour) => (
                    <React.Fragment key={hour}>
                        <TimeLabel>{time}</TimeLabel>
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
        </div>
    );
}

export default TimeTableComponent;
