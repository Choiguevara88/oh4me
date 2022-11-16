import React, { useCallback, useEffect } from 'react';
import { FooterMenu, HeaderMainColor, PushList,ButtonRoundLong } from '../Components';
import { useNavigate } from 'react-router-dom';
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Push.scss';

const Push = () => {
    
    const member = useMemberState();
    const memberDispatch = useMemberDispatch();
    const history = useNavigate();

    const push = member.pushList;
    const setPush = useCallback(i => {memberDispatch({ type:"PUSH", info: i });});
    const page = member.pushPage;
    const setPage = useCallback(i => {memberDispatch({ type:"PUSHPAGE", info: i });})
    const pushLimit = member.pushPageLimit;
    const setPushLimit = useCallback(i => {memberDispatch({ type:"PUSHPAGELIMIT", info: i });})

    const getPushList = async(page=1) => {
        
        await Api.send('push_list', { page:page, midx:member.info?.idx },(args)=>{
            if(args.result === true) {
                setPage(page + 1);
                if(page === 1) setPush(args.data);
                else           setPush([...page, ...args.data]);

                if(args.data.length === 5)   setPushLimit(true);
                else                         setPushLimit(false);
            } else {
                setPushLimit(false);
                if(args.message != "limit_over") setPush([]);
            }
        });
    }

    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
        getPushList();
        window.scrollTo(0, 0);
    },[])
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);


    return (
        <>
        <HeaderMainColor title="알림" onClick={()=>{history(-1)}} /> 
        <div className="home-box3">
            <div className="push-box">
            {push && push.map((e,i)=>{
                console.log(e);
                let onClick = () => {
                    if(e.screen_idx != null && e.screen != null) {
                        history(`/${e.screen}`, {state:{idx:e.screen_idx, code:e.screen_code}});
                    } else {
                        return null
                    }
                };
                return <PushList data={e} key={`push_${i}`} onClick={()=>{onClick()}} />
            })}
            </div>
            {pushLimit ?
            <ButtonRoundLong label="더보기" styleName="gray" onClick={()=>{getPushList(page)}} />
            : <div className={push?.length < 1 ? "empty-bbs" : "last-bbs"}>{push?.length < 1 ? "푸시알림이 없습니다." : "마지막 푸시 알림입니다."}</div> 
            }
        </div>
        <FooterMenu select="ring"/>
        </>
    );
};

export default Push;