import React from 'react';

const AuroraCard8 = ({ card, onClick, selected }) => {
    return (
        <div className={`aurora-card-8 pointer ${selected>-1?"selected":""}`} onClick={onClick} style={{backgroundColor:card.color}}>
            <img src={card.figure} />
        </div>
    );
};

export default AuroraCard8;