import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { HeaderColor } from "../Components";
import wokgimg from "../Resources/Images/WorkBuild.png";

export default function ErrorPage() {
  const error = useRouteError();
  const history = useNavigate();
  const rnMessage = () => {
    if(window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify( {'backHandler':false} ));
    }
}
useEffect(()=>{ rnMessage(); },[]);
  return (
    <>
      <HeaderColor title="미작업 페이지" onClick={()=>{history(-1)}} />
      <div className="error-page">
        <img src={wokgimg} alt="공사중" />
        <p>아직 작업 중인 페이지 입니다.</p>
      </div>
    </>
  );
}