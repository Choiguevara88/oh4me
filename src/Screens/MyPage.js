import React,{useEffect,useState} from 'react';
import { FooterMenu, HeaderMainColor,  } from '../Components';
import { useNavigate } from 'react-router-dom';
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import '../Css/MyPage.scss';
import personWhite from '../Resources/Images/PersonWhite.png';
import personBlack from '../Resources/Images/PersonBlack.png';
import note from '../Resources/Images/Note.png';
import ra from '../Resources/Images/RightArrow.png';

const MyPage = () => {
    
  const member    = useMemberState();
  const [meminfo, setMeminfo] = useState(member.info);
  const [loggedin, setLoggedin] = useState(member.loggedin);
  const history = useNavigate();
    
  useEffect(()=>{
      if(loggedin !== true) { history("/", true); }
  },[loggedin]);
  const rnMessage = () => {
    if(window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
    }
}
useEffect(()=>{ rnMessage(); },[]);

  return (
      <>
      <HeaderMainColor title="내정보"/>
      <div className="home-box2"> 
        <h1 className="nick-box"><span className="nick">{meminfo?.nick}</span>님 반갑습니다!</h1>
      </div>
      <div className="home-box5 top5">
        <div className="mypage-box">
          <h1 className="box-label">마이 페이지</h1>
          
          <div className="row space-b a-center pointer" onClick={()=>{history('/update')}}>
            <div className="mypage-menu row a-center">
              <div><img src={personWhite} alt="person-white" className='person-white' /></div>
              <p>회원 정보 수정</p>
            </div>
            <img className="right-arrow" src={ra} alt="right-arrow"/>
          </div>
          
          <div className="row space-b a-center pointer top15" onClick={()=>{history('/mentoring')}}>
            <div className="mypage-menu row a-center">
              <div><img src={note} alt="note" className='note' /></div>
              <p>상담글 확인</p>
            </div>
            <img className="right-arrow" src={ra} alt="right-arrow"/>
          </div>
          
          <div className="row space-b a-center pointer top15" onClick={()=>{history('/out')}}>
            <div className="mypage-menu row a-center">
              <div><img src={personBlack} alt="person-black" className='person-black' /></div>
              <p>회원 탈퇴</p>
            </div>
            <img className="right-arrow" src={ra} alt="right-arrow"/>
          </div>
        </div>
      </div>
      <FooterMenu select="mypage"/>
      </>
  );
};

export default MyPage;