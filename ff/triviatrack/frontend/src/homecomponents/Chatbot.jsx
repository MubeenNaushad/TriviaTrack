import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you learn today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // scroll to bottom whenever messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // reset state when opening
      setMessages([
        { role: "assistant", content: "Hello! How can I help you learn today?" },
      ]);
      setInput("");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // add user message
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    const question = input;
    setInput("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL}/api/chat`,
        { message: question }
      );

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I’m having trouble right now.",
        },
      ]);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-all z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 z-40">
          <div className="flex flex-col h-[400px] max-h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* header */}
            <div className="flex justify-between items-center bg-purple-600 text-white p-3 rounded-t-2xl">
              <h3 className="text-lg font-medium">Trivia Chat</h3>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-purple-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      m.role === "user"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* input */}
            <form
              onSubmit={sendMessage}
              className="border-t p-3 flex space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!input.trim()}
              >
                <Send size={18} />
              </Button>
            </form>
          </div>

          {/* little arrow under bubble */}
          <div className="absolute -bottom-1 right-8 w-4 h-4 bg-white rotate-45 shadow-lg" />
        </div>
      )}
    </>
  );
}
