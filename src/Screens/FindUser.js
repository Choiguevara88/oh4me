import React, {useState, useEffect} from 'react';
import { useInput, validMail, validBirth } from '../Utils';
import { HeaderColor, Input, FooterButton, ButtonRoundSmall} from '../Components';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import '../Css/FindUser.scss';
import checkImg from '../Resources/Images/CheckGreen.png';
import infoImg from '../Resources/Images/InfoGray.png';

const FindUser = () => {
    const [state, onChange] = useInput({ birthday:'', email:''});
    const history = useNavigate();
    const [birthMsg, setBirthMsg] = useState('');
    const [validBirthday, setValidBirthday] = useState(false);
    const [emailMsg, setEmailMsg] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputForm, setInputForm] = useState(true);
    const [nick, setNick] = useState('');
    const [wdate, setWdate] = useState('');

    useEffect(()=>{
        if(state.birthday!==""&&!validBirth(state.birthday)) {setBirthMsg("생년월일을 정확히 입력해주세요.");setValidBirthday(false);}
        else                                                {setBirthMsg("");setValidBirthday(false);}  
        if(state.birthday!==""&&validBirth(state.birthday)) {setBirthMsg("");setValidBirthday(true);}
    },[state.birthday]);

    useEffect(()=>{
        if(state.email!==""&&!validMail(state.email)) {setEmailMsg("이메일 형식에 맞춰 입력해주세요.");setValidEmail(false);}
        else                                                {setEmailMsg("");setValidEmail(false);}  
        if(state.email!==""&&validMail(state.email)) {setEmailMsg("");setValidEmail(true);}
    },[state.email]);    

    const buttonActivate = () => {
        for(let key in state) { if(state[key]==="") { setSubmit(false); return `state : ${key}`; } }
        if(!validBirthday || !validEmail) { setSubmit(false); return `valid false`; }
        setSubmit(true); return `success`;
    }

    useEffect(()=>{
        buttonActivate()
    },[state]);

    const findNick = async()=> {
        await Api.send('member_findNick', { 'birthday':state.birthday, 'email':state.email }, (args)=>{  
            if(args.result) {
                setInputForm(!args.result);
                setNick(args.data.nick);
                setWdate(args.data.wdate);
            } else {
                alert(args.message);
            }
            // console.log(args);
        })
    }
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    return (
        <>
        <HeaderColor title="닉네임 찾기" onClick={()=>{history(-1)}} /> 
        {
        inputForm ? (
            <>
            <div className="app-box find">
                <p className="guide-info">회원가입 시 입력했던 생년월일과 이메일을 입력해 주세요.</p>
                <form autoComplete='off'>
                <Input label="생년월일" name="birthday" value={state.birthday} onChange={onChange} intype="tel" placeholder="YYYYMMDD" subinfo={birthMsg} isvalid={birthMsg!==""} maxlength={8}/>
                <Input label="이메일" name="email" value={state.email} onChange={onChange} intype="email" subinfo={emailMsg} isvalid={emailMsg!==""} iscomplete={validEmail} />
                </form>
            </div>
            <FooterButton label="닉네임 찾기" disabled={!submit} onClick={findNick} />
            </>
        ) : (
            <div className="app-box success">
                <div className="info-box">
                    <img className="main-img" src={checkImg} alt="congrats" />
                    <p>고객님의 닉네임은<br/><span>{nick}</span> 입니다.</p>
                </div>
                <div className="sub-info-box">
                    <img className="circle-img" src={infoImg} alt="info" />
                    가입일자 {wdate}
                </div>
                <div className="btn-box-round row space-b a-center">
                    <ButtonRoundSmall label="비밀번호 찾기" onClick={()=>{history('/findPass',{ replace: true })}} />
                    <ButtonRoundSmall label="확인" color onClick={()=>{history(-1)}} />
                </div>
            </div>
        )}
        
        </>
    );
};

export default FindUser;