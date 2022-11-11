import React from 'react';
import logo from '../Resources/Images/HeaderLogo.png';

const HeaderMain = ({list, select, onClick}) => {
    return (
        <header className="home">
            <img src={logo} alt="header-logo" className="header-logo" />
            <ul className="header-menu">
                {list && list.map((e,i)=>{
                    let key = `menu${i}`;
                    return (
                        <li className={select === e.value?"selected":""} onClick={ onClick } key={key} value={i}>{e.label}</li>
                    )
                })}
            </ul>    
        </header>
    );
};

export default HeaderMain;