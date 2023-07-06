import React, { useCallback, useEffect, useState } from 'react';
import { FooterMenu, HeaderMain,AuroraCard9,AuroraCard8, ButtonRoundLong, AuroraCard3, CategoryButton, BBSList, WriteButton,AuroraList } from '../Components';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css'
import { useMemberState, useMemberDispatch } from '../Contexts/MemberContext';
import Api from '../Api';
import '../Css/Home.scss';
import logo from '../Resources/Images/LogoBlackPortrait.png';

const Home = () => {
    // const menuList = [{label:'오로라 테라피',value:0}, {label:'심리테스트',value:1}, {label:'오로라 다이어리',value:2}, {label:'커뮤니티',value:3}];
    const menuList = [{label:'오로라 테라피',value:0}, {label:'심리테스트',value:1}, {label:'커뮤니티',value:2}];
    const member = useMemberState();
    const memberDispatch = useMemberDispatch();
    const history = useNavigate();
    
    const menu = member.selMenu;
    const selMenu = useCallback(i => { memberDispatch({ type:"SELMENU", info: i.target.value }); });
    const selCat = member.selCat;
    const setSelCat = useCallback(i => {memberDispatch({ type:"SELCAT", info: i });});
    const catList = member.catList;

    // const [cardList9, setCardList9] = useState([]);
    const cardList9 = member.card9;
    const setCardList9 = useCallback(i => { memberDispatch({ type:"CARD9", info: i }); });

    // const [cardList8, setCardList8] = useState([]);
    const cardList8 = member.card8;
    const setCardList8 = useCallback(i => { memberDispatch({ type:"CARD8", info: i }); });

    const [cardLoading, setCardLoading] = useState(false);
    const [bbsLoading, setBbsLoading] = useState(false);
    
    // const [selCard3, setSelCard3] = useState([]);
    const selCard3 = member.selCard3;
    const setSelCard3 = useCallback(i => {memberDispatch({ type:"SELCARD3", info: i });})
    const [yearCard3, setYearCard3] = useState([]);
    
    // const [bbs, setBbs] = useState([]);
    const bbs = member.communityList;
    const setBbs = useCallback(i => {memberDispatch({ type:"COMMUNITY", info: i });})
    // useEffect(()=>{ console.log(bbs); },[bbs])

    const bbs2 = member.bbsList;
    const setBbs2 = useCallback(i => {memberDispatch({ type:"BBS", info: i });})
    
    
    // const [pageLoading, setPageLoading] = useState(false);
    // const [page, setPage] = useState(1);
    const page = member.communityPage;
    const setPage = useCallback(i => {memberDispatch({ type:"COMMUNITYPAGE", info: i });})

    const page3 = member.bbsPage;
    const setPage3 = useCallback(i => {memberDispatch({ type:"BBSPAGE", info: i });})

    // const [bbsLimit, setBbsLimit] = useState(false);
    const bbsLimit = member.communityPageLimit;
    const setBbsLimit = useCallback(i => {memberDispatch({ type:"COMMUNITYPAGELIMIT", info: i });})

    const bbsLimit2 = member.bbsPageLimit;
    const setBbsLimit2 = useCallback(i => {memberDispatch({ type:"BBSPAGELIMIT", info: i });})
    
    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
        // console.log(member.info);
        getCardList();
        if(page3 === 1) getBbsList2();
    },[]);

    useEffect(()=>{ 
        if(page === 1)  getBbsList();
    },[selCat]);
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);
    
    

    const setPage2 = useCallback(i => {memberDispatch({ type:"MENTORINGPAGE", info: i });})

    const goMentoring = async() => {
        await setPage2(1);
        await history('/mentoring');
    }
        
    const getCardList = async()=> {
        await Api.send('aurora_card', {}, (args)=>{  
            if(args.result) {
                // console.log(args.data);
                setCardLoading(true);
                let tmpArr = [...args.data];
                let tmpArr2 = [];
                tmpArr2.push(tmpArr[1]);
                tmpArr2.push(tmpArr[6]);
                tmpArr2.push(tmpArr[8]);
                tmpArr2.push(tmpArr[0]);
                tmpArr2.push(tmpArr[2]);
                tmpArr2.push(tmpArr[4]);
                tmpArr2.push(tmpArr[5]);
                tmpArr2.push(tmpArr[7]);
                tmpArr2.push(tmpArr[3]);
                setCardList9(tmpArr2);
                args.data.pop();
                setCardList8(args.data);
            } else {
                setCardLoading(true);
            }
        });
    }
    const getBbsList = async(page=1) => {
        await Api.send('community_list', { page:page, scategory:selCat, midx:member.info?.idx },(args)=>{
            // console.log(bbs);
            // console.log(args);
            if(args.result === true) {
                setPage(page + 1);
                if(page === 1) setBbs(args.data);
                else           setBbs([...bbs, ...args.data]);

                if(args.data.length === 5)  setBbsLimit(true);
                else                        setBbsLimit(false);
            } else {
                setBbsLimit(false);
                if(args.message != "limit_over") setBbs([]);
            }
        });
    }

    const getBbsList2 = async(page=1) => {
        await Api.send('aurora_list', { page:page, midx:member.info?.idx },(args)=>{
            console.log(args);
            setBbsLoading(true);
            if(args.result === true) {
                setPage3(page + 1);
                if(page === 1) setBbs2(args.data);
                else           setBbs2([...bbs2, ...args.data]);

                if(args.data.length === 8)  setBbsLimit2(true);
                else                        setBbsLimit2(false);
            } else {
                setBbsLimit2(false);
                if(args.message != "limit_over") setBbs2([]);
            }
        });
    }    
    const selMindCard = (i) => {
        
        let tmp = [...cardList8];
        let chk = selCard3.findIndex(x => x.title === tmp[i].title );
        if(chk <= -1) {
            if(selCard3.length < 3) setSelCard3([...selCard3, tmp[i]]);
        } else {
            let copy = [...selCard3];
            copy.splice(chk, 1);
            setSelCard3(copy);
        }
    }
    const delMindCard = (i) => {
        let tmp = [...selCard3];
        tmp.splice(i, 1);
        setSelCard3(tmp);
    }

    const setBbsList = async(i) => {
        await setPage(1);
        await setSelCat(i);
    }

    return (
        <>
          <HeaderMain list={menuList} select={menu} onClick={selMenu} />
            {menu === 0 ? 
                    <div className="home-box2">
                        <div className="bbs-box pd12">
                            <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid-column">
                            {bbs2 && bbs2.map((e,i)=>{
                                let name=`aurora-bbs-${i}`;
                                let rand = Math.random()*100 + Math.random()*100;
                                let rand2 = Math.random()*10;
                                let rand3 = rand + rand2;
                                return <AuroraList data={e} key={name} onClick={()=>{history('/aurora-view',{state:{idx:e.idx}})}} />
                                // return <div key={name} style={{height:rand3, backgroundColor:"red", marginBottom:30}}>
                                //             <p>{e.title}</p>
                                //             <p>{e.prior}</p>
                                //             <p>{e.keyword}</p>
                                //         </div>
                            })}
                            </Masonry>
                            {bbsLimit2 ?
                            <ButtonRoundLong label="더보기" styleName="gray" onClick={()=>{getBbsList2(page3)}} />
                            : <div className={bbs2?.length < 1 ? "empty-bbs" : "last-bbs top30"}>{bbs2?.length < 1 ? "등록된 게시글이 없습니다." : "마지막 게시글입니다."}</div> 
                            }
                        </div>
                    </div>
            : menu === 1 ? 
            cardLoading ?
            <>
            <div className="home-box2">
                <div className="card-box-8">
                    <h1 className="box-label">오늘의 심리</h1>
                    <div className="card-wrapper bottom20">
                    {cardList8 && cardList8.map((e,i)=>{
                        let name=`card-home-${i}`;
                        let selected = selCard3.findIndex((a)=>{return a.idx === e.idx});
                        return <AuroraCard8 card={e} key={name} selected={selected} onClick={()=>{selMindCard(i)}} />
                    })}
                    </div>
                    <ButtonRoundLong label={selCard3.length === 3 ? "3장의 카드를 선택하셨습니다.": "3장의 카드를 선택해 주세요."} styleName={selCard3.length === 3 ? "" : "gray"} nobutton={true} onClick={()=>{}} />
                </div>
            </div>
            {selCard3.length > 0 && 
            <>
            <div className="home-box2">
                <div className="card-box-3">
                    <div className="card-wrapper">
                    {selCard3 && selCard3.map((e,i)=>{
                        let name=`card-mind-${i}`;
                        return <AuroraCard3 pointer card={e} key={name} button onClick={()=>{delMindCard(i)}} />
                    })}
                    </div>
                </div>
            </div>
            <div className="home-box2">
                {selCard3 && selCard3.map((e,i)=>{
                    let name=`info-mind-${i}`;
                    let labelStr = "";
                    let infoTxt = eval(`e.info${i+1}`);
                    switch(i) {
                        case 0 : labelStr = "첫 번째 카드"; break;
                        case 1 : labelStr = "두 번째 카드"; break;
                        case 2 : labelStr = "세 번째 카드"; break;
                    }
                    return (
                        <div key={name} className="mind-cont">
                            <h1 className="mind-label">{labelStr}</h1>
                            <p className="mind-info">{infoTxt}</p>
                        </div>
                    )
                })}
            </div>
            </>
            }
            <div className="home-box2">
                <div className="card-box-9">
                    <h1 className="box-label">오로라 구궁법</h1>
                    <div className="card-wrapper bottom20">
                    {cardList9 && cardList9.map((e,i)=>{
                        let name=`card-home-${i}`;
                        return <AuroraCard9 card={e} key={name} />
                    })}
                    </div>
                    <ButtonRoundLong label="올해의 카드" styleName="" onClick={()=>{history('/aurora-profile')}} />
                </div>
            </div>
            </>
            :   
            <div>empty</div>
            : menu === 2 ? 
            cardLoading ?
            <>
            {/* <div className="home-box">
                <div className="card-box-9">
                    <div className="card-wrapper bottom20">
                    {cardList9 && cardList9.map((e,i)=>{
                        let name=`card-nine-${i}`;
                        return <AuroraCard9 card={e} key={name} />
                    })}
                    </div>
                    <ButtonRoundLong label="DNA 컬러 보러가기" styleName="" onClick={()=>{history('/dna')}} />
                </div>    
            </div> */}
            <div className="home-box2">
                    <div className="bbs-box">
                        <div className="cat-box">
                            {catList && catList.map((e,i)=>{
                                return <CategoryButton key={`bbscat_${i}`} onClick={()=>{setBbsList(e)}} label={e} on={selCat === e} />
                            })}
                        </div>
                        {bbs && bbs.map((e,i)=>{
                            return <BBSList data={e} key={`bbs_${selCat}_${i}`} onClick={()=>{history('/view', {state:{code:'community', idx:e.idx}})}} />
                        })}
                        {bbsLimit ?
                        <ButtonRoundLong label="더보기" styleName="gray" onClick={()=>{getBbsList(page)}} />
                        : <div className={bbs?.length < 1 ? "empty-bbs" : "last-bbs"}>{bbs?.length < 1 ? "등록된 게시글이 없습니다." : "마지막 게시글입니다."}</div> 
                        }
                    <WriteButton onClick={ ()=>{ history('/write', {state:{code:'community',category:selCat}}) } } />
                    </div>
                    
                </div>
                <div className="home-box2">
                    <div className="bbs-box">
                        <ButtonRoundLong label="멘토링" styleName="lime" onClick={()=>{goMentoring()}} />
                        <p className="mentoring-info">
                            멘토링은 익명의 소통공간에서<br/>
                            마음속이야기를 자유롭게 표현하면서<br/>
                            서로의 고민을 나누고 힘이 되는 공간입니다.<br/>
                            <br/>
                            상담사/멘토가 피드백을 제공해 드립니다.<br/>
                            비공개로 안심하고 상담 하시면 됩니다.
                        </p>
                    </div>
                </div>
            </>
            :   
            <div>empty</div>
            : // menu === 3  
            <>
                <div className="home-box2">
                    <div className="bbs-box">
                        <div className="cat-box">
                            {catList && catList.map((e,i)=>{
                                return <CategoryButton key={`bbscat_${i}`} onClick={()=>{setBbsList(e)}} label={e} on={selCat === e} />
                            })}
                        </div>
                        {bbs && bbs.map((e,i)=>{
                            return <BBSList data={e} key={`bbs_${selCat}_${i}`} onClick={()=>{history('/view', {state:{code:'community', idx:e.idx}})}} />
                        })}
                        {bbsLimit ?
                        <ButtonRoundLong label="더보기" styleName="gray" onClick={()=>{getBbsList(page)}} />
                        : <div className={bbs?.length < 1 ? "empty-bbs" : "last-bbs"}>{bbs?.length < 1 ? "등록된 게시글이 없습니다." : "마지막 게시글입니다."}</div> 
                        }
                    <WriteButton onClick={ ()=>{ history('/write', {state:{code:'community',category:selCat}}) } } />
                    </div>
                    
                </div>
                <div className="home-box2">
                    <div className="bbs-box">
                        <ButtonRoundLong label="멘토링" styleName="lime" onClick={()=>{goMentoring()}} />
                        <p className="mentoring-info">
                            멘토링은 익명의 소통공간에서<br/>
                            마음속이야기를 자유롭게 표현하면서<br/>
                            서로의 고민을 나누고 힘이 되는 공간입니다.<br/>
                            <br/>
                            상담사/멘토가 피드백을 제공해 드립니다.<br/>
                            비공개로 안심하고 상담 하시면 됩니다.
                        </p>
                    </div>
                </div>
                
            </>
            }
            
          <FooterMenu select="home"/>
        </>
    );
};

export default Home;