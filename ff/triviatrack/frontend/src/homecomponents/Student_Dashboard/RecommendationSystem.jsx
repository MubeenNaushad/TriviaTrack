import React, { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "bg-gray-800  text-white px-4 py-2 rounded-3xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, onKeyPress }) => (
  <input
    value={value}
    onChange={onChange}
   
    placeholder={placeholder}
    className="border rounded-full px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-100 rounded-full h-4">
    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${value}%` }}></div>
  </div>
);

const Avatar = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-10 w-10 rounded-full object-cover" />
);

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function LearningPlatform() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm TriviaTrack Recommendation assistant. I can help you with course recommendations, answer questions about programming, design, data science, and more. What would you like to learn about today?",
      isBot: true,
    },
  ]);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the fundamentals of React and build interactive UIs",
      image: "https://cdn.worldvectorlogo.com/logos/react-1.svg",
      category: "Programming",
      progress: 0,
    },
    {
      id: 2,
      title: "UX Design Principles",
      description: "Master the core principles of user experience design",
      image: "https://www.creative-tim.com/blog/content/images/2022/07/UX-design-courses.jpg",
      category: "Design",
      progress: 25,
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Explore data analysis and machine learning concepts",
      image: "http://i.ytimg.com/vi/clHJ837DOi8/hq720.jpg",
      category: "Data Science",
      progress: 98,
    },
  ]);
  const [userProgress, setUserProgress] = useState(65);

  const getAIResponse = async (userMessage) => {
    if (!OPENAI_API_KEY) return "API key missing. Configure VITE_OPENAI_API_KEY in your .env.";

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI learning assistant for an educational platform called TriviaTrack. You help students with course recommendations, learning tips, and subject help. Courses: 1. React (Programming), 2. UX Design (Design), 3. Data Science (Data Science), 4. Python (Programming) and many more. Always encourage students and be friendly!",
            },
            { role: "user", content: userMessage },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorMsg = {
          401: "Invalid API key.",
          429: "Rate limit reached.",
          403: "Access denied. Check your API permissions.",
        }[res.status] || "Something went wrong.";
        return errorMsg;
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || "Invalid response from OpenAI.";
    } catch (err) {
      const fallback = [
        "🤖 I'm having trouble. Try exploring React, UX Design, or Data Science courses!",
        "⚠️ AI is down. Check out our React course to begin your coding journey!",
      ];
      return fallback[Math.floor(Math.random() * fallback.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    const userMsg = { id: Date.now(), text: userMessage, isBot: false };
    setMessages((msgs) => [...msgs, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    const aiResponse = await getAIResponse(userMessage);
    const botMsg = { id: Date.now() + 1, text: aiResponse, isBot: true };
    setMessages((msgs) => [...msgs, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startCourse = (id) => {
    setCourses((c) => c.map((course) => (course.id === id ? { ...course, progress: 10 } : course)));
    setUserProgress((p) => Math.min(p + 5, 100));
  };

  return (
    <div className="flex pt-6 mt-6">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} />
            <h2 className="text-xl font-bold">TriviaTrack Assistant</h2>
            <span className={`text-xs px-2 py-1 rounded ${OPENAI_API_KEY ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {OPENAI_API_KEY ? "TriviaTrack Connected" : "API Key Missing"}
            </span>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="mb-4 space-y-3 max-h-60 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] ${msg.isBot ? "bg-blue-50 text-gray-800 border border-blue-200" : "bg-gray-700 text-white"}`}>
                    {msg.isBot && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-blue-600">OpenAI Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-blue-600">OpenAI Assistant</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask OpenAI anything..." />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="absolute bottom-0 top-0 right-2  px-2 py-1">
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {["I'm a beginner, what should I learn?", "Help me choose between React and Angular", "What's the best way to learn programming?", "Create a learning roadmap for me"].map((text, i) => (
                <button
                  key={i}
                  onClick={() => setInputMessage(text)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
                  disabled={isTyping}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recommendations</h2>
            <div className="flex gap-4">
              <select className="border rounded px-2" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                {["All", "Programming", "Design", "Data Science", "Business"].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <select className="border rounded px-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {["Recommended", "Newest", "Popular", "In Progress"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {courses.filter((c) => activeCategory === "All" || c.category === activeCategory).map((course) => (
              <div key={course.id} className="border rounded-md p-4 flex gap-4 hover:shadow-md">
                <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{course.title}</h3>
                  <p className="text-gray-500 mb-2">{course.description}</p>
                  {course.progress > 0 ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} />
                    </div>
                  ) : (
                    <Button onClick={() => startCourse(course.id)}>Start Course</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-96 border-l p-6 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <Avatar src="/placeholder.svg" alt="User" />
          <div>
            <p className="font-medium">Student</p>
            <p className="text-sm text-gray-500">Learning Journey</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <h2 className="text-lg font-bold mb-2">User Progress</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall completion</span>
              <span>{userProgress}%</span>
            </div>
            <ProgressBar value={userProgress} />
            <div className="flex justify-between text-sm mt-2">
              <span>Courses completed</span>
              <span>2/5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Certificates earned</span>
              <span>1</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">AI-Powered Tips</h2>
          <ul className="space-y-2 text-sm">
            <li>🤖 Ask the AI specific questions for personalized help</li>
            <li>📚 Get course recommendations based on your goals</li>
            <li>🎯 Request custom learning roadmaps</li>
            <li>💡 Ask for coding help and explanations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
