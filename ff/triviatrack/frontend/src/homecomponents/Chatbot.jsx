import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, ChevronRight, Brain, MessageSquare, Check } from "lucide-react"

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState(null) 
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [currentSurveyQuestion, setCurrentSurveyQuestion] = useState(0)
    const [currentOptions, setCurrentOptions] = useState([])
    const messagesEndRef = useRef(null)
  
    const surveyQuestions = [
      {
        question: "Which subject area do you find most challenging?",
        options: ["Mathematics", "Science", "Language Arts", "History", "Computer Science"],
      },
      {
        question: "How engaging do you find our quiz challenges?",
        options: ["Very engaging", "Somewhat engaging", "Neutral", "Not very engaging", "Not engaging at all"],
      },
      {
        question: "How much time do you typically spend learning on our platform each day?",
        options: ["Less than 15 minutes", "15-30 minutes", "30-60 minutes", "1-2 hours", "More than 2 hours"],
      },
      {
        question: "Which game mechanics motivate you the most?",
        options: ["Points & Levels", "Badges & Achievements", "Leaderboards", "Progress Bars", "Rewards & Prizes"],
      },
      {
        question: "What type of learning content would you like to see more of?",
        options: ["Video Lessons", "Interactive Quizzes", "Practice Problems", "Group Challenges", "Educational Games"],
      },
    ]
  
    const dummyResponses = [
      "Great question! Our learning experts are here to help you succeed.",
      "That's an interesting point about learning. Have you tried our practice quizzes?",
      "I understand. Many users find that breaking study sessions into 25-minute blocks helps with retention.",
      "Thanks for sharing! Would you like me to recommend some learning paths based on your interests?",
      "I'm here to support your learning journey. What specific topic are you studying today?",
    ]
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, currentOptions])
  
    const toggleChat = () => {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setMode(null)
        setMessages([])
        setCurrentSurveyQuestion(0)
        setCurrentOptions([])
      }
    }
  
    const handleModeSelect = (selectedMode) => {
      setMode(selectedMode)
      setMessages([])
      setCurrentOptions([])
  
      if (selectedMode === "survey") {
        setMessages([
          {
            id: 1,
            role: "assistant",
            content:
              "Welcome to our learning assessment! I'll ask you a few questions to help personalize your learning experience.",
          },
        ])
  
        setTimeout(() => {
          setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", content: surveyQuestions[0].question }])
          setCurrentOptions(surveyQuestions[0].options)
        }, 500)
      } else {
        setMessages([
          {
            id: 1,
            role: "assistant",
            content: "Hello learner! How can I help with your educational journey today?",
          },
        ])
      }
    }
  
    const handleSendMessage = (e) => {
      e.preventDefault()
      if (!input.trim()) return
  
      const userMessage = { id: Date.now(), role: "user", content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
  
      setTimeout(() => {
        const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)]
        setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", content: randomResponse }])
      }, 1000)
    }
  
    const handleOptionSelect = (option) => {
      const userMessage = { id: Date.now(), role: "user", content: option }
      setMessages((prev) => [...prev, userMessage])
  
      setCurrentOptions([])
  
      setTimeout(() => {
        const nextQuestion = currentSurveyQuestion + 1
  
        if (nextQuestion < surveyQuestions.length) {
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: "assistant", content: surveyQuestions[nextQuestion].question },
          ])
          setCurrentOptions(surveyQuestions[nextQuestion].options)
          setCurrentSurveyQuestion(nextQuestion)
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              role: "assistant",
              content:
                "Thank you for completing the assessment! We'll use your feedback to personalize your learning experience and suggest areas where you might want to focus.",
            },
            {
              id: Date.now() + 1,
              role: "assistant",
              content: "Would you like to chat about any specific learning topics?",
            },
          ])
          setMode("chat") 
        }
      }, 1000)
    }
  
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
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[400px] max-h-[80vh]">
              <div className="bg-purple-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
                <h3 className="font-medium text-lg">Trivia Chat</h3>
                <button onClick={toggleChat} className="text-white hover:bg-purple-700 rounded-full p-1">
                  <X size={20} />
                </button>
              </div>
  
              <div className="flex-1 overflow-y-auto p-4">
                {mode === null ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <h3 className="text-lg font-medium text-center">How can I assist your learning today?</h3>
                    <Button
                      onClick={() => handleModeSelect("survey")}
                      className="w-full flex items-center justify-between"
                      variant="outline"
                    >
                      <div className="flex items-center gap-2">
                        <Brain size={18} />
                        <span>Learning Assessment</span>
                      </div>
                      <ChevronRight size={16} />
                    </Button>
                    <Button
                      onClick={() => handleModeSelect("chat")}
                      className="w-full flex items-center justify-between"
                      variant="outline"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare size={18} />
                        <span>Ask a Learning Expert</span>
                      </div>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user" ? "bg-purple-500 text-white" : "bg-gray-100"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
  
                    {mode === "survey" && currentOptions.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {currentOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <div className="w-5 h-5 rounded-full border border-purple-500 flex items-center justify-center flex-shrink-0">
                              <Check size={12} className="text-transparent" />
                            </div>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    )}
  
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
  
              {mode === "chat" && (
                <div className="border-t p-3">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
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
              )}
            </div>
  
            <div className="w-4 h-4 bg-white transform rotate-45 absolute -bottom-1 right-8 shadow-lg"></div>
          </div>
        )}
      </>
    )
  }
  