import React from 'react';
import rightarrow from '../Resources/Images/RightArrowWhite.png';

const HeaderMainColor = ({title}) => {
    return (
        <header className="color">
            <div className="container row a-center space-b">
                <h1 className="flex1 txt-ct">{title}</h1>
            </div>
        </header>
    );
};

export default HeaderMainColor;