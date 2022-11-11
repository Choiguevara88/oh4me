import React from 'react';
import rightarrow from '../Resources/Images/RightArrowWhite.png';

const HeaderColor = ({title, onClick, color}) => {
    return (
        <header className={`color color${color}`}>
            <div className="container row a-center space-b">
                <button className="flex1" type="button" onClick={onClick}>
                    <img src={rightarrow} alt="right-arrow"/>
                </button>
                <h1 className="flex10 txt-ct">{title}</h1>
                <div className="flex1"></div>
            </div>
        </header>
    );
};

export default HeaderColor;