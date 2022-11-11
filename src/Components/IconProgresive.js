import React from 'react';

const IconProgresive = ({data, _i}) => {
    return (
        <div className={`icon-cont ${data.prior === _i ? "selected" : ""}`}>
            <img src={data.icon} alt={`icon_${data.title}`} />
            <div className={`icon-bar ${data.prior} ${data.prior === _i ? "selected" : ""}`} style={{backgroundColor:data.icon_color}} />
        </div>
    );
};

export default IconProgresive;