import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, CommentList, ButtonRoundSmall } from '../Components';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/AuroraView.scss';
import parse from 'html-react-parser';


const AuroraView = () => {
    const history   = useNavigate();
    const params    = useLocation();
    const idx       = params?.state.idx;
    const member    = useMemberState();
    const memberDispatch  = useMemberDispatch();
    const [bbs, setBbs] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        if(isNaN(idx)) history(-1);
        window.scrollTo(0, 0);
    },[params]);
    useEffect(()=>{ getBbsView(); },[]);

    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
    },[])
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    const getBbsView = async() => {
        let data = {idx:idx, midx:member.info.idx};
        await Api.send('aurora_view', data, (args)=>{ 
            if(args.result) {
                setLoading(true);
                setBbs(args.data);
                let _bbs = {...args.data};
                memberDispatch({ type:"REFRESHBBS", info:_bbs });
            } else {
                alert(args.message);
                history(-1);
            }
        });
    }

    return (
        <>
        {loading ? 
        <>
        <HeaderColor title="게시글 보기" onClick={()=>{history(-1)}} color={bbs.aidx} /> 
        <div className="aurora-view-box">
            <div className="aurora-bbs-view col">
                <div className="aurora-bbs-head">
                    <h1 className="subject">{bbs?.subject}</h1>
                    {bbs?.photo && 
                    <img src={bbs?.photo} alt="aurora-view-thumb" className="thumb" />
                    }
                </div>
                <div className="bbs-body-html">
                    {parse(bbs?.content)}
                </div>
            </div>
        </div>
        </>
        : <></> 
        }
        </>
    );
};

export default AuroraView;