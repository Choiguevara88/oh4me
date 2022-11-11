import React from 'react';

const ButtonRound = ({label, disabled, onClick}) => {
    return (
        <div className="btn-box-round">
            <button className={disabled===false?"":"disabled"} type="button" onClick={onClick} disabled={disabled}>{label}</button>
        </div>
    );
};

export default ButtonRound;