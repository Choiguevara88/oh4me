import React, {useState, useEffect,useCallback} from 'react';
import { useInput, validPassword, nickFormat } from '../Utils';
import { Input, ButtonRound } from '../Components';
import { Link, useNavigate } from 'react-router-dom';
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import logo from '../Resources/Images/LogoBlackPortrait.png';
import leftarrow from '../Resources/Images/LeftArrow.png';
import '../Css/Login.scss';

const Login = () => {
    const [state, onChange] = useInput({ nick:'', passwd:'' });
    const {nick, passwd} = state;
    const [disabled, setDisabled] = useState(false);
    const member = useMemberState();
    const memberDispatch = useMemberDispatch();
    const history = useNavigate();
    const session   = window.sessionStorage.getItem('midx');
    const setPage = useCallback(i => {memberDispatch({ type:"BBSPAGE", info: i });})
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);
    
    useEffect( () => {
        if(nickFormat(nick) && validPassword(passwd))  setDisabled(true);
        else                                           setDisabled(false);
    },[nick, passwd]);
    
    const onSubmit = async() =>{   
        const nick = state.nick;
        await Api.send('member_login', { 'nick':nick, 'passwd':passwd }, (args)=>{  
            if(args.result) { 
                memberDispatch({ type:"LOGIN", info: args.data }); 
                window.sessionStorage.setItem("midx", JSON.stringify(args.data.idx));
            } 
            else            { alert(args.message); }
        });
    }
    useEffect(()=>{
        Api.send('community_category', {}, (args)=> {
            if(args.result) { 
                memberDispatch({ type:"CATLIST", info: args.data }); 
                memberDispatch({ type:"SELCAT", info: args.data[0] }); 
             } else {
                alert(args.message); 
            }
        });
        if(session != null) {
            Api.send("member_info", { 'midx':JSON.parse(session) },(args)=>{
                if(args.result) {        
                    memberDispatch({ type:"LOGIN", info: args.data }); 
                    setPage(1);
                } else {
                    memberDispatch({ type:"LOGOUT" }); 
                }
            });
        } else {
            memberDispatch({ type:"LOGOUT" }); 
        }
    },[]);

    useEffect(()=>{
        if(member.loggedin === true) { history("/home", true); }
    },[member]);


    return (
        <div className="app-box login ">
            <div className="app-cont col space-b pd2">
                <div className="head">
                    <h1 className="login-logo"><img src={ logo } alt="logo" /></h1>
                    <div className="login-input">
                    <form autoComplete='off'>
                        <Input label="닉네임" name="nick" value={nick} onChange={onChange} intype={"text"}/>
                        <Input label="비밀번호" name="passwd" value={passwd} onChange={onChange} intype={"password"} />
                    </form>
                    </div>
                    <div className="login-find top15">
                        <Link to="/findUser">닉네임 찾기 / 비밀번호 찾기</Link>
                        <img src={leftarrow} alt="left-arrow" />
                    </div>
                    <div className="login-button top40">
                        <ButtonRound label="로그인" disabled={!disabled} onClick={()=>{onSubmit();}} />
                    </div>
                </div>
                <div className="footer">
                    <p>아직 회원이 아니신가요?</p>
                    <p className="top15">
                        <Link to="join">회원가입</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;