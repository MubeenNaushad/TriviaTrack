import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactorGame from "./ReactorGame.jsx"
import ArrowGame   from "./ArrowGame.jsx"

export default function IndustryMenu() {
  const [currentScreen, setCurrentScreen] = useState("menu") // "menu", "reactor", "arrows"
  const navigate = useNavigate()


  if (currentScreen === "reactor") {
    return <ReactorGame onBackToMenu={() => setCurrentScreen("menu")} />
  }


  if (currentScreen === "arrows") {
    return <ArrowGame onBackToMenu={() => setCurrentScreen("menu")} />
  }

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-2xl w-full border border-gray-700">
     
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">GAME SELECTION</h1>
          <p className="text-gray-300 text-xl">Choose your challenge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <button
            onClick={() => setCurrentScreen("reactor")}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 shadow-lg border border-cyan-400"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-white mb-3">START REACTOR</h2>
              <p className="text-cyan-100 text-sm">
                Memory sequence game. Watch the pattern and repeat it exactly.
              </p>
            </div>
          </button>

 
          <button
            onClick={() => setCurrentScreen("arrows")}
            className="bg-gradient-to-br from-green-600 to-teal-700 hover:from-green-500 hover:to-teal-600 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 shadow-lg border border-green-400"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">✈️</div>
              <h2 className="text-2xl font-bold text-white mb-3">ARROW GRID</h2>
              <p className="text-green-100 text-sm">
                Fast reaction game. Identify arrow direction - pointing or moving.
              </p>
            </div>
          </button>
        </div>

 
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md border border-gray-600"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
