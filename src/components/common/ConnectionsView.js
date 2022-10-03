import { useMeeting } from "@videosdk.live/react-sdk";
import ConnectionView from "./ConnectionView";
import { chunk } from "../../utils/utils";
import Title from "./Title";

const ConnectionsView = () => {
    const { connections, meetingId } = useMeeting();
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                padding: 8,
            }}
        >
            <Title dark title={"Connections"} />
            {chunk([...connections.keys()]).map((k) => (
                <div style={{ display: "flex" }} key={k}>
                    {k.map((l) => (
                        <ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ConnectionsView