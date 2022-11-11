import React from 'react';

const FooterInput = ({ intype='text', value, onChange, label, name, placeholder, button, buttonTxt, onClick, disabled }, ) => {
    
    let holderstr = `${label}을 입력해 주세요.`;
    if(label === "상세주소" || label === "인증번호") holderstr = `${label}를 입력해 주세요.`;
    if(placeholder) holderstr = placeholder;

    return (
        <footer className="input">
            <div className="box">
            <input id={name} name={name} type={intype} value={value} onChange={onChange} placeholder={holderstr}/>
            { button && <button type="button" className={`valid-btn ${disabled===true?"off":"on"}`} onClick={onClick} disabled={disabled}>{buttonTxt}</button> }
            </div>
        </footer>
    );
};

export default FooterInput;