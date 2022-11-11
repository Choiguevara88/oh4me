import React, { useEffect, useState, useRef } from 'react';
import {HeaderColor, Input, InputNoLabel, FooterButton} from '../Components';
import { useInput, validPassword } from '../Utils';
import { useNavigate } from 'react-router-dom';
import ReactDaumPost from 'react-daumpost-hook';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Update.scss';

const Update = () => {
    const history   = useNavigate();
    const member    = useMemberState();
    const memberDispatch  = useMemberDispatch();
    const [passMsg, setPassMsg] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [addr, setAddr] = useState({post:'', address1:'', address2:''});
    const [state, onChange] = useInput({ passwd:'', passwd2:''});
    const onChangeAddr = e => {
        let value = e.target.value;
        const copy = {...addr, [e.target.name] : value};
        setAddr(copy);
    }
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
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
        if(member.loggedin !== true)    history("/", true);
        setAddr({post:member.info.post, address1:member.info.address1, address2:member.info.address2});
    },[]);
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
    const memberUpdate = async () => {
        let data = {...state, ...addr, nick:member.info.nick};
        // console.log("submit ::::::: ",data);
        await Api.send('member_update', data, (args)=>{  
            // console.log(args.data);
            if(args.result) {
                memberDispatch({ type:"LOGIN", info: args.data });
                alert(args.message);
                history(-1);
            } else {
                alert(args.message);
            }
        });
    }

    return (
        <>
        <HeaderColor title="회원정보 수정" onClick={()=>{history(-1)}} /> 
        <div className="app-box update">
            <div className="app-cont">
            <form autoComplete='off'>
                <Input label="닉네임" name="nick" value={member.info.nick} intype="text" onChange={()=>{}} className="nick" disabled/>
                <Input label="비밀번호" name="passwd" value={state.passwd} onChange={onChange} intype="password"  className="password" placeholder="새 비밀번호 영문, 숫자 조합 6자리 이상"/>
                <InputNoLabel label="비밀번호 확인" name="passwd2" value={state.passwd2} onChange={onChange} intype="password" placeholder="새 비밀번호 재입력"  subinfo={passMsg} isvalid={passMsg!==""} iscomplete={validPass}/>
                <Input label="우편번호" name="post" value={addr.post}  intype="tel" button buttonTxt="검색" onClick={()=>{ref2.current.style.display = "block"; onClickPost();}} maxlength={5} readonly={true} placeholder="우편번호를 검색해 주세요." />
                <Input label="주소지" name="address1" value={addr.address1} onChange={onChange} intype="text" readonly={true} placeholder="우편번호를 검색하면 자동 입력됩니다." />
                <Input label="상세주소" name="address2" value={addr.address2} onChange={onChangeAddr} intype="text" />
            </form>
            </div>
        </div>
        <FooterButton label="수정" disabled={!(validPass && addr.post!=="" && addr.address1 !=="" &&addr.address2!=="")} onClick={memberUpdate} />
        <div className="modal-bg" ref={ref2} onClick={()=>{ref2.current.style.display = "none";ref.current.style.display = "none"}}>
            <div className="daum-post-modal" ref={ref} />
        </div>
        </>
    );
};

export default Update;