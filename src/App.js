import React, { useState } from "react";
import {
    MeetingProvider,
} from "@videosdk.live/react-sdk";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { JoiningScreen } from "./components/JoiningScreen";
import MeetingView from "./components/common/MeetingView";

const App = () => {
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [isMeetingStarted, setMeetingStarted] = useState(false);

    return isMeetingStarted ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: micOn,
                webcamEnabled: webcamOn,
                name: participantName ? participantName : "TestUser",
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
        >
            <MeetingView
                onNewMeetingIdToken={({ meetingId, token }) => {
                    setMeetingId(meetingId);
                    setToken(token);
                }}
                onMeetingLeave={() => {
                    setToken("");
                    setMeetingId("");
                    setWebcamOn(false);
                    setMicOn(false);
                    setMeetingStarted(false);
                }}
            />
        </MeetingProvider>
    ) : (
        <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            meetinId={meetingId}
            setMeetingId={setMeetingId}
            setToken={setToken}
            setMicOn={setMicOn}
            micOn={micOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            onClickStartMeeting={() => {
                setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
        />
    );
};

export default App;
