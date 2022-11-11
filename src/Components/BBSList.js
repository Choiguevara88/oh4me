import React from 'react';
import bubble from '../Resources/Images/CommentBubble.png';

const BBSList = ({data, onClick}) => {
    return (
        <div className="bbs-panel" onClick={onClick}>
            <div className="row space-b bbs-head gap10">
                <h1>{data?.subject}</h1>
                <span>
                    <img src={bubble} alt="comment-bubble" />
                    {data?.cmt}
                </span>
            </div>
            <div className="row space-b top20 bbs-body">
                <span>{data?.nick}</span>
                <span>{data?.wdate2}</span>
            </div>
        </div>
    );
};

export default BBSList;