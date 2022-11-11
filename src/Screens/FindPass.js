import React, {useState, useEffect} from 'react';
import { useInput, validMail, nickFormat, validBirth } from '../Utils';
import { HeaderColor, Input, FooterButton, ButtonRound} from '../Components';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import '../Css/FindUser.scss';
import checkImg from '../Resources/Images/CheckGreen.png';
import infoImg from '../Resources/Images/InfoGray.png';

const FindPass = () => {
    const [state, onChange] = useInput({ nick:'', birthday:'', email:''});
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
        if(!nickFormat(state.nick) || !validBirthday || !validEmail) { setSubmit(false); return `valid false`; }
        setSubmit(true); return `success`;
    }

    useEffect(()=>{
        buttonActivate()
    },[state]);
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    const findNick = async()=> {
        await Api.send('member_findPass', { 'nick':state.nick, 'birthday':state.birthday, 'email':state.email }, (args)=>{  
            if(args.result) {
                setInputForm(!args.result);
                setNick(args.data.nick);
                setWdate(args.data.wdate);
            } else {
                alert(args.message);
            }
            console.log(args);
        })
    }

    return (
        <>
        <HeaderColor title="비밀번호 찾기" onClick={()=>{history(-1)}} /> 
        {
        inputForm ? (
            <>
            <div className="app-box find">
                <p className="guide-info">회원가입 시 입력했던 닉네임과 생년월일, 이메일을 입력해 주세요.</p>
                <form autoComplete='off'>
                <Input label="닉네임" name="nick" value={state.nick} onChange={onChange} intype="text" />
                <Input label="생년월일" name="birthday" value={state.birthday} onChange={onChange} intype="tel" placeholder="YYYYMMDD" subinfo={birthMsg} isvalid={birthMsg!==""} maxlength={8}/>
                <Input label="이메일" name="email" value={state.email} onChange={onChange} intype="email" subinfo={emailMsg} isvalid={emailMsg!==""} iscomplete={validEmail} />
                </form>
            </div>
            <FooterButton label="비밀번호 찾기" disabled={!submit} onClick={findNick} />
            </>
        ) : (
            <div className="app-box success">
                <div className="info-box">
                    <img className="main-img" src={checkImg} alt="congrats" />
                    <p>{nick}님! 임시 비밀번호가<br/><span>이메일 주소</span> 로 발송되었습니다.</p>
                </div>
                <div className="sub-info-box">
                    <img className="circle-img" src={infoImg} alt="info" />
                    가입일자 {wdate}
                </div>
                <ButtonRound label="확인" onClick={()=>{history(-1)}} disabled={false} />
            </div>
        )}
        
        </>
    );
};

export default FindPass;