import React from 'react';
import styled from 'styled-components';

const Popup = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border: 1px solid red;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
`;

const PopupMessage = ({ message, onClose }) => (
    <Popup>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <p>{message}</p>
    </Popup>
);

export default PopupMessage;
