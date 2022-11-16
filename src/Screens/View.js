import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, CommentList, ButtonRoundSmall } from '../Components';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/View.scss';
import bubble from '../Resources/Images/CommentBubble.png';


function FooterInput ({ intype='text', value, onChange, label, name, placeholder, button, buttonTxt, onClick, disabled, reply, replyCancel}, ref) {
    
    let holderstr = `${label}을 입력해 주세요.`;
    if(label === "상세주소" || label === "인증번호") holderstr = `${label}를 입력해 주세요.`;
    if(placeholder) holderstr = placeholder;

    return (
        <footer className="input">
            <div className="box">
            <input id={name} name={name} type={intype} value={value} onChange={onChange} placeholder={holderstr} ref={ref}/>
            { button && <button type="button" className={`valid-btn ${disabled===true?"off":"on"}`} onClick={onClick} disabled={disabled}>{buttonTxt}</button> }
            { (reply !== "" && reply !== undefined) && 
            <div className="recomment-box">
                <span><b>{reply}</b> 님에게 답글 남기는 중</span> 
                <button type="button" onClick={replyCancel}>취소하기</button>
            </div>
            }
            </div>
        </footer>
    );
};
FooterInput = forwardRef(FooterInput);

const View = () => {
    const history   = useNavigate();
    const params    = useLocation();
    const reportList= ['비방/혐오/욕설/차별적 표현을 포함','음란/청소년유해 정보포함','불법스팸홍보/영리성 정보포함','분쟁유도목적 정보포함','기타'];
    const code      = params?.state.code;
    const idx       = params?.state.idx;
    const member    = useMemberState();
    const memberDispatch  = useMemberDispatch();
    const [content, setContent] = useState('');
    const [submit, setSubmit] = useState(false);
    const [bbs, setBbs] = useState({});
    const [recomment, setRecomment] = useState({cidx:'',nick:''});
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState({ridx:'', rtype:''});
    const [del, setDel] = useState({didx:'', dtype:''});
    const [reportReason, setReportReason] = useState(reportList[0]);
    const [reportReason2, setReportReason2] = useState('');
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);
    useEffect(()=>{
        if(isNaN(idx)) history(-1);
        window.scrollTo(0, 0);
    },[params]);
    useEffect(()=>{ getBbsView(); },[]);
    useEffect(()=>{
        if(content.length > 1) setSubmit(true);
        else                   setSubmit(false);
    },[content]);
    
    const cmtRef= useRef(null);
    const ref   = useRef(null);
    const ref2  = useRef(null);
    const ref3  = useRef(null);
    const ref4  = useRef(null);
    const ref5  = useRef(null);

    useEffect(()=>{
        if(reportReason === "기타") {
            ref3.current.focus();
        } else {
            setReportReason2('');
        }
    },[reportReason]);
    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
    },[])

    const setReply = (cidx, nick) => {
        setRecomment({cidx:cidx, nick:nick});
        cmtRef.current.focus();
    }
    const getBbsView = async() => {
        let data = {code:code, idx:idx, midx:member.info.idx};
        await Api.send('bbs_view', data, (args)=>{ 
            if(args.result) {
                setLoading(true);
                setBbs(args.data);
                let _bbs = {...args.data};
                delete _bbs['comment'];
                if(_bbs.code === "community") memberDispatch({ type:"REFRESHCOMMUNITY", info:_bbs });
                else if(_bbs.code === "mentoring") memberDispatch({ type:"REFRESHMENTORING", info:_bbs });
            } else {
                alert(args.message);
                history(-1);
            }
        });
    }

    const openReport = async(idx, rtype) => {
        setReport({ridx:idx, rtype:rtype});
        ref.current.style.display   = 'block';
        ref2.current.style.display  = 'block';
    }

    const closeModal = () => {
        ref2.current.style.display = "none";
        ref.current.style.display = "none";
        setReportReason(reportList[0]);
        setReportReason2('');
        setReport({ridx:'', rtype:''});
    }
    const closeModal2 = () => {
        ref4.current.style.display = "none";
        ref5.current.style.display = "none";
        setDel({didx:'', dtype:''});
    }    

    const onSubmitReport = async() => {
        if(reportReason === "기타" && reportReason2 === "") { return false;}
        let data = {...report, code:code, midx:member.info.idx, reason:reportReason, reason2:reportReason2};
        await Api.send('bbs_report', data, (args)=>{
            if(args.result) {
                alert(args.message);
                closeModal();
                if(report.rtype === "BBS") {
                    if(code === "community") memberDispatch({ type:"DELETECOMMUNITY", info:bbs });
                    else if(code === "mentoring") memberDispatch({ type:"DELETEMENTORING", info:bbs });
                    history(-1);
                } else if(report.rtype === "CMT") {
                    let _bbs = {...args.data};
                    delete _bbs['comment'];
                    if(_bbs.code === "community") memberDispatch({ type:"REFRESHCOMMUNITY", info:_bbs });
                    else if(_bbs.code === "mentoring") memberDispatch({ type:"REFRESHMENTORING", info:_bbs });
                    setBbs(args.data);
                }
            } else {
                alert(args.message);
            }
        });
    }

    const openDelete = async(idx, rtype) => {
        setDel({didx:idx, dtype:rtype});
        ref4.current.style.display   = 'block';
        ref5.current.style.display  = 'block';
    }
    
    const onDeleteSubmit = async() => {
        let data = {code:code, midx:member.info.idx, ...del};

        await Api.send('bbs_delete', data, (args)=>{
            if(args.result) {
                alert(args.message);
                closeModal2();
                if(del.dtype === "BBS") {
                    if(code === "community") memberDispatch({ type:"DELETECOMMUNITY", info:bbs });
                    else if(code === "mentoring") memberDispatch({ type:"DELETEMENTORING", info:bbs });
                    history(-1);
                } else if(del.dtype === "CMT") {
                    let _bbs = {...args.data};
                    delete _bbs['comment'];
                    if(_bbs.code === "community") memberDispatch({ type:"REFRESHCOMMUNITY", info:_bbs });
                    else if(_bbs.code === "mentoring") memberDispatch({ type:"REFRESHMENTORING", info:_bbs });
                    setBbs(args.data);
                }
            } else {
                alert(args.message);
            }
        });
    }

    const onSubmitComment = async()=> {
        let data = {content:content, code:code, midx:member.info.idx, bidx:idx, ...recomment};
        await Api.send('bbs_comment', data, (args)=>{
            if(args.result) {
                let _bbs = {...args.data};
                delete _bbs['comment'];
                console.log(_bbs);
                if(_bbs.code === "community") memberDispatch({ type:"REFRESHCOMMUNITY", info:_bbs });
                else if(_bbs.code === "mentoring") memberDispatch({ type:"REFRESHMENTORING", info:_bbs });
                setBbs(args.data);
                setContent('');
                setRecomment({cidx:'',nick:''})
            } else {
                alert(args.message);
            }
        });
    }

    return (
        <>
        <HeaderColor title="게시글 보기" onClick={()=>{history(-1)}} /> 
        <div className="view-box view-box">
            <div className="bbs-view col">
            {loading ? 
            <>
            <div className="bbs-head">
                <div className="row space-b gap10 a-center bottom17">
                    <h1 className="subject">{bbs?.subject}</h1>
                    <h4 className="subject">조회 수 {bbs.cnt}</h4>
                </div>
                <div className="row space-b a-center">
                    <span>{bbs.wdate2}</span>
                    <span><img src={bubble} alt="comment-bubble" />{bbs.cmt}</span>
                </div>
            </div>
            <div className="bbs-body">
            {
                bbs?.content.split('\n').map((t,i)=>{
                    return (<React.Fragment key={`content_${i}`}>{t}<br/></React.Fragment>)
                })
             }
            </div>
            <p className="txt-rt top10">
                {
                bbs.editable === true 
                ? <button type="button" onClick={()=>{openDelete(idx,'BBS')}}>게시글 삭제</button>
                : <button type="button" onClick={()=>{openReport(idx,'BBS')}}>게시글 신고</button>
                }
                
            </p>
            </> 
            : <></>
            }
            </div>
            <div className="bbs-comment">
            {   bbs?.comment && 
                bbs?.comment.map((e,i) => {
                    let idx = e.idx;
                    let nick = e.nick;
                    let editable = e.editable;
                    return <CommentList key={`comment_${i}`} data={e} reply={()=>{setReply(idx, nick)}}
                    onClick={()=>{
                        if(editable) openDelete(idx, 'CMT');
                        else         openReport(idx, 'CMT');
                    }}
                    />
                })
            }
            </div>
        </div>
        <FooterInput name="content" value={content} label="댓글" placeholder="댓글을 입력해 주세요.(최소 2자 이상)" onChange={(e)=>{setContent(e.target.value)}} button buttonTxt="전송" onClick={()=>{onSubmitComment()}} disabled={!submit} ref={cmtRef} reply={recomment.nick} replyCancel={()=>{setRecomment({cidx:'',nick:''})}} />
        
        <div className="modal-bg" ref={ref2}>
            <div className="report-modal-bg" onClick={()=>{closeModal()}}></div>
            <div className="report-modal" ref={ref}>
                <h1>신고하기</h1>
                <p className="info">허위 또는 영리목적으로 신고할 경우 서비스 이용이 제한될 수 있습니다.</p>
                <div className="report-reason-box">
                {reportList.map((e,i)=>{
                    return (
                        <p key={`report-${i}`}>
                            <input id={`report-${i}`} type="radio" value={e} onChange={(e)=>{setReportReason(e.target.value)}} checked={reportReason === e} />
                            <label htmlFor={`report-${i}`}>{e}</label>
                        </p>
                    );
                })}
                {reportReason === "기타" && 
                    <textarea value={reportReason2} onChange={(e)=>{setReportReason2(e.target.value)}} placeholder="신고 사유를 직접 입력해주세요." ref={ref3}>{reportReason2}</textarea>
                }
                </div>
                <div className="btn-box-round row space-b a-center">
                    <ButtonRoundSmall label="닫기" onClick={()=>{closeModal()}} thin={true} />
                    <ButtonRoundSmall label="제출" color onClick={()=>{onSubmitReport()}} thin={true} />
                </div>
            </div>
        </div>

        <div className="modal-bg" ref={ref4}>
            <div className="report-modal-bg" onClick={()=>{closeModal2()}}></div>
            <div className="report-modal" ref={ref5}>
                <h1>삭제하기</h1>
                <p className="info">해당 {del.dtype === "BBS" ? "게시글" : "답글"}을 삭제하시겠습니까?</p>
                <div className="btn-box-round row space-b a-center top30">
                    <ButtonRoundSmall label="닫기" onClick={()=>{closeModal2()}} thin={true} />
                    <ButtonRoundSmall label="삭제" color onClick={()=>{onDeleteSubmit()}} thin={true} />
                </div>
            </div>
        </div>

        </>
    );
};

export default View;