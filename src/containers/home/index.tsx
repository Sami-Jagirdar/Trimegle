import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from "../../redux/Store"
import { setPeerConnections } from "../../redux/PeerConnectionSlice";
import { useWebcam } from "../../components/webcam";


const Home: React.FC = () => {
    // const [streaming, setStreaming] = useState(false);
    // const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    // const [shouldNavigateToRoom, setShouldNavigateToRoom] = useState(false);

    const {localStream, streaming, startWebcam, stopWebcam} = useWebcam();

    useEffect(() => {
        if (streaming && videoRef.current) {
            videoRef.current.srcObject = localStream;
        }
    }, [streaming, localStream]);

    const navigate = useNavigate();
    // const navigateToRoom = () => {
    //     if (streaming) {
    //         closeWebcam();
    //         setStreaming(true);
    //     } else {
    //         closeWebcam();
    //         setStreaming(false); 
    //     }
    //     setShouldNavigateToRoom(true);
    // }

    const navigateToRoom = () => {
        navigate('/room');
    }

    // useEffect(() => {
    //     if (shouldNavigateToRoom) {
    //         navigate('/room', {state: {streaming}});
    //     }
    // }, [streaming, shouldNavigateToRoom])

    // const pc1 = useSelector((state: RootState) => state.peerConnections.peerConnection1)
    // const pc2 = useSelector((state: RootState) => state.peerConnections.peerConnection2)

    // const dispatch: AppDispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPeerConnections());
    //   }, [dispatch]);


    // const openWebcam = async () => {

    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    //     // Show stream in HTML video
    //     if (videoRef.current) {
    //         videoRef.current.srcObject = stream;
    //       }
    //     setLocalStream(stream);
    //     setStreaming(true);

    //     // Push tracks from local stream to peer connections
    //     if (localStream) {
    //         if (pc1) {
    //             localStream.getTracks().forEach((track) => {
    //                 pc1.addTrack(track, localStream);
    //             });
    //         }
    //         if (pc2) {
    //             localStream.getTracks().forEach((track) => {
    //                 pc2.addTrack(track, localStream);
    //             });
    //         }
    //     }   
    // }

    // const closeWebcam = async  () => {
    //     if (localStream) {
    //         localStream.getTracks().forEach(track => track.stop());
    //       if (videoRef.current) {
    //         videoRef.current.srcObject = null;
    //       }
    //       setLocalStream(null);
    //       setStreaming(false);
    //     }
    //   };

    
    return (
        <>
            <h2>Click below to join a room</h2>
            <video ref={videoRef} autoPlay playsInline width="540" height="360"></video>
            <div>
                {streaming ? (
                <button onClick={stopWebcam}>Stop Webcam</button>
                ) : (
                <button onClick={startWebcam}>Start Webcam</button>
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