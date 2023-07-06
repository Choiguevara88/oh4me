import React,{useEffect,useState,useRef} from 'react';
import { FooterMenu, HeaderMainColor, ButtonRoundSmall } from '../Components';
import { useNavigate } from 'react-router-dom';
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/MyPage.scss';
import personWhite from '../Resources/Images/PersonWhite.png';
import personBlack from '../Resources/Images/PersonBlack.png';
import note from '../Resources/Images/Note.png';
import ra from '../Resources/Images/RightArrow.png';
import lo from '../Resources/Images/Logout.png';

const MyPage = () => {
    
  const member    = useMemberState();
  const memberDispatch  = useMemberDispatch();
  const [meminfo, setMeminfo] = useState(member.info);
  const [loggedin, setLoggedin] = useState(member.loggedin);
  const history = useNavigate();
  const ref = useRef();
  const ref2 = useRef();

  const closeModal = () => {
    ref.current.style.display = "none";
    ref2.current.style.display = "none";
  }
  const openModal = () => {
    ref.current.style.display   = 'block';
    ref2.current.style.display  = 'block';
  }
  
  const logout = async() => {
    let data = { nick:member.info.nick };
    await Api.send('member_logout', data, (args)=>{  
      if(args.result) {
        memberDispatch({ type:"LOGOUT" });
        window.sessionStorage.removeItem("midx");
        window.location.replace("/");
        if(window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify( {'login':false} ));
        }
      }
    });
  }

  useEffect(()=>{
      if(loggedin !== true) { history("/", true); }
  },[loggedin]);
  const rnMessage = () => {
    if(window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
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
          <div className="row space-b a-center pointer top15" onClick={openModal}>
            <div className="mypage-menu row a-center">
              <div><img src={lo} alt="log-out" className='log-out' /></div>
              <p>로그아웃</p>
            </div>
            
          </div>          
        </div>
      </div>
      <FooterMenu select="mypage"/>

      <div className="modal-bg" ref={ref}>
          <div className="report-modal-bg" onClick={()=>{closeModal()}}></div>
          <div className="report-modal" ref={ref2}>
              <h1>로그아웃</h1>
              <p className="info">로그아웃 하시겠습니까?</p>
              <div className="btn-box-round row space-b a-center top30">
                  <ButtonRoundSmall label="닫기" onClick={()=>{closeModal()}} thin={true} />
                  <ButtonRoundSmall label="로그아웃" color onClick={()=>{logout()}} thin={true} />
              </div>
          </div>
      </div>


      </>
  );
};

export default MyPage;