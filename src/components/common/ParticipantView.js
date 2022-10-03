import { useRef, useEffect, useMemo } from "react"
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";
import { getToken } from "../../api"

const primary = "#3E84F6";
const width = 400;
const borderRadius = 8;

const ParticipantView = ({ participantId }) => {
    const webcamRef = useRef(null);
    const micRef = useRef(null);
    const screenShareRef = useRef(null);

    const onStreamEnabled = (stream) => { };
    const onStreamDisabled = (stream) => { };

    const {
        displayName,
        participant,
        webcamStream,
        micStream,
        screenShareStream,
        webcamOn,
        micOn,
        screenShareOn,
        isLocal,
        isActiveSpeaker,
        isMainParticipant,
        switchTo,
        pinState,
        setQuality,
        setViewPort,
        enableMic,
        disableMic,
        enableWebcam,
        disableWebcam,
        pin,
        unpin,
    } = useParticipant(participantId, {
        onStreamEnabled,
        onStreamDisabled,
    });

    useEffect(() => {
        webcamOn && setQuality("high");
    }, [webcamStream, webcamOn]);

    const webcamMediaStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    const screenShareMediaStream = useMemo(() => {
        if (screenShareOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) => console.error("mic  play() failed", error));
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div
            style={{
                width,
                backgroundColor: primary,
                borderRadius: borderRadius,
                overflow: "hidden",
                margin: borderRadius,
                padding: borderRadius,
                display: "flex",
                flex: 1,
                flexDirection: "column",
                position: "relative",
            }}
        >
            <audio ref={micRef} autoPlay muted={isLocal} />

            <div
                style={{
                    position: "relative",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    backgroundColor: "black",
                    width: "100%",
                    height: 300,
                }}
            >
                <div
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <>
                        <ReactPlayer
                            ref={webcamRef}
                            //
                            playsinline // very very imp prop
                            playIcon={<></>}
                            //
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            //
                            url={webcamMediaStream}
                            //
                            height={"100%"}
                            width={"100%"}
                            onError={(err) => {
                                console.log(err, "participant video error");
                            }}
                        />
                    </>
                    <div
                        style={{
                            position: "absolute",
                            top: borderRadius,
                            right: borderRadius,
                        }}
                    >
                        <p
                            style={{
                                color: webcamOn ? "green" : "red",
                                fontSize: 16,
                                fontWeight: "bold",
                                opacity: 1,
                            }}
                        >
                            WEB CAM
                        </p>
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                        }}
                    >
                        <button
                            className="button blue"
                            style={
                                {
                                    // height: 50,
                                    // width: 200,
                                }
                            }
                            onClick={async () => {
                                const meetingId = prompt(
                                    `Please enter meeting id where you want to switch ${displayName}`
                                );
                                const token = await getToken();
                                if (meetingId && token) {
                                    try {
                                        await switchTo({
                                            meetingId,
                                            payload: "Im Switching",
                                            token: token,
                                        });
                                    } catch (e) {
                                        console.log("swithc To Error", e);
                                    }
                                } else {
                                    alert("Empty meetingId!");
                                }
                            }}
                        >
                            Switch Participant
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: borderRadius,
                    position: "relative",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    backgroundColor: "black",
                    width: "100%",
                    height: 300,
                }}
            >
                <div
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <>
                        <ReactPlayer
                            ref={screenShareRef}
                            //
                            playsinline // very very imp prop
                            playIcon={<></>}
                            //
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            //
                            url={screenShareMediaStream}
                            //
                            height={"100%"}
                            width={"100%"}
                            onError={(err) => {
                                console.log(err, "participant video error");
                            }}
                        />
                    </>
                    <div
                        style={{
                            position: "absolute",
                            top: borderRadius,
                            right: borderRadius,
                        }}
                    >
                        <p
                            style={{
                                color: screenShareOn ? "green" : "red",
                                fontSize: 16,
                                fontWeight: "bold",
                                opacity: 1,
                            }}
                        >
                            SCREEN SHARING
                        </p>
                    </div>
                </div>
            </div>
            <table>
                {[
                    { k: "Name", v: displayName },
                    { k: "webcamOn", v: webcamOn ? "YES" : "NO" },
                    { k: "micOn", v: micOn ? "YES" : "NO" },
                    { k: "screenShareOn", v: screenShareOn ? "YES" : "NO" },
                    { k: "isLocal", v: isLocal ? "YES" : "NO" },
                    { k: "isActiveSpeaker", v: isActiveSpeaker ? "YES" : "NO" },
                    { k: "isMainParticipant", v: isMainParticipant ? "YES" : "NO" },
                ].map(({ k, v }) => (
                    <tr key={k}>
                        <td style={{ border: "1px solid #fff", padding: 4 }}>
                            <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{k}</h3>
                        </td>
                        <td style={{ border: "1px solid #fff", padding: 4 }}>
                            <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{v}</h3>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ParticipantView