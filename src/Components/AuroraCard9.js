import React from 'react';

const AuroraCard9 = ({ card, onClick, pointer }) => {
    return (
        <div className={`aurora-card-9 ${pointer?"pointer":""}`} onClick={onClick} style={{backgroundColor:card.color}}>
            <img src={card.figure} />
            
        </div>
    );
};

export default AuroraCard9;