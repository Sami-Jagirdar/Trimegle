import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from "../../redux/Store"
import { resetPeerConnections, setPeerConnections } from "../../redux/PeerConnectionSlice";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const navigateToRoom = () => navigate('/room')

    const [streaming, setStreaming] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(setPeerConnections());
      }, [dispatch]);


    const openWebcam = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Show stream in HTML video
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        setLocalStream(stream);
        setStreaming(true);
        dispatch(setPeerConnections());

        const pc1 = useSelector((state: RootState) => state.peerConnections.peerConnection1)
        const pc2 = useSelector((state: RootState) => state.peerConnections.peerConnection2)

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
            localStream.getTracks().forEach(track => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          setLocalStream(null);
          setStreaming(false);
          dispatch(resetPeerConnections());
        }
      };

    
    return (
        <>
            <h2>Click below to join a room</h2>
            <video ref={videoRef} autoPlay playsInline width="540" height="360"></video>
            <div>
                {streaming ? (
                <button onClick={closeWebcam}>Stop Webcam</button>
                ) : (
                <button onClick={openWebcam}>Start Webcam</button>
                )}
            </div>

            <div className="card">
                <button onClick={navigateToRoom}>
                Join!
                </button>
            </div>
        </>
    )
}

export default Home;