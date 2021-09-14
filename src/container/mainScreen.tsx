import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoaderIcon from "../loader";

const folderNameMap: any = {
  "simple-dyte-client": "simpleDyteMeeting",
  "custom-layout-button": "customLayoutButton",
};

export const MainScreenComponent: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allMeeetings, setAllMeeting] = useState<any[]>([]);
  const [newMeetingTitle, setNewMeetingTitle] = useState<string>("");
  const [showHeader, setShowHeader] = useState<string>("true")
  const [selectedExample, setSelectedExample] =
    useState<string>("simple-dyte-client");

  const[preset, setPreset] = useState<string> ("Preset1");
  
    const [showControlBar, setShowControlBar] =  useState<string>("true");
    const [showPlugins, setShowPlugins]       =  useState<string>("true");
    const [showScreenShare, setShowScreenShare] = useState<string>("true");
    const [showShare, setshowShare]            =  useState<string>("true");
    const [showParticipants, setShowParticipants] = useState<string>("true");
    const [showChat, setShowChat]                 = useState<string>("true");
    const [showPolls,setShowPolls]                =  useState<string>("true");
    const [showFullScreen, setShowFullScreen]     =  useState<string>("true");
    const [showLayout, setShowLayout]             =  useState<string>("true");
  
    const  [showClock, setShowClock] = useState<string>("true");
    const  [showTitle, setShowTitle] =  useState<string>("true");
    const  [showLogo, setShowLogo] = useState<string>("true");
    const  [showParticipantCount, setShowParticipantCount] = useState<string>("true"); 
    const  [width, setWidth] = useState<string> ("400");
    const  [height, setHeight] = useState<string> ("600");
    const  [logoUrl, setLogoUrl] = useState<string> ("");
    const  [primaryColor, setPrimaryColor] = useState<string> ("");
    const  [secondaryColor, setSecondaryColor] = useState<string> ("");
    const  [textColor, setTextColor] = useState<string> ("");
    const  [backgroundColor, setBackgroundColor] = useState<string> ("");

  let history = useHistory();

  const handleCreateRoomClick = useCallback(
    (title) => {
      axios({
        url: `/meeting`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        data: {
          title: title,
          presetName: "Preset1",
        },
      })
        .then((res) => {
          let rooms = [...allMeeetings];
          rooms.push(res.data.data.meeting);
          setAllMeeting([...rooms]);
          setNewMeetingTitle("");
        })
        .catch((err) => console.error(err));
    },
    [allMeeetings]
  );

  const handleCreatePresetClick = useCallback(
    () => {
      axios({
        url: `/preset`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        data: {
          preset: {
            role: 'participant', 
            uiConfig: {
              controlBar: showControlBar,
              controlBarElements: {
                plugins: showPlugins,
                screenShare: showScreenShare,
                share: showShare,
                participants: showParticipants,
                chat: showChat,
                polls: showPolls,
                fullscreen: showFullScreen,
                layout: showLayout,
              },
              header: showHeader,
              headerElements: {
                clock: showClock,
                title: showTitle,
                logo: showLogo,
                participantCount: showParticipantCount,
              },
              // dimensions:{
              //     width: width,
              //     height: height
              // },
              logo: logoUrl,
              colors:{
                  primary:'#df3618',
                  secondary:'#262626',
                  textPrimary:'#EEEEEE',
                  videoBackground:'#1A1A1A',
              }
              //  a set of four hex colors
              // primary - color of the primary elements like participant name box
              // secondary - color of the secondary elements like control bar, control buttons, hover
              // textPrimary - color of the text elements
              // videoBackground - color behind the video when the video is turned off
            }
          },
          name: 'Preset69',
          description: 'Custom Preset via API'
        },
      })
        .then((res) => {console.log(res)})
        .catch((err) => console.error(err));
    },
    []
  );


  const joinRoom = async (
    meetingId: string,
    roomName: string,
    isHost: boolean = false
  ) => {
    const resp = await axios({
      url: `/participant`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: {
        isHost: isHost,
        meetingId: meetingId,
        presetName: "Preset4",
      },
    });

    const authResponse = resp.data.data.authResponse;
    const authToken = authResponse.authToken;

    //saving meeting details in session storage
    sessionStorage.setItem("auth", authToken);
    sessionStorage.setItem("meetingID", meetingId);
    sessionStorage.setItem("roomName", roomName);
    

    // sessionStorage.setItem("controlBarDisplay", showControlBar) ;
    // sessionStorage.setItem("pluginsDisplay", showPlugins) ;
    // sessionStorage.setItem("screenShareDisplay", showScreenShare) ;
    // sessionStorage.setItem("shareDisplay", showShare) ;
    // sessionStorage.setItem("participantsDisplay", showParticipants) ;
    // sessionStorage.setItem("chatDisplay", showChat) ;
    // sessionStorage.setItem("pollsDisplay", showPolls) ;
    // sessionStorage.setItem("fullscreenDisplay", showFullScreen) ;
    // sessionStorage.setItem("layoutDisplay", showLayout) ;
    // sessionStorage.setItem("headerDisplay", showHeader) ;
    // sessionStorage.setItem("clockDisplay", showClock) ;
    // sessionStorage.setItem("titleDisplay", showTitle) ;
    // sessionStorage.setItem("logoDisplay", showLogo) ;
    // sessionStorage.setItem("participantCountDisplay", showParticipantCount);
    // sessionStorage.setItem("width", "400")
    // sessionStorage.setItem("height", "600")
    // sessionStorage.setItem("logoUrl", logoUrl);

    //redirecting to the example meeting page
    history.push(`/${selectedExample}/meeting/${roomName}/${meetingId}`);
  };

  useEffect(() => {
    // api call to get list of available/existing meeting rooms
    axios({
      url: `/meeting`,
      method: "GET",
    })
      .then((response) => {
        setAllMeeting(response.data.data.meetings);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(logoUrl);
  }, [logoUrl]);

  return (
    <div className="main-screen-wrapper">
      <img src="/logo/dyte_logo_white.svg" alt="dyte-logo" />
      <h1>Welcome to the example app.</h1>
      <div className="flex row">
        <input
          type="text"
          value={newMeetingTitle}
          placeholder="New meeting title"
          onChange={(e) => setNewMeetingTitle(e.target.value)}
        />
        <button
          className="margin-left"
          onClick={() => handleCreateRoomClick(newMeetingTitle)}
        >
          Create Room
        </button>
      </div>
      <div className="divider" />
      <h3>Choose Example </h3>
      <select onChange={(e) => setSelectedExample(e.target.value)}>
        <option value="simple-dyte-client">simple-dyte-client</option>
        <option value="custom-layout-button">custom-layout-button</option>
      </select>
      <div className="ex-det">
        <div>Check the example component here</div>
        <br />
        <code>/src/exampleComponent/{folderNameMap[selectedExample]}</code>
      </div>
      <div className="divider" />
      
      <h3>Create New Preset</h3>
      <h3>Name your Preset</h3>
      <input onChange={(e) => setPreset(e.target.value)}/>
      <div className="divider" />

      <h3>Show Control bar or not </h3>
      <select onChange={(e) => setShowControlBar(e.target.value)}>
        <option value="true">show </option>
        <option value="false">hide</option>
      </select>
      <div className="divider" />
      
      <div className="options">
        <div>
          <h3>Plugins</h3>
          <select onChange={(e) => setShowPlugins(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>ScreenShare </h3>
          <select onChange={(e) => setShowScreenShare(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Share meeting link </h3>
          <select onChange={(e) => setshowShare(e.target.value)}>
            <option value="true">show </option>
            <option value="false">hide </option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Participants </h3>
          <select onChange={(e) => setShowParticipants(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Polls Button </h3>
          <select onChange={(e) => setShowPolls(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Chat</h3>
          <select onChange={(e) => setShowChat(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>FullScreen Button </h3>
          <select onChange={(e) => setShowFullScreen(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div><h3>Change Layout</h3>
          <select onChange={(e) => setShowLayout(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
      </div>
      
      <div className="divider" />

      
      <h3>Header Bar</h3>
      <select onChange={(e) => setShowHeader(e.target.value)}>
        <option value="true">show</option>
        <option value="false">hide</option>
      </select>
      <div className="divider" />

      <div className="options">
        <div>
          <h3>Clock</h3>
          <select onChange={(e) => setShowClock(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Title </h3>
          <select onChange={(e) => setShowTitle(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Logo</h3>
          <select onChange={(e) => setShowLogo(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>participant count </h3>
          <select onChange={(e) => setShowParticipantCount(e.target.value)}>
            <option value="true">show</option>
            <option value="false">hide</option>
          </select>
        </div>
      </div>
      <div className="divider" />

      <div className="options">
        <div>
          <h3>Set Custom width </h3>
          <select onChange={(e) => setWidth(e.target.value)}>
            <option value={400}>400</option>
            <option value={1080}>1080</option>
          </select>
        </div>
        {/* <div className="divider" /> */}

        <div>
          <h3>Set Custom height </h3>
          <select onChange={(e) => setHeight(e.target.value)}>
            <option value={600}>600</option>
            <option value={400}>400</option>
          </select>
        </div>
      </div>
      <div className="divider" />

      <h3>Set logo </h3>
      <input onChange={(e) => setLogoUrl(e.target.value)}/>
      <div className="divider" />

      <div className="options">
        <h3>Color scheme </h3>
        <div>
          <h3>Primary Color </h3>
          <select onChange={(e) => setPrimaryColor(e.target.value)}>
            <option value="#2160FD">Blue</option>
            <option value="#df3618">Red</option>
          </select>
        </div>
        <div>
          <h3>Secondary scheme </h3>
          <select onChange={(e) => setSecondaryColor(e.target.value)}>
            <option value="#262626">Black</option>
          </select>
        </div>
        <div>
          <h3>textPrimary </h3>
          <select onChange={(e) => setTextColor(e.target.value)}>
            <option value="#EEEEEE">White</option>
          </select>
        </div>
        <div>
          <h3>Video Background </h3>
          <select onChange={(e) => setBackgroundColor(e.target.value)}>
            <option value="#1A1A1A">Black</option>
          </select>
        </div>
        
        <button onClick={handleCreatePresetClick}>Create my new UI</button>
      </div>
      
      <div className="divider" />

      <div className="existing-meeting-wrapper flex column ">
        <h3>List of created rooms.</h3>
        <h5>Click to join as new participant or as a host.</h5>
        <div className="existing-meeting-list flex row ">
          {!loading &&
            allMeeetings.map((el, k) => {
              return (
                <div key={el.id} className="flex column meeting-list-wrapper">
                  <li key={k}>{el.title}</li>
                  <div className="flex row">
                    <button
                      onClick={() => joinRoom(el.id, el.roomName, true)}
                    >
                      Join as Host{" "}
                    </button>
                    <button
                      className="margin-left"
                      onClick={() => joinRoom(el.id, el.roomName)}
                    >
                      Join as Participant{" "}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {!loading && !allMeeetings.length && (
          <div className="flex no-rooms column">
            <div>No existing rooms 🙁 !</div>
            <div>Create a new room above</div>
          </div>
        )}
        {loading && <LoaderIcon />}
      </div>
    </div>
  );
};
