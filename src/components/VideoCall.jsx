import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react"

function randomID(len) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall(){
    useEffect(() => {
        const roomID = getUrlParams().get(`roomID`) || randomID(5);
        const userName = getUrlParams().get(`userName`) || randomID(6);

        if(!roomID){
            window.location.href = '/'
            return;
        }

        const userID = randomID(5);
        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            userID,
            userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: meetingRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            theme: "dark",
            sharedLinks: [
                {
                    name: "Room Code",
                    url: roomID,
                },
                {
                    name: 'Copy Meeting link',
                    url: window.location.href,
                },
            ],
        });
    })
    const meetingRef = useRef(null);
    return (
        <div ref={meetingRef} style={{width: '100vw', height: '100vh'}}>

        </div>
    )
}
