import React from 'react';

const RadioButton = ({label, data, onChange, name}) => {
    return (
        <div className="input-box">
           <label>{label}</label>
           <div className="check-box">
            {data.map((e, i) => {
                let idx = `check-box-${name}-${i}`;
                return (
                <React.Fragment key={idx}>
                    <input type="radio" name={name} value={e.value} id={idx} onChange={onChange} />
                    <label htmlFor={idx} className="flex1">{e.label}</label>
                </React.Fragment>)
            })}
           </div>
        </div>
    );
};

export default RadioButton;