"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function QuizPreview({ title, description, questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)

    const handleAnswer = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId,
        })
    }

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowResults(true)
        }
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
    }

    const calculateScore = () => {
        let correctAnswers = 0
        questions.forEach((question) => {
            const selectedOptionId = answers[question.id]
            const correctOption = question.options.find((opt) => opt.isCorrect)
            if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
                correctAnswers++
            }
        })
        return correctAnswers
    }

    if (questions.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">No questions to preview. Add some questions first.</p>
            </div>
        )
    }

    if (showResults) {
        const score = calculateScore()
        return (
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-2">
                            {score} / {questions.length}
                        </div>
                        <p className="text-lg">
                            You got {score} out of {questions.length} questions correct!
                        </p>
                    </div>


                    <div className="space-y-6">
                        {questions.map((question, index) => {
                            const selectedOptionId = answers[question.id]
                            const correctOption = question.options.find(opt => opt.isCorrect)
                            return (
                                <div key={question.id} className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">
                                        {index + 1}. {question.text}
                                    </h3>
                                    <ul className="space-y-2">
                                        {question.options.map(option => (
                                            <li
                                                key={option.id}
                                                className={`p-3 rounded-md border ${option.id === correctOption.id
                                                    ? "bg-green-100 border-green-500"
                                                    : option.id === selectedOptionId
                                                        ? "bg-red-100 border-red-500"
                                                        : "border-gray-200"
                                                    }`}
                                            >
                                                {option.text}
                                                {option.id === correctOption.id && " ✅"}
                                                {option.id === selectedOptionId && option.id !== correctOption.id && " ❌"}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>

                    <Button onClick={restartQuiz} className="w-full">
                        Restart Quiz
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const question = questions[currentQuestion]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{title || "Untitled Quiz"}</CardTitle>
                    {description && <p className="mt-2">{description}</p>}
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex justify-between items-center">
                        <span className="text-sm font-medium">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                            }}
                        ></div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">{question.text}</h3>

                        <RadioGroup
                            value={answers[question.id] || ""}
                            onValueChange={(value) => handleAnswer(question.id, value)}
                            className="space-y-3"
                        >
                            {question.options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleAnswer(question.id, option.id)}
                                >
                                    <RadioGroupItem value={option.id} id={option.id} className="border-gray-400" />
                                    <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                                        {option.text}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                    Previous
                </Button>
                <Button onClick={nextQuestion} disabled={!answers[question.id]}>
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </Button>
            </div>
        </div>
    )
}
