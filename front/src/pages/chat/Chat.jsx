import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input 





        }),
      });

      const data = await response.json();
      
      if (data.message) {
        setMessages((prev) => [...prev, { role: "bot", content: data.message }]);
      }else {
        setMessages((prev) => [...prev, { role: "bot", content: "Error: No response from the bot." }]);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  }
  
  return (
    <div className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-grow p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez un message..."
        />
        <button className="p-2 bg-blue-600 text-white rounded-r" onClick={sendMessage}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Chat

