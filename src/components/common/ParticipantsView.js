import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import { chunk } from "../../utils/utils";
import Title from "./Title"

const ParticipantsView = () => {
    const { participants } = useMeeting();

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                padding: 8,
            }}
        >
            <Title dark title={"Participants"} />
            {chunk([...participants.keys()]).map((k) => (
                <div style={{ display: "flex" }}>
                    {k.map((l) => (
                        <ParticipantView key={l} participantId={l} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ParticipantsView