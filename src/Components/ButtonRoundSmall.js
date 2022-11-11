import React from 'react';

const ButtonRoundSmall = ({label, color, onClick, thin}) => {
    return (
        <button className={`half ${color?"":"disabled"} ${thin?"thin":""}`} type="button" onClick={onClick}>{label}</button>
    );
};

export default ButtonRoundSmall;