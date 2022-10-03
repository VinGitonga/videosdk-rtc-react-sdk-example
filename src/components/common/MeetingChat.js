import { useState } from 'react'
import { usePubSub } from "@videosdk.live/react-sdk"
import Title from './Title';
import MessageList from './MessageList';

const primary = "#3E84F6";

const MeetingChat = ({ tollbarHeight }) => {
    const { publish, messages } = usePubSub("CHAT", {});
    const [message, setMessage] = useState("");
    return (
        <div
            style={{
                marginLeft: 8,
                width: 400,
                backgroundColor: primary,
                overflowY: "scroll",
                borderRadius: 8,
                height: `calc(100vh - ${tollbarHeight + 2 * 8}px)`,
                padding: 8,
            }}
        >
            <Title title={"Chat"} />

            <div style={{ display: "flex" }}>
                <input
                    value={message}
                    onChange={(e) => {
                        const v = e.target.value;
                        setMessage(v);
                    }}
                />
                <button
                    className={"button default"}
                    onClick={() => {
                        const m = message;

                        if (m.length) {
                            publish(m, { persist: true });
                            setMessage("");
                        }
                    }}
                >
                    Send
                </button>
            </div>
            <MessageList messages={messages} />
        </div>
    );
};

export default MeetingChat