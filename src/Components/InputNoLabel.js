import React from 'react';

const InputNoLabel = ({intype, value, onChange, label, name, placeholder, isvalid, subinfo, iscomplete, button, buttonTxt, onClick, disabled, maxlength, colorbutton, readonly}) => {
    let holderstr = `${label}을 입력해 주세요.`;
    if(label === "상세주소" || label === "인증번호") holderstr = `${label}를 입력해 주세요.`;
    if(placeholder) holderstr = placeholder;
    return (
        <div className="input-box no-label">
           <input id={name} name={name} type={intype} value={value} onChange={onChange} placeholder={holderstr} disabled={disabled} maxLength={maxlength} readOnly={readonly} />
           { isvalid && <p className={iscomplete?"input-complete":"input-alert"}>{subinfo}</p>}
           { button && <button type="button" className="valid-btn" onClick={onClick}>{buttonTxt}</button> }
           { colorbutton && <button type="button" className="valid-btn color" onClick={onClick}>{buttonTxt}</button> }
        </div>
    );
};

export default InputNoLabel;