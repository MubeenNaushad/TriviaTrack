import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Save } from "lucide-react"
import QuestionEditor from "./question-editor"
import QuizPreview from "./quiz-preview"
import Sidebars from "../Dashboard/Sidebar.jsx"
import { motion } from "framer-motion"

export default function QuizBuilder() {
    const [quizTitle, setQuizTitle] = useState("")
    const [quizDescription, setQuizDescription] = useState("")
    const [questions, setQuestions] = useState([])
    const [activeTab, setActiveTab] = useState("edit")

    // Load draft from localStorage
    useEffect(() => {
        const draft = localStorage.getItem("quiz-draft")
        if (draft) {
            const { quizTitle, quizDescription, questions } = JSON.parse(draft)
            setQuizTitle(quizTitle)
            setQuizDescription(quizDescription)
            setQuestions(questions)
        }
    }, [])

    // Save draft on changes
    useEffect(() => {
        localStorage.setItem(
            "quiz-draft",
            JSON.stringify({ quizTitle, quizDescription, questions })
        )
    }, [quizTitle, quizDescription, questions])

    const addQuestion = () => {
        const timestamp = Date.now()
        const newQuestion = {
            id: `q-${timestamp}`,
            text: "",
            type: "multiple-choice",
            options: [
                { id: `opt-${timestamp}-1`, text: "", isCorrect: false },
                { id: `opt-${timestamp}-2`, text: "", isCorrect: false },
            ],
        }
        setQuestions([...questions, newQuestion])
    }

    const updateQuestion = (updatedQuestion) => {
        setQuestions(
            questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        )
    }

    const removeQuestion = (questionId) => {
        setQuestions(questions.filter((q) => q.id !== questionId))
    }

    const handleSave = () => {
        console.log("Saving quiz:", { quizTitle, quizDescription, questions })
        alert("Quiz saved successfully!")
    }

    return (
        <div className="flex pt-[1.4rem] mt-6">
            <Sidebars />
            <div className="flex-1 max-w-5xl mx-auto mt-28 px-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Trivia Track Quiz</h1>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="edit">Edit Quiz</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="edit">
                        <Card className="mb-6 shadow-md rounded-xl border border-gray-200">
                            <CardContent className="pt-6 space-y-6">
                                <div>
                                    <label htmlFor="quiz-title" className="block text-sm font-medium mb-1">
                                        Quiz Title
                                    </label>
                                    <Input
                                        id="quiz-title"
                                        placeholder="Enter quiz title"
                                        value={quizTitle}
                                        onChange={(e) => setQuizTitle(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="quiz-description" className="block text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <Textarea
                                        id="quiz-description"
                                        placeholder="Enter quiz description"
                                        value={quizDescription}
                                        onChange={(e) => setQuizDescription(e.target.value)}
                                        className="w-full"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Questions</h2>
                                <Button onClick={addQuestion} variant="outline">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                                </Button>
                            </div>

                            {questions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg text-gray-500">
                                    <PlusCircle className="h-6 w-6 mb-2" />
                                    <p>No questions yet. Click "Add Question" to get started.</p>
                                </div>
                            ) : (
                                questions.map((question, index) => (
                                    <motion.div
                                        key={question.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <QuestionEditor
                                            question={question}
                                            questionNumber={index + 1}
                                            onUpdate={updateQuestion}
                                            onRemove={removeQuestion}
                                        />
                                    </motion.div>
                                ))
                            )}

                            {questions.length > 0 && (
                                <div className="sticky bottom-6 z-10 bg-white py-4 border-t mt-6 flex justify-end">
                                    <Button onClick={handleSave} className="px-6 bg-green-600 hover:bg-green-700 text-white">
                                        <Save className="mr-2 h-4 w-4" /> Save Quiz
                                    </Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="preview">
                        <QuizPreview
                            title={quizTitle}
                            description={quizDescription}
                            questions={questions}
                        />
                        <div className="flex justify-between mt-6">
                            <Button variant="outline" onClick={() => setActiveTab("edit")} className="px-6">
                                Back to Editor
                            </Button>
                            <Button onClick={handleSave} className="px-6">
                                <Save className="mr-2 h-4 w-4" /> Save Quiz
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}