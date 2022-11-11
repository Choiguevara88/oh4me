import React from 'react';
import homeOn from '../Resources/Images/FooterHomeOn.png';
import homeOff from '../Resources/Images/FooterHomeOff.png';
import diaryOn from '../Resources/Images/FooterDiaryOn.png';
import diaryOff from '../Resources/Images/FooterDiaryOff.png';
import ringOn from '../Resources/Images/FooterRingOn.png';
import ringOff from '../Resources/Images/FooterRingOff.png';
import mypageOn from '../Resources/Images/FooterMyOn.png';
import mypageOff from '../Resources/Images/FooterMyOff.png';
import { Link } from 'react-router-dom';

const FooterMenu = ({select}) => {
    return (
        <footer className="home">
            <ul className="footer-menu">
                <li className={select==="home"?"on":""}><Link to="/home"><img src={select==="home"?homeOn:homeOff} alt="footer-icon-home"/><p>홈</p></Link></li>
                <li className={select==="ring"?"on":""}><Link to="/push"><img src={select==="ring"?ringOn:ringOff} alt="footer-icon-home"/><p>알림</p></Link></li>
                <li className={select==="diary"?"on":""}><Link to="/diary"><img src={select==="diary"?diaryOn:diaryOff} alt="footer-icon-home"/><p>다이어리</p></Link></li>
                <li className={select==="mypage"?"on":""}><Link to="/mypage"><img src={select==="mypage"?mypageOn:mypageOff} alt="footer-icon-home"/><p>내정보</p></Link></li>
            </ul>
        </footer>
    );
};

export default FooterMenu;