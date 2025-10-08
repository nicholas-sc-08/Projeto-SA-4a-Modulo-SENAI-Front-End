import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_PORT, {transports: ["websocket"]});

export default socket;