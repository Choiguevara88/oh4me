import React from 'react';
import writeNote from '../Resources/Images/WriteNote.png';

const WriteButton = ({disabled, onClick}) => {
    return (
        <button type="button" className={`write-btn ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={ disabled }>
            <img src={writeNote} alt="write-btn" />
            <p>글쓰기</p>
        </button>
    );
};

export default WriteButton;