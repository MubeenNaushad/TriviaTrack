import { useState, useEffect, useCallback, useRef } from "react";

export default function ArrowGame({ onBackToMenu }) {
  const [gameState, setGameState] = useState("idle"); // "idle", "playing", "finished"
  const [questionType, setQuestionType] = useState(""); // "pointing" or "moving"
  const [pointingDirection, setPointingDirection] = useState("");
  const [movingDirection, setMovingDirection] = useState("");
  const [showingArrows, setShowingArrows] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [canAnswer, setCanAnswer] = useState(false);
  const hasSubmittedRef = useRef(false);

  const directions   = ["up", "down", "left", "right"];
  const arrowSymbols = { up: "↑", down: "↓", left: "←", right: "→" };

  // Start new question
  const startNewQuestion = useCallback(() => {
    if (gameTimeLeft <= 0) {
      setGameState("finished");
      return;
    }

    const type     = Math.random() < 0.5 ? "pointing" : "moving";
    const pointing = directions[Math.floor(Math.random() * 4)];
    const moving   = directions[Math.floor(Math.random() * 4)];

    setQuestionType(type);
    setPointingDirection(pointing);
    setMovingDirection(moving);
    setShowingArrows(true);
    setQuestionTimeLeft(3);
    setFeedback("");
    setCanAnswer(true);
  }, [gameTimeLeft]);

  // Handle question timeout
  const handleQuestionTimeout = useCallback(() => {
    if (!canAnswer) return;
    setFeedback("TOO SLOW!");
    setScore((prev) => Math.max(0, prev - 2));
    setShowingArrows(false);
    setCanAnswer(false);
    setTimeout(() => {
      setFeedback("");
      startNewQuestion();
    }, 800);
  }, [canAnswer, startNewQuestion]);

  // Game timer (90s)
  useEffect(() => {
    if (gameTimeLeft > 0 && gameState === "playing") {
      const t = setTimeout(() => setGameTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
    if (gameTimeLeft === 0 && gameState === "playing") {
      setGameState("finished");
    }
  }, [gameTimeLeft, gameState]);

  // Question timer (3s)
  useEffect(() => {
    if (questionTimeLeft > 0 && showingArrows && gameState === "playing") {
      const t = setTimeout(() => setQuestionTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
    if (questionTimeLeft === 0 && showingArrows && gameState === "playing") {
      handleQuestionTimeout();
    }
  }, [questionTimeLeft, showingArrows, gameState, handleQuestionTimeout]);

  // Key handling
  const handleKeyPress = useCallback(
    (e) => {
      if (!canAnswer || !showingArrows || gameState !== "playing") return;
      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const pressed = map[e.key];
      if (!pressed) return;

      const correct = questionType === "pointing"
        ? pointingDirection
        : movingDirection;

      if (pressed === correct) {
        setScore((p) => p + 10);
        setFeedback("CORRECT!");
      } else {
        setScore((p) => Math.max(0, p - 5));
        setFeedback("WRONG!");
      }

      setCanAnswer(false);
      setShowingArrows(false);
      setQuestionTimeLeft(0);
      setTimeout(() => {
        setFeedback("");
        startNewQuestion();
      }, 500);
    },
    [canAnswer, showingArrows, gameState, questionType, pointingDirection, movingDirection, startNewQuestion]
  );

  useEffect(() => {
    if (gameState === "playing") {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [gameState, handleKeyPress]);

  // Kick off first question
  useEffect(() => {
    if (gameState === "playing" && gameTimeLeft === 90 && !showingArrows) {
      startNewQuestion();
    }
  }, [gameState, gameTimeLeft, showingArrows, startNewQuestion]);

  // Start/reset
  function startGame() {
    setGameState("playing");
    setGameTimeLeft(90);
    setScore(0);
    setFeedback("");
    setShowingArrows(false);
    setCanAnswer(false);
    hasSubmittedRef.current = false;
  }
  function resetGame() {
    setGameState("idle");
    setGameTimeLeft(0);
    setQuestionTimeLeft(0);
    setScore(0);
    setFeedback("");
    setShowingArrows(false);
    setCanAnswer(false);
  }

  // Movement animation class
  function getMovementClass() {
    switch (movingDirection) {
      case "up":    return "animate-march-up";
      case "down":  return "animate-march-down";
      case "left":  return "animate-march-left";
      case "right": return "animate-march-right";
      default:      return "";
    }
  }

  // Submit score once, on finish
  useEffect(() => {
    if (gameState === "finished" && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      fetch("/api/game/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ score, gameType: "arrow" }),
      }).catch(console.error);
    }
  }, [gameState, score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
      {/* Inline keyframes */}
      <style>{`
        @keyframes march-up    { 0% { transform: translateY(60px); } 100% { transform: translateY(-60px); } }
        @keyframes march-down  { 0% { transform: translateY(-60px); } 100% { transform: translateY(60px); } }
        @keyframes march-left  { 0% { transform: translateX(60px); } 100% { transform: translateX(-60px); } }
        @keyframes march-right { 0% { transform: translateX(-60px); } 100% { transform: translateX(60px); } }
        .animate-march-up    { animation: march-up 2s linear infinite; }
        .animate-march-down  { animation: march-down 2s linear infinite; }
        .animate-march-left  { animation: march-left 2s linear infinite; }
        .animate-march-right { animation: march-right 2s linear infinite; }
      `}</style>

      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-gray-700">
        {/* Header */}
        <div className="relative text-center mb-8">
          <button
            onClick={onBackToMenu}
            className="absolute left-0 top-0 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-2">ARROW GRID</h1>
          {gameState === "playing" && (
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              TIME: {Math.floor(gameTimeLeft / 60)}:
              {(gameTimeLeft % 60).toString().padStart(2, "0")}
            </div>
          )}
          {gameState === "playing" && (
            <div className="absolute top-0 right-0 bg-gray-700 rounded-lg px-4 py-2 border border-green-400">
              <div className="text-green-400 font-bold">POINTS</div>
              <div className="text-white text-xl">{score}</div>
            </div>
          )}
        </div>

        {/* Game Area */}
        {gameState === "playing" && (
          <>
            <div className="flex justify-center mb-8">
              <div className="bg-black rounded-xl p-6 border-2 border-gray-600 overflow-hidden">
                {showingArrows ? (
                  <div className="grid grid-cols-5 gap-1 w-80 h-80 p-4">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 flex items-center justify-center text-4xl ${getMovementClass()}`}
                      >
                        <span className="text-yellow-400 drop-shadow-lg">
                          {arrowSymbols[pointingDirection]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-80 h-80 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">Get Ready...</span>
                  </div>
                )}
              </div>
            </div>

            {showingArrows && (
              <div className="text-center mb-6">
                {questionType === "pointing" ? (
                  <p className="text-green-400 text-xl font-semibold">
                    Which direction are the arrows POINTING?
                  </p>
                ) : (
                  <p className="text-blue-400 text-xl font-semibold">
                    Which direction are the arrows MOVING?
                  </p>
                )}
              </div>
            )}

            {questionTimeLeft > 0 && showingArrows && (
              <div className="text-center mb-4">
                <div className="text-orange-400 text-2xl font-bold">
                  Next in: {questionTimeLeft}s
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="inline-block bg-purple-700 text-purple-200 px-6 py-3 rounded-full font-bold text-lg border border-purple-500">
                TYPE: {questionType.toUpperCase()}
              </div>
            </div>
          </>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-6">
            <span
              className={`text-2xl font-bold ${
                feedback === "CORRECT!" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback}
            </span>
          </div>
        )}

        {/* Controls */}
        {gameState === "idle" && (
          <div className="text-center">
            <div className="text-gray-300 text-lg mb-6">
              <p className="mb-2">Watch the marching arrows!</p>
              <p className="mb-2">You have <strong>90 seconds</strong> total.</p>
              <p className="mb-2">
                Questions change every <strong>3 seconds</strong>.
              </p>
              <p className="mb-2">• POINTING: Answer arrow symbol direction</p>
              <p>• MOVING: Answer movement direction</p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg border border-green-400"
            >
              START GAME
            </button>
          </div>
        )}

        {/* Results */}
        {gameState === "finished" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              TIME'S UP!
            </h2>
            <div className="text-2xl font-bold text-white mb-6">
              Final Score: {score}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onBackToMenu}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg"
              >
                MAIN MENU
              </button>
            </div>
          </div>
        )}

        {/* HelpTip */}
        {gameState === "playing" && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Use arrow keys: ↑ ↓ ← → to respond
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
