import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, LineChart, AuroraCard3, } from '../Components';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import '../Css/AuroraProfile.scss';

const AuroraProfile = () => {
    const history   = useNavigate();
    const params    = useLocation();
    const member    = useMemberState();
    const cardList9 = member.card9;
    const memberDispatch  = useMemberDispatch();
    const [chartdata,setChartData] = useState(member?.info?.life_graph ? [...member?.info?.life_graph] : [0,0,0,0,0,0,0,0,0]);
    const [show, setShow] = useState({});
    const [dna1, setDna1] = useState({});
    const [dna2, setDna2] = useState({});
    const [destiny, setDestiny] = useState([]);
    const [sex, setSex] = useState("");
    const [birthday, setBirthday] = useState("");
    const [age, setAge] = useState("");
    const [fortune, setFortune] = useState({});
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':true} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);

    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
        else {
            
        }
        window.scrollTo(0, 0);
    },[params]);

    useEffect(()=>{
        let card = cardList9.filter(e => e.prior === member.info.dna_number[0]+"");
        setDna1({...card[0]});
        setShow({...card[0]});
        card = cardList9.filter(e => e.prior === member.info.dna_number[1]+"");
        setDna2({...card[0]});
        setDestiny([...member.info.aurora_number]);
        setChartData([...member.info.life_graph]);
        setSex([member.info.sex === "M" ? "남성" : "여성"]);
        setBirthday(member.info.birthday);
        setAge(member.info.age);
        setFortune(member.info.aurora_fortune);
    },[]);

    return (
        <>
        <HeaderColor title="오로라 구궁법 프로파일" onClick={()=>{history(-1)}} /> 
            <div className="home-box2">
                <div className="profile-box">
                    <h1 className="profile-label">기본 정보</h1>
                    <div className="profile-info">
                        <p>성별 : {sex}</p>
                        <p>생년월일 : {birthday} (만 {age}세)</p>
                        <p>변하지 않는 고유 수 : {show.prior}. {show.energy_str2} ({show.title})</p>
                    </div>
                </div>
            </div>
            <div className="home-box2">
                <div className="profile-box">            
                    <div className="card-box-2">
                    <h1 className="profile-label">보이는 수 & 보이지 않는 수</h1>                        
                        <div className="card-wrapper">    
                        { dna1 &&
                            <div className="card-container">
                                <AuroraCard3 card={dna1} nobutton />
                                <p className="txt-ct top14 aurora-card-info">{dna1?.prior}. {dna1.energy_str} / {dna1.title} / {dna1.plsmns==="0"?"-":"+"}{dna1.five}</p>
                            </div>
                        }
                        { dna2 &&
                            <div className="card-container">
                                <AuroraCard3 card={dna2} nobutton />
                                <p className="txt-ct top14 aurora-card-info">{dna2.prior}. {dna2.energy_str} / {dna2.title} / {dna2.plsmns==="0"?"-":"+"}{dna2.five}</p>
                            </div>
                        }
                        </div>                        
                    </div>
                    <h1 className="profile-label">직업 & 직장</h1>
                    <div className="profile-info">
                        <p>{show.job}</p>
                    </div>
                </div>
            </div>
            <div className="home-box2">
                <div className="profile-box">                        
                    <div className="card-box-3">
                        <h1 className="profile-label">올해의 운명넘버</h1>
                        <div className="card-wrapper">
                        {destiny && destiny.map((e,i)=>{
                            let name=`card-destiny-${i}`;
                            let card = cardList9.filter( a => a.prior === e + "" );
                            return (
                            <div className="card-container" key={name}>
                                <AuroraCard3 card={card[0]} nobutton />
                                <p className="txt-ct top10 aurora-card-info">
                                    {card[0].prior}. {card[0].title}<br/>
                                    <small>{card[0].keyword}</small>
                                </p>
                            </div>)
                        })}                            
                        </div>

                    </div>
                    <h1 className="profile-label">{fortune.score}. {fortune.title}</h1>
                    <div className="profile-info">
                        <p>{fortune.title}, {fortune.subtitle}, {fortune.luck}</p>
                        <p>{fortune.content}</p>
                    </div>
                </div>
            </div>
            <div className="home-box2">
                <div className="profile-box">                        
                    <h1 className="profile-label">인생 주기율표</h1>
                    <LineChart data={chartdata} />
                </div>
            </div>
        </>
    );
};

export default AuroraProfile;