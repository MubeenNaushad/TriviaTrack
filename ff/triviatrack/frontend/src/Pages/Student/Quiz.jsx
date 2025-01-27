import React, { useState } from "react";

const QuizApp = () => {
  const [step, setStep] = useState(1); // Steps: 1 - Name Input, 2 - Quiz, 3 - Summary
  const [name, setName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
    },
    {
      id: 2,
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      id: 3,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
    },
  ];

  const handleStart = () => {
    if (name.trim()) {
      setError("");
      setStep(2);
    } else {
      setError("Please enter your name to start the quiz.");
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    console.log("Student Name:", name);
    console.log("Quiz Responses:", answers);
    alert("Your responses have been submitted! Check the console for details.");
    setStep(1);
    setName("");
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(3);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <div
            className={`h-2 w-1/2 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>
          <div
            className={`h-2 w-1/2 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Welcome to the Quiz
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your name to get started!
            </p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Start Quiz
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Hello, {name}!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <div className="mb-6">
              <p className="font-medium text-gray-700 mb-4">
                {questions[currentQuestionIndex].question}
              </p>
              {questions[currentQuestionIndex].options.map((option) => (
                <label
                  key={option}
                  className="block text-gray-600 bg-gray-100 border rounded-lg p-2 mt-2 cursor-pointer hover:bg-gray-200 transition"
                >
                  <input
                    type="radio"
                    name={`question-${questions[currentQuestionIndex].id}`}
                    value={option}
                    className="mr-2"
                    onChange={() =>
                      handleAnswerChange(questions[currentQuestionIndex].id, option)
                    }
                    checked={
                      answers[questions[currentQuestionIndex].id] === option
                    }
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`py-2 px-4 rounded-lg font-semibold transition ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Thank You, {name}!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              You have completed the quiz.
            </p>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Submit Responses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
