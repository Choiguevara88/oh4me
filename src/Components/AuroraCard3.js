import React from 'react';
import img from '../Resources/Images/MinusBlack.png';

const AuroraCard3 = ({ card, onClick, pointer, button }) => {
    return (
        <div className={`aurora-card-9 ${pointer ? "pointer" : ""}`} style={{backgroundColor:card?.color}}>
            <img src={card.figure} />
            {button &&
            <button type="button" className="circle-btn" onClick={onClick}>
            <img src={img} alt="minus-btn" />
            </button>
            }
        </div>
    );
};

export default AuroraCard3;