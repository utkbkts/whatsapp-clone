import Sidebar from "./partials/sidebar/Sidebar";
import WhatsAppHome from "./partials/chat/WhatsAppHome";
import ChatContainer from "./partials/chat/ChatContainer";
import { useMessageListener } from "@/hooks/useMessageListener";
import Call from "@/components/call/Call";
import { useSocketContext } from "@/context/SocketContext";
import { useChatStore } from "@/store/chat-store";
import { useUserStore } from "@/store/user-store";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "@/utils/chat";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { OnlineUserType } from "@/types/type";

interface CallData {
  receiveingCall: boolean;
  callEnded: boolean;
  socketId: string;
  name: string;
  picture: string;
  signal: any;
}
const HomePage = () => {
  const { activeConversation } = useChatStore();
  useMessageListener();
  const [call, setCall] = useState<CallData>({
    receiveingCall: false,
    callEnded: false,
    socketId: "",
    name: "",
    picture: "",
    signal: "",
  });

  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const { socket } = useSocketContext();
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const { user } = useUserStore();
  const [show, setShow] = useState<boolean>(false);
  const { socketId } = call;
  const [onlineUsers, setOnlineUsers] = useState<OnlineUserType[]>([]);
  useEffect(() => {
    if (!socket) return;
    socket.emit("join", user?.user._id);

    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("get-online-users");
    };
  }, [socket, setOnlineUsers, user]);

  useEffect(() => {
    setupMedia();
    if (!socket) return;
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture.url,
        signal: data.signal,
        receiveingCall: true,
      });
    });
    socket.on("end call", () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);
  //--call user funcion
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      if (!socket) return;

      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user?.user.name,
        picture: user?.user.picture,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    if (!socket) return;
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  //--answer call  funcion
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      if (!socket) return;
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  //--end call  funcion
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receiveingCall: false });
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }
    if (!socket) return;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
  };
  //--------------------------
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = () => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
    setShow(true);
  };
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-start justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container flex h-screen">
        {/* Sidebar */}
        <Sidebar onlineUsers={onlineUsers} />
        {/* active conversation */}
        {activeConversation._id ? (
          <ChatContainer onlineUsers={onlineUsers} callUser={callUser} />
        ) : (
          <WhatsAppHome />
        )}
      </div>
      {/* call */}
      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
    </div>
  );
};

export default HomePage;
