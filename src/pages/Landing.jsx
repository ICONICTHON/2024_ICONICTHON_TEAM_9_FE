import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Ako from '../assets/imgs/ako.png';

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ffefd5;
    color: #d2691e;
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
`;

const AkoImage = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 20px;
    line-height: 1.3;
    background: linear-gradient(135deg, #ff8c00, #ff4500);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1.5s ease-in-out;

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const EmphasizedText = styled.span`
    color: #ff4500;
    font-weight: bold;
    font-size: 4.5rem;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 40px;
    max-width: 800px;
    color: #d2691e;
    animation: fadeIn 1.5s ease-in-out 0.5s both;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const StartButton = styled.button`
    padding: 15px 30px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #ff8c00, #ff4500);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    transform: scale(1);

    &:hover {
        background: linear-gradient(135deg, #ff4500, #ff8c00);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export default function Landing() {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/timetable');
    };

    return (
        <LandingContainer>
            <AkoImage src={Ako} alt="동국대 마스코트 Ako" />
            <Title>
                <EmphasizedText>동</EmphasizedText>국대 학생 <EmphasizedText>4</EmphasizedText>년수업{' '}
                <EmphasizedText>무</EmphasizedText>엇이든 <EmphasizedText>소</EmphasizedText>개해드립니다
            </Title>
            <Subtitle>학업 계획부터 이수 과목까지 체계적으로 관리하고 도움을 받을 수 있는 플랫폼입니다.</Subtitle>
            <StartButton onClick={handleStartClick}>서비스 시작하기</StartButton>
        </LandingContainer>
    );
}
