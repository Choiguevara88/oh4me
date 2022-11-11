import React from 'react';

const ButtonRoundLong = ({label, styleName, onClick, nobutton}) => {
    return (
        <div className={`btn-box-round`}>
            <button className={`long ${styleName} ${nobutton?"default":""}`} type="button" onClick={onClick}>{label}</button>
        </div>
    );
};

export default ButtonRoundLong;