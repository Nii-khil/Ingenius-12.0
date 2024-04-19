import { Button, Input, Space } from 'antd';
import { CopyOutlined, PhoneOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import './Call.css';

const { TextArea } = Input;
const socket = io.connect('http://localhost:5000');

export default function App() {
    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on('me', (id) => {
            setMe(id);
        });

        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: caller });
        });
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });
        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
            <div className="container">
                <div className="video-container">
                    <div className="video">{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}</div>
                    <div className="video">
                        {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} /> : null}
                    </div>
                </div>
                <div className="myId">
                    <TextArea
                        placeholder="Name"
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
                        <Button type="primary" icon={<CopyOutlined />} style={{ marginRight: '1rem' }}>
                            Copy ID
                        </Button>
                    </CopyToClipboard>

                    <Input
                        placeholder="ID to call"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                        style={{ marginBottom: '20px', width: '300px' }}
                        suffix={
                            <Button type="primary" icon={<PhoneOutlined />} onClick={() => callUser(idToCall)}>
                                Call
                            </Button>
                        }
                    />
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1>{name} is calling...</h1>
                            <Button type="primary" onClick={answerCall} style={{ marginBottom: '1rem' }}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
