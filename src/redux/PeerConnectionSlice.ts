import { createSlice } from '@reduxjs/toolkit';

export interface PeerConnections {
    peerConnection1: RTCPeerConnection | null;
    peerConnection2: RTCPeerConnection | null;
}

const initialState: PeerConnections = {
    peerConnection1: new RTCPeerConnection(),
    peerConnection2: new RTCPeerConnection(),
};

export const peerConnectionSlice = createSlice({
    name: 'peerConnections',
    initialState: initialState,  
    reducers: {
        resetPeerConnections(state) {
            state.peerConnection1 = null;
            state.peerConnection2 = null;
        },
        setPeerConnections(state) {
            state.peerConnection1 = new RTCPeerConnection();
            state.peerConnection2 = new RTCPeerConnection();
        }
    }
})


export default peerConnectionSlice.reducer
export const {resetPeerConnections, setPeerConnections} = peerConnectionSlice.actions