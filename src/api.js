import axios from "axios";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;

export const getToken = () => VIDEOSDK_TOKEN;

export const createMeeting = async ({ token }) => {
    const config = {
        headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };

    let data = {
        region: "sg001",
        userMeetingId: "unicorn",
    };

    let resp = await axios.post(
        "https://api.videosdk.live/v1/meetings",
        JSON.stringify(data),
        config
    );

    console.log(resp.data);

    // return res.status(200).json(resp.data);

    return resp.data;
};

export const validateMeeting = async ({ meetingId, token }) => {
    let config = {
        method: "POST",
        url: `https://api.videosdk.live/v1/meetings/${meetingId}`,
        headers: {
            authorization: `${token}`
        }
    }

    let resp = await axios(config)
    console.log(resp.data)
    return resp.data ? resp.data.meetingId === meetingId : false;
};
