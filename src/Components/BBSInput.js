import React from 'react';

const BBSInput = ({intype="text", label, value, onChange, name, placeholder}) => {
    let holderstr = `${label}을 입력해 주세요.`;
    if(label === "상세주소" || label === "인증번호") holderstr = `${label}를 입력해 주세요.`;
    
    if(placeholder) holderstr = placeholder;
    return (
        <input type={intype} value={value} onChange={onChange} name={name} placeholder={holderstr} className="bbs-input" /> 
    );
};

export default BBSInput;