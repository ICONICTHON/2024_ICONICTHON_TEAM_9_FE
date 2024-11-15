import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ffffff;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
    gap: 10px;
    max-width: 1600px;
`;

const Label = styled.label`
    font-size: 0.9rem;
    color: #555;
    margin-right: 5px;
`;

const Dropdown = styled.select`
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    width: 100px;
`;

const InputField = styled.input`
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 4px 20px;
    font-size: 1rem;
    color: white;
    background-color: #ff7f50;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #ff6347;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }
`;

function SearchForm({
    curriculum,
    subjectArea,
    openingCollege,
    openingDepartment,
    openingMajor,
    campus,
    lectureCategory,
    classSchedule,
    instructorName,
    keyword,
    onCurriculumChange,
    onAreaChange,
    onOpeningCollegeChange,
    onOpeningDepartmentChange,
    onOpeningMajorChange,
    onCampusChange,
    onLectureCategoryChange,
    onClassScheduleChange,
    onInstructorNameChange,
    onKeywordChange,
    onSearch,
}) {
    const handleSearchClick = () => {
        const searchParams = {
            curriculum: curriculum === '-전체-' ? null : curriculum,
            subjectArea: subjectArea === '-전체-' ? null : subjectArea,
            openingCollege: openingCollege === '-전체-' ? null : openingCollege,
            openingDepartment: openingDepartment === '-전체-' ? null : openingDepartment,
            openingMajor: openingMajor === '-전체-' ? null : openingMajor,
            campus: campus === '-전체-' ? null : campus,
            lectureCategory: lectureCategory === '-전체-' ? null : lectureCategory,
            classSchedule: classSchedule === '-전체-' ? null : classSchedule,
            instructorName,
            keyword,
        };

        console.log('Sending Search Parameters:', searchParams);
        onSearch(searchParams);
    };

    const areaOptions = {
        '-전체-': ['-전체-'],
        공통교양: [
            '-전체-',
            '대학탐구',
            '자아성찰',
            '시민',
            '고전',
            '글쓰기',
            '명작',
            '리더십',
            '지역연구',
            '영어',
            'SW',
            '한국문화',
            '기초역량',
            '문화',
            '동국인성',
            '사고와소통',
        ],
        학문기초: [
            '-전체-',
            '제1영역:불교와문화',
            '제2영역:인문과학',
            '제3영역:사회과학',
            '제4영역:자연과학',
            '제5영역:외국어',
            '제6영역:일반교양',
        ],
        일반교양: ['-전체-', '인문', '사회', '자연', '문화예술체육', '융복합', '자기계발'],
        대학전공기초: ['-전체-'],
        전공: ['-전체-', '전문', '기초', '공통'],
    };

    const departmentOptions = [
        '-전체-',
        '불교대학',
        '문과대학',
        '이과대학',
        '사범대학',
        '법과대학',
        '사회과학대학',
        '경찰사법대학',
        '경영대학',
        '생명과학대학',
        '생명자원과학대학',
        '바이오시스템대학',
        '공과대학',
        'AI융합대학',
        '첨단융합대학',
        '정보산업대학',
        '영상미디어대학',
        '예술대학',
        '약학대학',
        '미래융합대학',
        '다르마칼리지',
        '스포츠과학과',
        '시간제대학',
        '이부대학',
    ];

    const majorOptions = {
        '-전체-': ['-전체-'],
        AI융합대학: ['-전체-', 'AI융합학부', 'AI소프트웨어융합학부', '시스템반도체학부'],
    };

    const specializationOptions = {
        '-전체-': ['-전체-'],
        AI융합학부: ['-전체-', '인공지능전공', '데이터사이언스전공', '엔터테이먼트테크놀로지전공'],
        AI소프트웨어융합학부: [
            '-전체-',
            '컴퓨터공학전공',
            '멀티미디어소프트웨어공학전공',
            '인공지능전공',
            '데이터사이언스전공',
            '엔터테이먼트테크놀로지전공',
        ],
        시스템반도체학부: ['-전체-'],
        AI융합대: ['-전체-'],
    };

    const handleCurriculumChange = (e) => {
        onCurriculumChange(e);
        onAreaChange({ target: { value: '-전체-' } });
        onOpeningCollegeChange({ target: { value: '-전체-' } });
        onOpeningDepartmentChange({ target: { value: '-전체-' } });
        onOpeningMajorChange({ target: { value: '-전체-' } });
    };

    return (
        <Header>
            <Label>조직분류 :</Label>
            <Dropdown value="학부(서울)" disabled>
                <option>학부(서울)</option>
            </Dropdown>

            <Label>년도 :</Label>
            <Dropdown value="2024" disabled>
                <option>2024</option>
            </Dropdown>

            <Label>학기 :</Label>
            <Dropdown value="2학기" disabled>
                <option>2학기</option>
            </Dropdown>

            <Label>교과과정 :</Label>
            <Dropdown value={curriculum} onChange={handleCurriculumChange}>
                <option>-전체-</option>
                <option>공통교양</option>
                <option>학문기초</option>
                <option>일반교양</option>
                <option>대학전공기초</option>
                <option>전공</option>
            </Dropdown>

            <Label>영역 :</Label>
            <Dropdown value={subjectArea} onChange={onAreaChange}>
                {areaOptions[curriculum]?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Dropdown>

            <Label>개설대학 :</Label>
            <Dropdown value={openingCollege} onChange={onOpeningCollegeChange}>
                {departmentOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Dropdown>

            <Label>개설학과 :</Label>
            <Dropdown value={openingDepartment} onChange={onOpeningDepartmentChange}>
                {(majorOptions[openingCollege] || ['-전체-']).map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Dropdown>

            <Label>개설전공 :</Label>
            <Dropdown value={openingMajor} onChange={onOpeningMajorChange}>
                {(specializationOptions[openingDepartment] || ['-전체-']).map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Dropdown>

            <Label>수업캠퍼스 :</Label>
            <Dropdown value={campus} onChange={onCampusChange}>
                <option>-전체-</option>
                <option>서울</option>
                <option>일산</option>
                <option>경주</option>
            </Dropdown>

            <Label>강의종류 :</Label>
            <Dropdown value={lectureCategory} onChange={onLectureCategoryChange}>
                <option>-전체-</option>
                <option>일반강의</option>
                <option>외국어강의</option>
                <option>현장학습</option>
                <option>사이버강의</option>
            </Dropdown>

            <Label>요일 :</Label>
            <Dropdown value={classSchedule} onChange={onClassScheduleChange}>
                <option>-전체-</option>
                <option>월</option>
                <option>화</option>
                <option>수</option>
                <option>목</option>
                <option>금</option>
            </Dropdown>

            <InputField type="text" placeholder="교원명" value={instructorName} onChange={onInstructorNameChange} />
            <InputField type="text" placeholder="학수번호/교과목명" value={keyword} onChange={onKeywordChange} />
            <SearchButton onClick={handleSearchClick}>조회</SearchButton>
        </Header>
    );
}

export default SearchForm;
