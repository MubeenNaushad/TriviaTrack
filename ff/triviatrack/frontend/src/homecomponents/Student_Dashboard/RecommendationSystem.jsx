import React, { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import StudentSidebar from "./StudentSidebar";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({ children, onClick, className = "" }) => (
    <button onClick={onClick} className={cn("bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700", className)}>
        {children}
    </button>
);

const Input = ({ value, onChange, placeholder }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-full px-4 py-2 w-full text-sm"
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

export default function LearningPlatform() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Recommended");
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "What kind of courses are you interested in?", isBot: true },
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

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessages = [...messages, { id: Date.now(), text: inputMessage, isBot: false }];
        setMessages(newMessages);
        setInputMessage("");

        setTimeout(() => {
            const botReplies = [
                "Check out React courses!",
                "UX Design course is very popular.",
                "Data Science track could be great!",
            ];
            const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
            setMessages([...newMessages, { id: Date.now() + 1, text: reply, isBot: true }]);
        }, 800);
    };

    const startCourse = (courseId) => {
        setCourses(courses.map((c) => (c.id === courseId ? { ...c, progress: 10 } : c)));
        setUserProgress((prev) => Math.min(prev + 5, 100));
    };

    return (
        <div className="flex pt-6 mt-6">
            <StudentSidebar />

            <div className="flex-1 flex flex-col">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={20} />
                        <h2 className="text-xl font-bold">Chat</h2>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-4 space-y-3 max-h-60 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                                    <div className={`p-3 rounded-2xl max-w-[80%] ${msg.isBot ? "bg-gray-100 text-gray-800" : "bg-gray-700 text-white"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative">
                            <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." />
                            <Button onClick={handleSendMessage} className="absolute right-2 top-2">
                                <ArrowRight size={18} />
                            </Button>
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
                        {courses
                            .filter((c) => activeCategory === "All" || c.category === activeCategory)
                            .map((course) => (
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
                        <p className="font-medium">Wasim</p>
                        <p className="text-sm text-gray-500">Student</p>
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
                    <h2 className="text-lg font-bold mb-2">Personalized Tips</h2>
                    <ul className="space-y-2 text-sm">
                        <li>• Complete the React course to earn your certificate.</li>
                        <li>• Practice daily to improve retention.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
