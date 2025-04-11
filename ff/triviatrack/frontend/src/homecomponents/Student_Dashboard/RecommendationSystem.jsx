"use client";

import React, { useState } from "react";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { ChevronDown, Home, BookOpen, Settings, MessageSquare, ArrowRight } from "lucide-react";
import Sidebar from "../Dashboard/Sidebar";

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Avatar Components
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100", className)}
        {...props}
    />
));
AvatarFallback.displayName = "AvatarFallback";

// Button Component
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
    <input
        type={type || "text"}
        className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        ref={ref}
        {...props}
    />
));
Input.displayName = "Input";

// Progress Component
const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-gray-500 transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";

// Badge Component
const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Dropdown Menu Components
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-in fade-in-80",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            className
        )}
        {...props}
    />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

// Main Application Component
export default function LearningPlatform() {
    // Navigation state
    const [activeNav, setActiveNav] = useState("home");

    // Chat state
    const [messages, setMessages] = useState([
        { id: 1, text: "What kind of courses are you interested in?", isBot: true },
    ]);
    const [inputMessage, setInputMessage] = useState("");


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
            image: "http://i.ytimg.com/vi/clHJ837DOi8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBzTT49zEtsK6Jz14z9LvihvzI4rw",
            category: "Data Science",
            progress: 98,
        },
    ]);

    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Recommended");


    const [userProgress, setUserProgress] = useState(65);


    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const newMessages = [
            ...messages,
            { id: Date.now(), text: inputMessage, isBot: false },
        ];
        setMessages(newMessages);
        setInputMessage("");

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponses = [
                "I recommend checking out our React courses for web development.",
                "Have you considered our UX Design course? It's very popular.",
                "Based on your interests, our Data Science track might be perfect for you.",
                "We have several new courses that match your learning history.",
            ];
            const randomResponse =
                botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages([...newMessages, { id: Date.now() + 1, text: randomResponse, isBot: true }]);
        }, 1000);
    };

    // Start a course
    const startCourse = (courseId) => {
        setCourses(
            courses.map((course) =>
                course.id === courseId ? { ...course, progress: 10 } : course
            )
        );
        setUserProgress(Math.min(userProgress + 5, 100));
    };

    return (

        <div className="flex pt-[1.4rem] mt-6">
            <Sidebar />


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Section */}
                <div className="p-6 border-b flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={20} />
                        <h2 className="text-xl font-bold">CHAT</h2>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-4 max-h-60 overflow-y-auto space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.isBot ? "bg-gray-100 text-gray-800" : "bg-gray-700 text-white"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Type a message..."
                                className="pr-12 rounded-full border-gray-300"
                            />
                            <Button
                                variant="ghost"
                                onClick={handleSendMessage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 flex items-center justify-center"
                            >
                                <ArrowRight className="h-5 w-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </div>
                    </div>
                </div>


                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">RECOMMENDATIONS</h2>
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1 border-gray-300">
                                        <span>Category: {activeCategory}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {["All", "Programming", "Design", "Data Science", "Business"].map((category) => (
                                        <DropdownMenuItem key={category} onClick={() => setActiveCategory(category)}>
                                            {category}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1 border-gray-300">
                                        <span>Sort: {sortBy}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {["Recommended", "Newest", "Popular", "In Progress"].map((option) => (
                                        <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {courses
                            .filter((course) => activeCategory === "All" || course.category === activeCategory)
                            .map((course) => (
                                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="flex gap-4 p-4">
                                            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                <img
                                                    src={course.image || "/placeholder.svg"}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-lg font-medium mb-1">{course.title}</h3>
                                                    <Badge variant="outline">{course.category}</Badge>
                                                </div>
                                                <p className="text-gray-600 mb-3">{course.description}</p>

                                                {course.progress > 0 ? (
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between text-sm">
                                                            <span>Progress</span>
                                                            <span>{course.progress}%</span>
                                                        </div>
                                                        <Progress value={course.progress} className="h-2" />
                                                    </div>
                                                ) : (
                                                    <Button
                                                        onClick={() => startCourse(course.id)}
                                                        className="h-9 px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
                                                    >
                                                        Start Course
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>

            <div className="w-96I recommend checking out our React courses for web development. border-l">

                <div className="p-4 border-b flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>W</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">Wasim</p>
                        <p className="text-sm text-gray-500">Student</p>
                    </div>
                </div>


                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold mb-4">USER PROGRESS</h2>
                    <div className="space-y-1 mb-4">
                        <div className="flex justify-between text-sm">
                            <span>Overall completion</span>
                            <span>{userProgress}%</span>
                        </div>
                        <Progress value={userProgress} className="h-6" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span>Courses completed</span>
                            <span>2/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Certificates earned</span>
                            <span>1</span>
                        </div>
                    </div>
                </div>


                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">PERSONALIZED TIPS</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="mr-2 text-lg">•</span>
                            <p className="text-sm">Complete the React course to earn your front-end developer certificate.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-lg">•</span>
                            <p className="text-sm">Try practicing daily to improve your learning retention.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
