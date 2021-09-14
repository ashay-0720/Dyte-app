import React, { useEffect } from "react";
import { DyteMeeting, Meeting } from "dyte-client";
import { useHistory, useParams } from "react-router-dom";
import { joinExistingRoom } from "../utils";

export const MeetingComponent: React.FC<{}> = () => {
  let history = useHistory();
  let params : {
    id :  string;
    room : string
  } = useParams()
  let auth = sessionStorage.getItem("auth");
  let roomName = sessionStorage.getItem("roomName");
  
  // let controlBarDisplay  = (sessionStorage.getItem("controlBarDisplay") === "true") ? true : false;
  // let pluginsDisplay     = (sessionStorage.getItem("pluginsDisplay") === "true") ? true : false;
  // let screenShareDisplay = (sessionStorage.getItem("screenShareDisplay") === "true") ? true : false;
  // let shareDisplay       = (sessionStorage.getItem("shareDisplay") === "true") ? true : false;
  // let participantsDisplay = (sessionStorage.getItem("participantsDisplay") === "true") ? true : false;
  // let chatDisplay        = (sessionStorage.getItem("chatDisplay") === "true") ? true : false;
  // let pollsDisplay       = (sessionStorage.getItem("pollsDisplay") === "true") ? true : false;
  // let fullscreenDisplay  = (sessionStorage.getItem("fullscreenDisplay") === "true") ? true : false;
  // let layoutDisplay      = (sessionStorage.getItem("layoutDisplay") === "true") ? true : false;
  // let headerDisplay      = (sessionStorage.getItem("headerDisplay") === "true") ? true : false;
  // let clockDisplay       = (sessionStorage.getItem("clockDisplay") === "true") ? true : false;
  // let titleDisplay       = (sessionStorage.getItem("titleDisplay") === "true") ? true : false;
  // let logoDisplay        = (sessionStorage.getItem("logoDisplay") === "true") ? true : false;
  // let participantCountDisplay = (sessionStorage.getItem("participantCountDisplay") === "true") ? true : false;
  // let width = parseInt(JSON.parse( sessionStorage.getItem('width') || '{}'));
  // // let height = sessionStorage.getItem("height"); 
  // // let logoUrl = JSON.parse( sessionStorage.getItem('logoUrl') || '');
  // let logoUrl =  String(sessionStorage.getItem('logoUrl') || '');;
  

  const onDyteInit = (meeting: Meeting) => {
    //meeting ended event
    meeting.on(meeting.Events.meetingEnded, () => {
      sessionStorage.clear();
      history.push("/");
    });
  };

  useEffect(() => {
    if(!auth && !roomName){
      //creating a new participant
      joinExistingRoom(params.id, params.room)
    }
  }, [])

  return (
    <React.Fragment>
      {auth && roomName && process.env.REACT_APP_DYTE_ORG_ID && (
        <DyteMeeting
          onInit={onDyteInit}
          clientId={process.env.REACT_APP_DYTE_ORG_ID}
    
        //   uiConfig={{
        //     controlBar: controlBarDisplay,
        //     controlBarElements: {
        //         plugins: pluginsDisplay,
        //         screenShare: screenShareDisplay,
        //         share: shareDisplay,
        //         participants: participantsDisplay,
        //         chat: chatDisplay,
        //         polls: pollsDisplay,
        //         fullscreen: fullscreenDisplay,
        //         layout: layoutDisplay,
        //     },
        //     header: headerDisplay,
        //     headerElements: {
        //         clock: clockDisplay,
        //         title: titleDisplay,
        //         logo: logoDisplay,
        //         participantCount: participantCountDisplay,
        //     },
        //     // dimensions:{
        //     //     width: width,
        //     //     height: height
        //     // },
        //     logo: logoUrl,
        //     colors:{
        //         primary:'#df3618',
        //         secondary:'#262626',
        //         textPrimary:'#EEEEEE',
        //         videoBackground:'#1A1A1A',
        //     }
        //     //  a set of four hex colors
        //     // primary - color of the primary elements like participant name box
        //     // secondary - color of the secondary elements like control bar, control buttons, hover
        //     // textPrimary - color of the text elements
        //     // videoBackground - color behind the video when the video is turned off
        // }}
          meetingConfig={{
            roomName: roomName,
            authToken: auth,
            apiBase: process.env.REACT_APP_DYTE_BASE_URL,
          }}
        />
      )}
    </React.Fragment>
  );
};
