import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderColor, LineChart, AuroraCard3 } from '../Components';
import { useMemberState,useMemberDispatch } from '../Contexts/MemberContext';
import '../Css/Dna.scss';


const Dna = () => {
    const history   = useNavigate();
    const params    = useLocation();
    const member    = useMemberState();
    const cardList9 = member.card9;
    const [chartdata,setChartData] = useState(member?.info?.life_graph ? [...member?.info?.life_graph] : [0,0,0,0,0,0,0,0,0]);
    const [dna, setDna] = useState([]);
    const dna_info = `인간은 DNA로 유전 정보가 구성되고 있어서 genome은 DNA로 구성된 유전 정보를 말한다.
    genome은 1920년에 독일 함부르크 대학의 식물학자 빙클러(H. Winkler)가 유전자(gene)와 염색체(chromosome)를 합쳐 만들었다. 이 개념은 배우자(gamete) 즉 동물의 경우 정자, 난자 염색체 전체를 의미한다. 이후 1930년에 기하라 히토스(木原均)가 기능적 의미를 추가하여, 생물이 존재하기 위한 온전한 유전 정보로 genome을 재 정의했다. genome을 중점 연구하는 학문이 유전체학(genomics)인데 그 목적은 한 생명체 전체에 걸친 유전자 파악이며, 그 연구를 genome project라 한다.`;
    useEffect(()=>{
        if(member.loggedin !== true) { history("/", true); }
        else {
            setDna([...member.info.dna_number]);
            setChartData([...member.info.life_graph]);
        }
        window.scrollTo(0, 0);
        // console.log(member.info);
    },[])
    const rnMessage = () => {
        if(window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
        }
    }
    useEffect(()=>{ rnMessage(); },[]);
    
    return (
        <>
        <HeaderColor title="DNA 컬러" onClick={()=>{history(-1)}} /> 
        <div className="dna-box">
            <div className="card-box-2  bottom80">
                <h1 className="box-label">DNA 컬러</h1>
                <div className="j-center card-wrapper">
                    {
                        dna && dna.map((e,i)=>{
                            
                            let name =`dna-card-${i}`;
                            let card = cardList9.filter(c => c.prior === e+"");
                            return (
                                <div className="card-container" key={name}>
                                    <AuroraCard3 card={card[0]} nobutton />
                                    <p className="txt-ct top20 aurora-card-info">{e}. {card[0].energy_str} / {card[0].title} &#40;{card[0].plsmns==="0"?"-":"+"}{card[0].five}&#41;</p>
                                </div>
                            )
                        })
                    }
                    <div className="dna-info">
                        <h1>DNA</h1>
                    {
                        dna_info.split('\n').map((t,i)=>{
                            return (<React.Fragment key={`dna_info_${i}`}>{t}<br/></React.Fragment>)
                        })
                    }
                    </div>
                </div>
                <h1 className="box-label top30 bottom0">인생 주기율표</h1>
                <LineChart data={chartdata} />
            </div>
        </div>
        </>
    );
};

export default Dna;