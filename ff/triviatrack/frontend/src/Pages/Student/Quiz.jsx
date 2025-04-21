import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const defaultQuestions = [
  {
    questionText: "What is the capital of France?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    answerOptions: [
      { answerText: "Earth", isCorrect: false },
      { answerText: "Mars", isCorrect: true },
      { answerText: "Jupiter", isCorrect: false },
      { answerText: "Venus", isCorrect: false },
    ],
  },
  {
    questionText: "Who wrote 'Hamlet'?",
    answerOptions: [
      { answerText: "Charles Dickens", isCorrect: false },
      { answerText: "William Shakespeare", isCorrect: true },
      { answerText: "J.K. Rowling", isCorrect: false },
      { answerText: "Leo Tolstoy", isCorrect: false },
    ],
  },
];

export const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [questions, setQuestions] = useState(defaultQuestions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startQuiz = () => {
    if (playerName.trim() !== "") {
      setHasStarted(true);
    }
  };

  useEffect(() => {
    if (!courseId) {
      // no courseId → stick with defaultQuestions
      return;
    }

    const fetchQuizByCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await axios.get(
          `${
            import.meta.env.VITE_APP_BASEURL
          }/api/quizzes/from-course/${courseId}`
        );
        const apiQs = resp.data.questions;
        if (Array.isArray(apiQs) && apiQs.length > 0) {
          const uiQs = apiQs.map((q) => ({
            questionText: q.text,
            answerOptions: q.options.map((opt) => ({
              answerText: opt.text,
              isCorrect: opt.isCorrect,
            })),
          }));
          setQuestions(uiQs);
        } else {
        }
      } catch (err) {
        console.error("Failed to fetch quiz for course", courseId, err);
        setError("Couldn’t load quiz for that course, using default quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizByCourse();
  }, [courseId]);

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);

    const nextQuestionIndex = currentQuestion + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswer = (index, isCorrect) => {
    setAnswered(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-lg flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src="\src\assets\Quiz.png"
            alt="Quiz Illustration"
            className="w-100 h-auto"
          />
        </div>

        {/* Right Side - Quiz Content */}
        <div className="w-full md:w-2/3 p-4">
          <div className="p-2 text-center font-bold mb-4 text-2xl">
            TriviaTrack Quiz
          </div>

          {!hasStarted ? (
            // Enter Name Screen
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Enter Your Name to Start
              </h2>
              <input
                type="text"
                className="w-full p-3 border rounded mt-4 text-center"
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                onClick={startQuiz}
                className={`block w-full bg-gray-800 text-white py-3 mt-4 rounded ${
                  playerName.trim()
                    ? "hover:bg-gray-900"
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!playerName.trim()}
              >
                Start Quiz
              </button>
            </div>
          ) : showScore ? (
            // Score Screen
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                Thank You, {playerName}!
              </h2>
              <p className="text-lg mt-2">
                You scored <span className="font-bold">{score}</span> out of{" "}
                {questions.length}
              </p>
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-800 text-white px-4 py-2 mt-4 mx-24 rounded hover:bg-gray-900"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={() => navigate("/students/dashboard")}
                  className="bg-gray-800 text-white px-4 py-2 mt-4 mx-24 rounded hover:bg-gray-900"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            // Quiz Screen
            <div>
              <div className="w-full block p-2 text-lg text-center font-semibold">
                {questions[currentQuestion].questionText}
              </div>

              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index, option.isCorrect)}
                  className={`block w-full p-3 mt-3 rounded border text-lg transition ${
                    answered
                      ? option.isCorrect
                        ? "bg-green-400"
                        : selectedAnswer === index
                        ? "bg-red-400"
                        : ""
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {option.answerText}
                </button>
              ))}

              <button
                disabled={!answered}
                onClick={nextQuestion}
                className={`block w-full text-white text-lg py-3 mt-6 rounded ${
                  answered ? "bg-green-500 hover:bg-green-600" : "bg-green-300"
                }`}
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </button>

              <p className="text-gray-600 block w-full text-center mt-3">
                {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
