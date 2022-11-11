import React, { useEffect, useState } from 'react';
import { useInput } from '../Utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, BBSInput, BBSTextarea, FooterButton } from '../Components';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Write.scss';

const Write = () => {
    const history   = useNavigate();
    const params    = useLocation();
    const code      = params?.state.code;
    const category  = params?.state.category;
    const member    = useMemberState();
    const memberDispatch  = useMemberDispatch();
    const [state, onChange] = useInput({ subject:'', content:''});
    const [submit, setSubmit] = useState(false);

    useEffect(()=>{
        if(state.subject.length > 4 && state.content.length > 20)   setSubmit(true);
        else                                                        setSubmit(false);
    },[state]);
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    const onSubmit = async () => {
        let data = {...state, code:code, category:category, midx:member.info.idx};
        await Api.send('bbs_insert', data, (args)=>{  
            if(args.result) {
                if(args.data.code === "community") {
                    let tmpArr = [...member.communityList];
                    tmpArr.unshift(args.data);
                    memberDispatch({ type:"COMMUNITY", info:tmpArr });
                } else if(args.data.code === "mentoring") {
                    let tmpArr = [...member.mentoringList];
                    tmpArr.unshift(args.data);
                    memberDispatch({ type:"MENTORING", info:tmpArr });
                }
                history(-1);
            } else {
                alert(args.message);
            }
        });
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[params]);
    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
    },[])

    return (
        <>
            <HeaderColor title="게시글 작성" onClick={()=>{history(-1)}} /> 
            <div className="app-box write-box">
                <div className="write col">
                    <BBSInput name="subject" label="게시글 제목" value={state.subject} onChange={onChange} />
                    <BBSTextarea name="content" label="게시글 내용" value={state.content} onChange={onChange} cnt={state.content.length} />
                </div>
            </div>
            <FooterButton label="등록" disabled={!submit} onClick={()=>{onSubmit();}} />
        </>
    );
};

export default Write;