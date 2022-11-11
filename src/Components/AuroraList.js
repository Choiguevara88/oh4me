import React from 'react';

const AuroraList = ({data, onClick}) => {
    return (
        <div className="masonry-box" onClick={onClick}>
            <div className="relative">
                <img src={data.photo} alt="aurora-bbs-thumb" />
                <div className="masonry-icon-box" style={{backgroundColor:data.color}}>
                <img src={data.icon} alt="aurora-bbs-icon" />
            </div>
            </div>
            <p>{data.subject}</p>
        </div>
    );
};

export default AuroraList;