import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const [messageList, setMessageList] = React.useState([]);
  const [newMessageText, setNewMessageText] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  const ENDPOINT = "http://localhost:5050";

  // OnMount
  useEffect(() => {
    const socket = io(ENDPOINT);

    setSocket(socket);

    socket.on("connect", () => {
      setCurrentUser(socket.id);
    });

    return () => {
      socket.emit("disconnectUser", socket.id);
      socket.off();
    };
  }, []);

  // OnUpdate
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessageList([...messageList, message]);
      });
    }
  }, [messageList, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      author: nickName,
      text: newMessageText,
      id: currentUser,
    });
    setNewMessageText("");
  };

  return (
    <div className="App">
      <h2>Messages</h2>

      <div className="container">
        {messageList.map((message, id) => {
          return (
            <p
              key={id}
              className={message.id === currentUser ? "my-message" : "message"}
            >
              <strong>{message.author}</strong>: {message.text}
            </p>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>New Message</h2>
        <input
          type="text"
          name="author"
          placeholder="Ton pseudo"
          value={nickName}
          required
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="text"
          name="messageContent"
          placeholder="Ton message"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default App;
