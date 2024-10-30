import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

interface WebcamContextType {
    localStream: MediaStream | null;
    streaming: boolean;
    startWebcam: () => Promise<void>;
    stopWebcam: () => void;
}

const WebcamContext = createContext<WebcamContextType | undefined>(undefined);

// Custom hook to use WebcamContext
export const useWebcam = (): WebcamContextType => {
    const context = useContext(WebcamContext);
    if (!context) {
        throw new Error('useWebcam must be used within a WebcamProvider');
    }
    return context;
};

// Provider component
interface WebcamProviderProps {
    children: ReactNode;
}

export const WebcamProvider: React.FC<WebcamProviderProps> = ({ children }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [streaming, setStreaming] = useState<boolean>(false);

    const pc1 = useSelector((state: RootState) => state.peerConnections.peerConnection1)
    const pc2 = useSelector((state: RootState) => state.peerConnections.peerConnection2)

    // Function to start the webcam and update state
    const startWebcam = useCallback(async () => {
        if (!localStream) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setLocalStream(stream);
                setStreaming(true);
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        }
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
    }, [localStream]);

    // Function to stop the webcam and update state
    const stopWebcam = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
            setStreaming(false);

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
    }, [localStream]);

    const value = {
        localStream,
        streaming,
        startWebcam,
        stopWebcam,
    };

    return <WebcamContext.Provider value={value}>{children}</WebcamContext.Provider>;
};
