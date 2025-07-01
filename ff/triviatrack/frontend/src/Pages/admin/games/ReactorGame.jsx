import { useState, useEffect, useCallback, useRef } from "react";

export default function ReactorGame({ onBackToMenu }) {
  const [gameState, setGameState] = useState("idle"); // "idle","showing","waiting","finished"
  const [sequence, setSequence] = useState([]);
  const [userClicks, setUserClicks] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSquare, setActiveSquare] = useState(null);
  const [points, setPoints] = useState(0);
  const hasSubmittedRef = useRef(false);

  
  const showSequence = useCallback(() => {
    if (currentStep >= sequence.length) {
      setTimeout(() => {
        setGameState("waiting");
        setCurrentStep(0);
      }, 500);
      return;
    }
    const sq   = sequence[currentStep];
    const prev = currentStep > 0 ? sequence[currentStep - 1] : null;
    const same = prev === sq;

    setTimeout(() => {
      setActiveSquare(sq);
      if (same) {
        setTimeout(() => {
          setActiveSquare(null);
          setTimeout(() => {
            setActiveSquare(sq);
            setTimeout(() => {
              setActiveSquare(null);
              setCurrentStep((p) => p + 1);
            }, 400);
          }, 200);
        }, 400);
      } else {
        setTimeout(() => {
          setActiveSquare(null);
          setCurrentStep((p) => p + 1);
        }, 500);
      }
    }, 800);
  }, [currentStep, sequence]);


  useEffect(() => {
    if (gameState === "showing" && currentStep < sequence.length) {
      showSequence();
    } else if (gameState === "showing" && currentStep >= sequence.length) {
      setTimeout(() => {
        setGameState("waiting");
        setCurrentStep(0);
      }, 500);
    }
  }, [gameState, currentStep, sequence.length, showSequence]);


  function startGame() {
    const newSeq = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 9)
    );
    setSequence(newSeq);
    setUserClicks([]);
    setCurrentStep(0);
    setPoints(0);
    setGameState("showing");
    hasSubmittedRef.current = false;
  }

 
  function handleSquareClick(i) {
    if (gameState !== "waiting") return;

    const clicks = [...userClicks, i];
    setUserClicks(clicks);

    if (i !== sequence[clicks.length - 1]) {
      setPoints((p) => Math.max(0, p - 25));
      setGameState("finished");
      return;
    }

    setPoints((p) => p + 10);
    if (clicks.length === sequence.length) {
      setPoints((p) => p + 50);
      setTimeout(() => setGameState("finished"), 1000);
    }
  }


  function resetGame() {
    setGameState("idle");
    setSequence([]);
    setUserClicks([]);
    setCurrentStep(0);
    setActiveSquare(null);
    setPoints(0);
  }

  
  useEffect(() => {
    if (gameState === "finished" && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      fetch("/api/game/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ score: points, gameType: "reactor" }),
      }).catch(console.error);
    }
  }, [gameState, points]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-6xl w-full border border-gray-700">
     
        <div className="relative text-center mb-8">
          <button
            onClick={onBackToMenu}
            className="absolute left-0 top-0 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">START REACTOR</h1>
          <div className="text-xl text-yellow-400">
            SEQUENCE LENGTH: {sequence.length}
          </div>
          <div className="absolute top-0 right-0 bg-gray-700 rounded-lg px-4 py-2 border border-cyan-400">
            <div className="text-cyan-400 font-bold">POINTS</div>
            <div className="text-white text-xl">{points}</div>
          </div>
        </div>

      
        <div className="flex justify-center items-start gap-12 mb-8">
       
          <div className="text-center">
            <h3 className="text-lg text-gray-300 mb-4">SEQUENCE DISPLAY</h3>
            <div className="bg-black rounded-xl p-6 border-2 border-gray-600">
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      activeSquare === i
                        ? "bg-cyan-400 border-cyan-300 shadow-lg"
                        : "bg-gray-900 border-gray-700"
                    }`}
                  >
                    {activeSquare === i && (
                      <div className="w-8 h-8 bg-cyan-300 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

      
          <div className="text-center">
            <h3 className="text-lg text-gray-300 mb-4">CONTROL PANEL</h3>
            <div className="bg-gray-700 rounded-xl p-6 border-2 border-gray-500">
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSquareClick(i)}
                    disabled={gameState !== "waiting"}
                    className={`w-16 h-16 rounded-lg border-3 font-bold text-lg transition-all duration-200 transform ${
                      userClicks[userClicks.length - 1] === i && gameState === "waiting"
                        ? "bg-green-500 border-green-400 scale-110 shadow-lg"
                        : gameState === "waiting"
                        ? "bg-blue-600 border-blue-500 hover:bg-blue-500 hover:scale-105 text-white cursor-pointer"
                        : "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

     
        <div className="text-center mb-6">
          {gameState === "idle" && (
            <div>
              <p className="text-gray-300 text-lg mb-2">
                Watch the sequence on the left,
              </p>
              <p className="text-gray-300 text-lg">
                then repeat it on the right!
              </p>
            </div>
          )}
          {gameState === "showing" && (
            <p className="text-cyan-400 text-xl font-semibold animate-pulse">
              SHOWING SEQUENCE... ({currentStep}/{sequence.length})
            </p>
          )}
          {gameState === "waiting" && (
            <p className="text-green-400 text-xl font-semibold">
              ENTER SEQUENCE ({userClicks.length}/{sequence.length})
            </p>
          )}
          {gameState === "finished" && (
            <div>
              {userClicks.length === sequence.length ? (
                <>
                  <p className="text-green-400 text-2xl font-bold mb-2">
                    REACTOR STARTED!
                  </p>
                  <p className="text-gray-300">Perfect sequence!</p>
                </>
              ) : (
                <>
                  <p className="text-red-400 text-2xl font-bold mb-2">
                    REACTOR FAILED!
                  </p>
                  <p className="text-gray-300">Wrong sequence</p>
                </>
              )}
            </div>
          )}
        </div>

   
        <div className="flex justify-center space-x-4">
          {gameState === "idle" && (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg border border-cyan-400"
            >
              START REACTOR
            </button>
          )}
          {gameState === "finished" && (
            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg"
              >
                TRY AGAIN
              </button>
              <button
                onClick={onBackToMenu}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg"
              >
                MAIN MENU
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
