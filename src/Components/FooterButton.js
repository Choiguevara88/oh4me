import React from 'react';

const FooterButton = ({label, onClick, disabled}) => {
    return (
        <footer className="button">
            <button type="button" className={disabled?"disabled":""} onClick={onClick} disabled={disabled}>{label}</button>
        </footer>
    );
};

export default FooterButton;