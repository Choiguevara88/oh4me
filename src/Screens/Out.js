import React, { useEffect, useState, useRef } from 'react';
import {HeaderColor, Input, InputNoLabel, FooterButton} from '../Components';
import { useInput, validPassword } from '../Utils';
import { useNavigate } from 'react-router-dom';
import ReactDaumPost from 'react-daumpost-hook';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Update.scss';

const Out = () => {
    const history   = useNavigate();
    const member    = useMemberState();
    const memberDispatch  = useMemberDispatch();
    const [passMsg, setPassMsg] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [state, onChange] = useInput({ outmemo:'', passwd:'', passwd2:''});
    useEffect(()=>{
        if(state.passwd!==""&&!validPassword(state.passwd)) {setPassMsg("비밀번호는 영문,숫자 조합 6자리 이상이어야합니다.");setValidPass(false)}
        else                                               {setPassMsg("");setValidPass(false)}
        if(state.passwd2!==""&&state.passwd!==state.passwd2) {setPassMsg("비밀번호가 일치하지 않습니다.");setValidPass(false)}
        if(state.passwd2!==""&&state.passwd===state.passwd2) {setPassMsg("비밀번호가 일치합니다.");setValidPass(true)}
    },[state.passwd, state.passwd2]);
    useEffect(()=>{
        if(member.loggedin !== true)    history("/", true);
    },[]);
    const memberOut = async () => {
        let data = {...state, nick:member.info.nick};
        await Api.send('member_out', data, (args)=>{  
            alert(args.message);
            if(args.result) {
                memberDispatch({ type:"LOGOUT" });
                window.sessionStorage.removeItem("midx");
                window.location.replace("/")
            }
        });
    }
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);
    return (
        <>
        <HeaderColor title="회원탈퇴" onClick={()=>{history(-1)}} /> 
        <div className="app-box update out">
            <div className="app-cont">
                <h1 className="box-label">회원탈퇴안내</h1>
                <p className="out-info">회원탈퇴를 신청하시면 바로 로그아웃 됩니다.</p>
                <p className="out-info">탈퇴한 닉네임으로는 재가입이 불가능합니다.</p>
                <p className="out-info bottom30">회원탈퇴 이후에는 게시물 편집/삭제가 불가능하므로, 편집하거나 삭제하기 바라시는 경우 게시물 편집/삭제 후 회원탈퇴를 해주시기 바랍니다.</p>

                <h1 className="box-label">회원탈퇴 사유</h1>
                <textarea name="outmemo" value={state.outmemo} onChange={onChange} placeholder="탈퇴 사유를 남겨주세요. 남겨주신 의견을 바탕으로 오포미가 더 나아집니다." className="out-memo bottom30" />
                <Input label="비밀번호" name="passwd" value={state.passwd} onChange={onChange} intype="password"  className="password"/>
                <InputNoLabel label="비밀번호 확인" name="passwd2" value={state.passwd2} onChange={onChange} intype="password" placeholder="새 비밀번호 재입력"  subinfo={passMsg} isvalid={passMsg!==""} iscomplete={validPass}/>
            </div>
        </div>
        <FooterButton label="회원탈퇴" disabled={!validPass} onClick={memberOut} />
        </>
    );
};

export default Out;