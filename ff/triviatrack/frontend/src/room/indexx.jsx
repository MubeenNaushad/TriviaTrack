import React,{useState,useCallback, useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import App from "@/App";
import axios from "axios";

const RoomPage=()=>{
    const{roomid}=useParams();
    const navigate=useNavigate();
    const [left, setLeft] = useState(false);

    const sendEmail = () => {
        const response = axios.post(`${import.meta.env.VITE_APP_BASEURL}/students/sendnotification/${roomid}`)
}

    
    const meeting =async(element)=>{
    const appID=1739320555;
    const serverSecret="0fa99a90271561896f85760090a8736e";
    const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomid,Date.now().toString(),"TriviaTrack");
   
   const zc=ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
    container: element,
    scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
    },
    showScreenSharingButton: true,
    onLeaveRoom:()=>{
        navigate("/")
        window.alert(`You have left the meeting, Thank you for attending: ${roomid}`)
        sendEmail();

    },
    onLiveEnd:()=>{
        alert("Meeting has ended.");
        navigate("/")   
    },

    turnOnCameraWhenJoining: false,
       
      } ) 
}
   return<div>
         <div className="mt-16" ref={meeting} style={{ width: '100vw', height: '100vh'}}/>
   </div>


}
export default RoomPage;