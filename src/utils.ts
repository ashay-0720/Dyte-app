import axios from "axios";

export const joinExistingRoom = async (
    meetingId: string,
    roomName: string,
  ) => {
    const resp = await axios({
      url: `/participant`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: {
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

    //reloading the page
    window.location.reload()
  };