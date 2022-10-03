import { useConnection } from "@videosdk.live/react-sdk"
import { getToken } from "../../api";


const primary = "#3E84F6";
const width = 400;
const borderRadius = 8;

const ConnectionView = ({ connectionId }) => {
    const { connection } = useConnection(connectionId, {
        onMeeting: {
            onChatMessage: ({ message, participantId }) => {
                alert(
                    `A Person ${participantId} from ${connectionId} Wants to say : ${message}`
                );
            },
        },
    });

    const connectionParticipants = [...connection.meeting.participants.values()];

    const ConnectionParticipant = ({ participant }) => {
        return (
            <div style={{ padding: 4, border: "1px solid blue" }}>
                <p>{participant.displayName}</p>
                <button
                    onClick={async () => {
                        const meetingId = prompt(
                            `In Which meetingId you want to switch ${participant.displayName} ?`
                        );
                        const payload = prompt("enter payload you want to pass");

                        const token = await getToken();
                        if ((meetingId, token, payload)) {
                            participant
                                .switchTo({ meetingId, token, payload })
                                .catch(console.log);
                        } else {
                            alert("Empty meetingId or payload ");
                        }
                    }}
                    className={"button "}
                >
                    Switch
                </button>
            </div>
        );
    };

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
            <button
                onClick={() => {
                    connection.close();
                }}
                className={"button"}
            >
                Close Connection
            </button>

            <button
                onClick={() => {
                    const message = prompt("Enter You Message");
                    if (message) {
                        connection.meeting.sendChatMessage(message);
                    } else {
                        alert("Empty Message ");
                    }
                }}
                className={"button"}
            >
                Send Meessage
            </button>

            <button
                onClick={() => {
                    connection.meeting.end();
                }}
                className={"button"}
            >
                End Meeting
            </button>
            <p>
                {connection.id} : {connection.payload}
            </p>
            {connectionParticipants.map((participant) => {
                return (
                    <ConnectionParticipant
                        key={`${connection.id}_${participant.id}`}
                        participant={participant}
                    />
                );
            })}
        </div>
    );
};

export default ConnectionView