import React from 'react';
import close from '../Resources/Images/CloseWhite.png';

const HeaderColorModal = ({title, onClick}) => {
    return (
        <header className="color">
            <div className="container row a-center space-b">
                <button className="flex1" type="button" onClick={onClick}>
                    <img className="close-btn" src={close} alt="close-button"/>
                </button>
                <h1 className="flex10 txt-ct">{title}</h1>
                <div className="flex1"></div>
            </div>
        </header>
    );
};

export default HeaderColorModal;