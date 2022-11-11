import React from 'react';

const CommentList = ({data, onClick,reply}) => {
    return (
        <div className={`comment-box ${data.depth > 1 ? "recomment" : ""}`}>
            {data.depth > 1 && <div className="recomment-nick">Re: <span>{data?.renick}</span></div> }
            <div className="comment-head">
                <span className="comment-nick">{data?.nick}</span>
                <button type="button" onClick={onClick}>{data.editable === true ? `답글 삭제` : `신고하기`}</button>
            </div>
            <p className="comment-content">{data?.content}</p>
            <span className="comment-date">{data.wdate}&nbsp;&nbsp;&nbsp;<button type="button" onClick={reply}>답글 달기</button></span>
        </div>
    );
};

export default CommentList;