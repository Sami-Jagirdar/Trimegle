import { useEffect, useRef, useState } from "react";
import StyledRoom from "./style";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store"
import { useLocation } from "react-router-dom";

const Room: React.FC = () => {

    const location = useLocation();
    const [streaming, setStreaming] = useState(location.state.streaming);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(location.state.videoRef);
    console.log(streaming);
    const pc1 = useSelector((state: RootState) => state.peerConnections.peerConnection1)
    const pc2 = useSelector((state: RootState) => state.peerConnections.peerConnection2)

    const openWebcam = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Show stream in HTML video
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        setLocalStream(stream);
        setStreaming(true);

        // Push tracks from local stream to peer connections
        if (localStream) {
            if (pc1) {
                localStream.getTracks().forEach((track) => {
                    pc1.addTrack(track, localStream);
                });
            }
            if (pc2) {
                localStream.getTracks().forEach((track) => {
                    pc2.addTrack(track, localStream);
                });
            }
        }   
    }

    const closeWebcam = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
                const sender1 = pc1?.getSenders().find(s=> s.track === track);
                const sender2 = pc2?.getSenders().find(s=> s.track === track);
                if (sender1) {pc1?.removeTrack(sender1);}
                if (sender2) {pc2?.removeTrack(sender2);}
            }); 
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = null;
            }
            setLocalStream(null);
            setStreaming(false);
        }
    };

    useEffect(() => {
        if (streaming){
            closeWebcam();
            openWebcam();
        }
    }, [])

    return (
        <>
            <h1>Trimegle</h1>
            <StyledRoom>
                <video ref={localVideoRef} autoPlay playsInline width="540" height="360"></video>
                <video id="remoteVideo1"></video>
                <video id="remoteVideo2"></video>
            </StyledRoom>
            <div>
                {streaming ? (
                <button onClick={closeWebcam}>Stop Webcam</button>
                ) : (
                <button onClick={openWebcam}>Start Webcam</button>
                )}
            </div>
            
        </>
        
    )
}

export default Room;