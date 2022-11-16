import React, { useEffect, useState, useRef, useCallback } from 'react';
import {HeaderColor, HeaderColorModal, Input, InputNoLabel, RadioButton, FooterButton} from '../Components';
import { useInput, validPassword, validatePhone, validBirth } from '../Utils';
import { useNavigate } from 'react-router-dom';
import ReactDaumPost from 'react-daumpost-hook';
import parse from 'html-react-parser';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Join.scss';

const Join = () => {
    const [state, onChange] = useInput({ nick:'', passwd:'', passwd2:'', birthday:'', sex:'', category:'', hp:'', authnum:'', email:'', address2:'', edu:'0', kind:'0'});
    const history = useNavigate();
    const [nickMsg, setNickMsg] = useState('');
    const [validNick, setValidNick] = useState(false);
    const [passMsg, setPassMsg] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [birthMsg, setBirthMsg] = useState('');
    const [validBirthday, setValidBirthday] = useState(false);
    const sex = [{value:'M',label:'남성'},{value:'W',label:'여성'}];
    const category = [{value:'0',label:'일반회원'},{value:'1',label:'상담사'}];
    const [isSend, setIsSend] = useState(false);
    const [hpMsg, setHpMsg] = useState('');
    const [validHp, setValidHp] = useState(false);
    const [authMsg, setAuthMsg] = useState('');
    const [validAuth, setValidAuth] = useState(false);
    const [emailMsg, setEmailMsg] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [addr, setAddr] = useState({post:'', address1:''});
    const [service,setService] = useState([]);
    const [requiredServe, setRequiredServe] = useState([]);
    const [agree, setAgree] = useState([]);
    const [submit, setSubmit] = useState(false);
    const eduList = [{value:'0', label:'상담심리 학사'},{value:'1', label:'상담심리 석사'},{value:'2', label:'상담심리 박사'}];
    const kindList = [{value:'0', label:'멘토'},{value:'1', label:'상담가'}];
    const [isVisable, setIsVisable] = useState(false);
    const [isVisable2, setIsVisable2] = useState([]);
    
    const member = useMemberState();
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    useEffect(()=>{
        if(state.passwd!==""&&!validPassword(state.passwd)) {setPassMsg("비밀번호는 영문,숫자 조합 6자리 이상이어야합니다.");setValidPass(false)}
        else                                               {setPassMsg("");setValidPass(false)}
        if(state.passwd2!==""&&state.passwd!==state.passwd2) {setPassMsg("비밀번호가 일치하지 않습니다.");setValidPass(false)}
        if(state.passwd2!==""&&state.passwd===state.passwd2) {setPassMsg("비밀번호가 일치합니다.");setValidPass(true)}
    },[state.passwd, state.passwd2]);
    
    useEffect(()=>{
        if(state.birthday!==""&&!validBirth(state.birthday)) {setBirthMsg("생년월일을 정확히 입력해주세요.");setValidBirthday(false);}
        else                                                {setBirthMsg("");setValidBirthday(false);}  
        if(state.birthday!==""&&validBirth(state.birthday)) {setBirthMsg("");setValidBirthday(true);}
    },[state.birthday]);

    useEffect(()=>{
        if(state.category === "1") setIsVisable(true);
    },[state.category]);
    
    const getService = async() => {
        await Api.send('app_service',{}, (args)=>{
            if(args.result) {
                setService(args.data);
                let tmp = [];
                let tmp2 = [];
                // args?.data.map((e,i)=>{
                    
                // });
                for(let e of args.data) {
                    if(e.required === "1") { tmp.push(e.code); tmp2[e.code] = false; }
                }

                setRequiredServe(tmp);
                setIsVisable2(tmp2);
            }
        });
    }
    useEffect(()=>{/*console.log(isVisable2)*/},[isVisable2]);
    useEffect(()=>{ getService();},[]);
    
    const checkNick = async() =>{
        const nick = state.nick;
        await Api.send('member_validNick', { 'nick':nick }, (args)=>{  
            setValidNick(args.result);
            setNickMsg(args.message);
        })
    }
    const checkEmail = async() => {
        const email = state.email;
        await Api.send('member_validEmail', { 'email':email }, (args)=>{  
            setValidEmail(args.result);
            setEmailMsg(args.message);
        })
    }
    const sendSms = async() => {
        const hp = state.hp;
        await Api.send('member_sendSms', { 'hp':hp, 'token':member.token }, (args)=>{  
            setIsSend(args.result);
            setHpMsg(args.message);
            if(args.message === "최근 발송내역이 있습니다. 잠시 후 다시 요청해주세요.") alert(args.message);
        })
    }
    const checkSms = async() => {
        const hp = state.hp;
        const authnum = state.authnum;
        await Api.send('member_checkSms', { 'hp':hp, 'authnum':authnum, 'token':member.token }, (args)=>{  
            setValidAuth(args.result);
            setValidHp(args.result);
            setAuthMsg(args.message);
        })
    }
    const onCheckedAll = useCallback(
        (checked) => {
            if (checked) {
            const checkedListArray = [];
            service.forEach((list) => checkedListArray.push(list.code));
            setAgree(checkedListArray);
            } else {
            setAgree([]);
            }
        },
        [service]
    );
    const onCheckedElement = useCallback((checked, code) => {
        if (checked) setAgree([...agree, code]); 
        else setAgree(agree.filter((el) => el !== code));
    },[agree]);

    const serviceActivate = useCallback((code) => {
        setIsVisable2([...isVisable2, code]);
    },[isVisable2]);
    const serviceUnactivate = useCallback((code) => {
        setIsVisable2(isVisable2.filter((el) => el !== code));
    },[isVisable2]);


    const buttonActivate = () => {
        for(let key in state) { if(state[key]==="") { setSubmit(false); return `state : ${key}`; } }
        for(let key in addr) { if(addr[key]==="") { setSubmit(false); return `addr : ${key}`; } }
        if(!validNick || !validPass || !validBirthday || !validHp || !validAuth || !validEmail) { setSubmit(false); return `valid false`; }
        if((requiredServe.filter(x => !agree.includes(x))).length > 0) {setSubmit(false); return `array false`;}
        setSubmit(true); return `success`;
    }

    useEffect(()=>{
        // console.log(buttonActivate());
        buttonActivate()
    },[state, addr, agree]);

    const ref = useRef(null);
    const ref2 = useRef(null);
    const postConfig = {
        ref : ref,
        onComplete : (data) => {
            // console.log(data);
            let address = {post:'', address1:''};
            address.post = data.zonecode;
            switch(data.userSelectedType) {
                case "R" :  address.address1 = data.roadAddress; break;
                case "J" :  address.address1 = data.jibunAddress; break;
                default : ;
            }
            setAddr(address);
            ref2.current.style.display = "none";
            ref.current.style.display = "none";
        }
    }
    const onClickPost = ReactDaumPost(postConfig);

    const memberJoin = async () => {
        let data = {...state, ...addr, agree:agree, token:member.token };
        // console.log("submit ::::::: ",data);
        await Api.send('member_join', data, (args)=>{  
            // console.log(args.data);
            if(args.result) {
                // memberDispatch({ type:"LOGIN", info: args.data });
                alert(args.message);
                history("/", true);
            } else {
                alert(args.message);
            }
        });
    }
    useEffect(()=>{
        if(member.loggedin === true)    history("/home",true);
    },[member]);

    return (
    <>
        <HeaderColor title="회원가입" onClick={()=>{history(-1)}} /> 
        <div className="app-box join">
            <div className="app-cont">
            <form autoComplete='off'>
                <Input label="닉네임" name="nick" value={state.nick} onChange={onChange} intype="text" subinfo={nickMsg} isvalid={nickMsg!==""} iscomplete={validNick} button buttonTxt={"중복확인"} onClick={checkNick} readonly={validNick} />
                <Input label="비밀번호" name="passwd" value={state.passwd} onChange={onChange} intype="password"  className="password" placeholder="영문, 숫자 조합 6자리 이상"/>
                <InputNoLabel label="비밀번호 확인" name="passwd2" value={state.passwd2} onChange={onChange} intype="password" placeholder="비밀번호 재입력"  subinfo={passMsg} isvalid={passMsg!==""} iscomplete={validPass}/>
                <Input label="생년월일" name="birthday" value={state.birthday} onChange={onChange} intype="tel" placeholder="YYYYMMDD" subinfo={birthMsg} isvalid={birthMsg!==""} maxlength={8}/>
                <RadioButton label="성별" name="sex" data={sex} onChange={onChange} />
                <RadioButton label="분류" name="category" data={category} onChange={onChange} />
                <Input label="휴대 전화 번호" name="hp" value={state.hp} onChange={onChange} intype="tel" button={validatePhone(state.hp)&&!validAuth} buttonTxt={!isSend?"인증번호":"재발송"} onClick={sendSms} maxlength={13} readonly={validHp} subinfo={hpMsg} isvalid={hpMsg!==""} />
                {isSend && <InputNoLabel label="인증번호" name="authnum" value={state.authnum} onChange={onChange} intype="tel" subinfo={authMsg} isvalid={authMsg!==""} iscomplete={validAuth} colorbutton={!validAuth} readonly={validAuth} buttonTxt="인증확인" onClick={checkSms} maxlength={6}/> }
                <Input label="이메일" name="email" value={state.email} onChange={onChange} intype="email" subinfo={emailMsg} isvalid={emailMsg!==""} iscomplete={validEmail} button buttonTxt={"중복확인"} onClick={checkEmail} readonly={validEmail}/>
                <Input label="우편번호" name="post" value={addr.post}  intype="tel" button buttonTxt="검색" onClick={()=>{ref2.current.style.display = "block"; onClickPost();}} maxlength={5} readonly={true} placeholder="우편번호를 검색해 주세요." />
                <Input label="주소지" name="address1" value={addr.address1} onChange={onChange} intype="text" readonly={true} placeholder="우편번호를 검색하면 자동 입력됩니다." />
                <Input label="상세주소" name="address2" value={state.address2} onChange={onChange} intype="text" />
                <div className="all-agree agree-box">
                    <input type="checkbox" id="allChk" onChange={(el)=>{onCheckedAll(el.target.checked)}}/><label htmlFor='allChk'>아래 약관에 모두 동의합니다.</label>
                </div>
                <div>
                    {service && service.map((e, i)=>{
                        let name = `agree${i}`;
                        let req = e.required*1;
                        return (
                            <div className="agree-box sel-agree" key={name}>
                                <input type="checkbox" id={name} name={name} value="Y" 
                                    onChange={(el)=>{onCheckedElement(el.target.checked, e.code);}} 
                                    checked={agree.includes(e.code)?true:false}/>
                                <label htmlFor={name}>
                                    <span className={req?"":"color"}>({req?"필수":"선택"})</span>
                                    <span className="left5">{e.title} 동의</span>
                                </label>
                                {req === 1 && (
                                    <button type="button" className="service" onClick={()=>{serviceActivate(e.code)}}>약관보기</button>
                                )}
                            </div>
                            )
                        }
                    )}
                </div>
            </form>
        </div>
        
        </div>
        <FooterButton label="확인" disabled={!submit} onClick={memberJoin} />
        <div className="modal-bg" ref={ref2} onClick={()=>{ref2.current.style.display = "none";ref.current.style.display = "none"}}>
            <div className="daum-post-modal" ref={ref} />
        </div>
        <div className={`modal-layerpop ${isVisable ? "on" : "off"}`}>
            <HeaderColorModal title="상담사 분류" onClick={()=>{setIsVisable(false)}} /> 
            <div className="modal-app-box">
                <div className="mento-select-box">
                    {eduList.map((e,i)=>{
                        let name = `edu${i}`;
                        return (
                            <React.Fragment key={name}>
                                <input type="radio" name="edu" id={name} value={e.value} onChange={onChange} checked={state.edu === e.value} />
                                <label htmlFor={name}>{e.label}</label>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="mento-select-box">
                    {kindList.map((e,i)=>{
                        let name = `kind${i}`;
                        return (
                            <React.Fragment key={name}>
                                <input type="radio" name="kind" id={name} value={e.value} onChange={onChange} checked={state.kind === e.value} />
                                <label htmlFor={name}>{e.label}</label>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
        {
        requiredServe && requiredServe.map((e,i)=>{
            let id = `service${i}`;
            let serve = service.filter(x => x.code === e );
            // console.log(serve);
            return (
            <div className={`modal-layerpop ${isVisable2.includes(e) === true ? "on" : "off"}`} key={id}>
                <HeaderColorModal title={serve[0].title} onClick={()=>{serviceUnactivate(e)}} />
                <div className="modal-app-box service">
                    {parse(serve[0].content)}
                </div>
            </div>
            )
        })
        }
    </>
    );
};

export default Join;