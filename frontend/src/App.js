import React, { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const ENDPOINT = "http://localhost:5050";

  useEffect(() => {
    const socket = io(ENDPOINT);
    // ... other codes

    // Emitting an event that will trigger in the backend
    socket.emit("connection", {
      message: "Hello from the frontend",
    });

    // ... other codes
  }, []);

  /*return (
    <div className="App">
      <h2>Messages</h2>
      {messageList.map((message) => {
        return (
          <div key={message.id}>
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
  );*/

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
