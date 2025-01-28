import React,{useState,useCallback} from "react";
import {useNavigate,useParams} from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


const RoomPage=()=>{
    const{roomid}=useParams();
    const navigate=useNavigate();
    

    const meeting =async(element)=>{
    const appID=482998377;
    const serverSecret="27be568853592ebc8b033ca21508ebd3";
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
    },
    onLiveEnd:()=>{
        navigate("/")   
    },
   
    
    turnOnCameraWhenJoining: false,
       
      } ) 
}
   return<div>
         <div className="mt-16" ref={meeting } style={{ width: '100vw', height: '100vh'}}/>
   </div>


}
export default RoomPage;