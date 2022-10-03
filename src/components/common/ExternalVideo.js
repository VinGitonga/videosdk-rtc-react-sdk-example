import { useState, useRef } from "react"
import Title from "./Title";
import { useMeeting } from "@videosdk.live/react-sdk"

const ExternalVideo = () => {
    const width = 400;
    const height = (width * 2) / 3;
    const borderRadius = 8;

    const [{ link, playing }, setVideoInfo] = useState({
        link: null,
        playing: false,
    });

    const onVideoStateChanged = (data) => {
        const { currentTime, link, status } = data;

        switch (status) {
            case "stopped":
                console.log("stopped in switch");
                externalPlayer.current.src = null;
                setVideoInfo({ link: null, playing: false });
                break;
            case "resumed":
                if (typeof currentTime === "number") {
                    externalPlayer.current.currentTime = currentTime;
                }
                externalPlayer.current.play();
                setVideoInfo((s) => ({ ...s, playing: true }));
                break;
            case "paused":
                externalPlayer.current.pause();
                setVideoInfo((s) => ({ ...s, playing: false }));
                break;
            case "started":
                setVideoInfo({ link, playing: true });
                break;
            default:
                break;
        }
    };

    const onVideoSeeked = (data) => {
        const { currentTime } = data;
        if (typeof currentTime === "number") {
            externalPlayer.current.currentTime = currentTime;
        }
    };

    useMeeting({ onVideoStateChanged, onVideoSeeked });
    const externalPlayer = useRef();

    return !link ? null : (
        <div
            style={{
                borderRadius,
                padding: borderRadius,
                margin: borderRadius,
                backgroundColor: "#3E84F6",
                display: "flex",
            }}
        >
            <Title title={"External Video"} />

            <video
                style={{ borderRadius, height, width, backgroundColor: "black" }}
                autoPlay
                ref={externalPlayer}
                src={link}
            />
        </div>
    );
};

export default ExternalVideo