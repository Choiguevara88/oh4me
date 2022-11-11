import React from 'react';

const PushList = ({data, onClick}) => {
    return (
        <div className={`push-pannel ${data.new === true ? "new" : ""}`} onClick={onClick}>
            <div className={`push-head ${data.new === true ? "new" : ""} row space-b a-center`}>
                <h1 className="w84">{data.title}</h1>
                <span className="w16 txt-rt">{data.wdate2}</span>
            </div>
            <p className="push-body top7">
            {
                data?.content.split('\n').map((t,i)=>{
                    return (<React.Fragment key={`push_content_${i}`}>{t}<br/></React.Fragment>)
                })
            }
            </p>
        </div>
    );
};

export default PushList;