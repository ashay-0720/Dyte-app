require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/build')));


let baseUrl = process.env.REACT_APP_DYTE_BASE_URL;
let orgId = process.env.REACT_APP_DYTE_ORG_ID;
let key = process.env.REACT_APP_DYTE_API_KEY;

//get all meetings
app.get("/meeting", async (req, res) => {
  await axios({
    url: `${baseUrl}/v1/organizations/${orgId}/meetings`,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${key}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.error(err));
});

//create participant
app.post("/participant", async (req, res) => {
  let meetingId = req.body.meetingId;
  let isHost = req.body.isHost;
  await axios
    .post(
      `${baseUrl}/v1/organizations/${orgId}/meetings/${meetingId}/participant`,
      {
        clientSpecificId: Math.random().toString(36).substring(7),
        userDetails: {
          name: isHost
            ? "Host"
            : "Participant" + Math.random().toString(36).substring(2),
        },
        roleName: isHost ? "host2" : "participant",
      },
      {
        headers: {
          Authorization: `APIKEY ${key}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.error(err));
});

//create meeting
app.post("/meeting", async (req, res) => {
  let title = req.body.title;
  await axios({
    url: `${baseUrl}/v1/organizations/${orgId}/meeting`,
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${key}`,
    },
    data: {
      title: title,
      presetName: "Preset1"
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.error(err));
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(port, () => {
  console.log(`App listening at ${port} port`);
});
