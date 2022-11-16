import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, BBSList, WriteButton, ButtonRoundLong } from '../Components';
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Mentoring.scss';

const Mentoring = () => {
    const history        = useNavigate();
    const params         = useLocation();
    const member         = useMemberState();
    const memberDispatch = useMemberDispatch();

    const bbs = member.mentoringList;
    const setBbs = useCallback(i => {memberDispatch({ type:"MENTORING", info: i });});

    const page = member.mentoringPage;
    const setPage = useCallback(i => {memberDispatch({ type:"MENTORINGPAGE", info: i });})

    const bbsLimit = member.mentoringPageLimit;
    const setBbsLimit = useCallback(i => {memberDispatch({ type:"MENTORINGPAGELIMIT", info: i });})
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    const getBbsList = async(page=1) => {
        
        await Api.send('mentoring_list', { page:page, midx:member.info?.idx },(args)=>{
            if(args.result === true) {
                setPage(page + 1);
                if(page === 1) setBbs(args.data);
                else           setBbs([...bbs, ...args.data]);

                if(args.data.length === 5)   setBbsLimit(true);
                else                         setBbsLimit(false);
            } else {
                setBbsLimit(false);
                if(args.message != "limit_over") setBbs([]);
            }
        });
    }    
    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
        if(page === 1) {
            getBbsList();
            window.scrollTo(0, 0);
        }
    },[])

    return (
        <>
        <HeaderColor title="멘토링" onClick={()=>{history(-1)}} /> 
        <div className="mentoring-box">
            <div className="bbs-box">
            {bbs && bbs.map((e,i)=>{
                return <BBSList data={e} key={`bbs_${i}`} onClick={()=>{history('/view', {state:{code:'mentoring', idx:e.idx}})}} />
            })}
            {bbsLimit ?
            <ButtonRoundLong label="더보기" styleName="gray" onClick={()=>{getBbsList(page)}} />
            : <div className={bbs?.length < 1 ? "empty-bbs" : "last-bbs"}>{bbs?.length < 1 ? "등록된 게시글이 없습니다." : "마지막 게시글입니다."}</div> 
            }
            </div>
            {
                member.info?.ismento === "0" &&  
                <WriteButton onClick={ ()=>{ history('/write', {state:{code:'mentoring'}}) } } />
            }
            
        </div>
        </>
    );
};

export default Mentoring;