import { useEffect, useRef, useState } from "react";
import StyledRoom from "./style";

const Room: React.FC = () => {

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const localVideo = useRef<HTMLVideoElement>();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setLocalStream(stream);
            if (localVideo.current != null) {localVideo.current.srcObject = stream}
        });

        
        

      }, []);

    const stopLocalStream = () => {
    if (localStream) {
        localStream.getTracks().forEach(track => {track.stop()});
        if (localVideo.current) {
            localVideo.current.srcObject = null;
        }
    }
    };

    return (
        <>
            <h1>Trimegle</h1>
            <StyledRoom>
                <video id="remoteVideo1"></video>
                <video id="remoteVideo2"></video>
            </StyledRoom>
            <button onClick = {stopLocalStream}>Stop Video</button>
            
        </>
        
    )
}

export default Room;