import React, { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [messageList, setMessageList] = React.useState([]);
  const [newMessageText, setNewMessageText] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [socket, setSocket] = React.useState(null);

  const ENDPOINT = "http://localhost:5050";

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("newMessage", (message) => {
      setMessageList([...messageList, message]);
    });
    setSocket(socket);
  }, [messageList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { author: nickName, text: newMessageText });
    setNewMessageText("");
  };
  return (
    <div className="App">
      <h2>Messages</h2>
      {messageList.map((message, id) => {
        return (
          <div key={id}>
            {message.author} : {message.text}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <h2>New Message</h2>
        <input
          type="text"
          name="author"
          placeholder="nickname"
          value={nickName}
          required
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="text"
          name="messageContent"
          placeholder="message"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default App;
