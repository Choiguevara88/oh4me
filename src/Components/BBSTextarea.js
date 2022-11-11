import React from 'react';

const BBSTextarea = ({value, label, onChange, name, placeholder, cnt}) => {
    let holderstr = `${label}을 입력해 주세요.`;
    if(label === "상세주소" || label === "인증번호") holderstr = `${label}를 입력해 주세요.`;
    
    if(placeholder) holderstr = placeholder;
    return (
        <div className="relative">
            <textarea value={value} onChange={onChange} id={name} name={name} placeholder={holderstr} className="bbs-input">
                
            </textarea>
            <label htmlFor={name}><span>{cnt}</span>/1000</label>
        </div>
    );
};

export default BBSTextarea;