import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_PORT, {
    transports: ["websocket", "polling"]
});


socket.on("connect", () => {
    console.log("Conectado:", socket.id);
});

socket.on("mensagem", (msg) => {
    console.log("Mensagem do backend:", msg);
});

socket.emit("mensagem", "Oi do frontend!");

export default socket;