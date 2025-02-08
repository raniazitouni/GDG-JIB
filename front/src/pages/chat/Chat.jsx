import { useState } from "react";
import { fetchData } from "../../utils/utils";
import chatlogo from "../../../public/Assets/chatAssets/chat.svg";
import vector from "../../../public/Assets/chatAssets/vector.svg";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const data = await fetchData("http://localhost:8000/chatbot/", "POST", {
      message: input,
    });
    if (data.error) {
      console.error("error:", res.error);
    } else {
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Error: No response from the bot." },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between  w-full px-24 pt-14 pb-36 bg-WhiteC h-screen">
      <img src={chatlogo} className="h-24 object-contain" />
      <div className=" overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-1/3 px-2 py-4 rounded-lg my-2 bg-white ${
              msg.role === "user"
                ? "border-l-4 border-BlueA mr-auto"
                : "border-r-4 border-BlueA ml-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4 relative">
        <input
          className="flex-grow py-6 px-4  rounded-lg border-t-2 border-b-2 border-BlueA"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a new message here"
        />
        <img
          src={vector}
          className="w-8 h-8 object-contain absolute top-0 right-0 m-6 hover:cursor-pointer"
          onClick={sendMessage}
        />
       
      </div>
    </div>
  );
};

export default Chat;
