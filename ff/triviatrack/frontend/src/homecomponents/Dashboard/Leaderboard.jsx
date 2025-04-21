import { Trophy, Medal, User } from "lucide-react"

export default function Leaderboard() {
  const topPlayers = [
    { id: 1, name: "Arish Amin", rank: 1, score: 9850, quizzes: 42 },
    { id: 2, name: "Mubeen Naushad", rank: 2, score: 8720, quizzes: 38 },
    { id: 3, name: "Dr.Adeel Ansari", rank: 3, score: 8450, quizzes: 35 },
  ]

  const globalRankings = [
    { id: 1, name: "Arish Amin", quizzes: 42, points: 9850 },
    { id: 2, name: "Mubeen Naushad", quizzes: 38, points: 8720 },
    { id: 3, name: "Dr.Adeel Ansari", quizzes: 35, points: 8450 },
    { id: 4, name: "Ali", quizzes: 31, points: 7980 },
    { id: 5, name: "Shawn", quizzes: 29, points: 7650 },
    { id: 6, name: "Soban", quizzes: 27, points: 7320 },
    { id: 7, name: "Umer", quizzes: 25, points: 6890 },
    { id: 8, name: "Mahad", quizzes: 23, points: 6540 },
    { id: 9, name: "Waqas", quizzes: 21, points: 6210 },
    { id: 10, name: "Imran", quizzes: 19, points: 5980 },
  ]

  const categoryChampions = [
    { category: "Science", name: "Arish Amin", points: 2450 },
    { category: "Technology", name: "Mubeen Naushad", points: 2180 },
    { category: "History", name: "Dr.Adeel Ansari", points: 1950 },
    { category: "Geography", name: "Imran Ali", points: 1820 },
  ]

  const borderColors = ["#FFD700", "#C0C0C0", "#CD7F32"]

  return (
    <div className="min-h-screen bg-gray-100 text-black">

      <main className="max-w-6xl mx-auto px-4 py-8 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-gray-400">See how you stack up against other TriviaTrack players from around the world</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="flex items-end h-[350px]">
            <div className="p-6 rounded-lg border-4 w-full h-[300px]" style={{ borderColor: borderColors[1] }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <Medal className="h-5 w-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{topPlayers[1].name}</h3>
                  <p className="text-gray-400 text-sm">Rank #{topPlayers[1].rank}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-2xl font-bold">{topPlayers[1].score.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Quizzes</p>
                  <p className="text-2xl font-bold">{topPlayers[1].quizzes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end h-[350px]">
            <div className="p-6 rounded-lg border-4 w-full h-[350px]" style={{ borderColor: borderColors[0] }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{topPlayers[0].name}</h3>
                  <p className="text-gray-400 text-sm">Rank #{topPlayers[0].rank}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-2xl font-bold">{topPlayers[0].score.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Quizzes</p>
                  <p className="text-2xl font-bold">{topPlayers[0].quizzes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end h-[350px]">
            <div className="p-6 rounded-lg border-4 w-full h-[250px]" style={{ borderColor: borderColors[2] }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <Medal className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{topPlayers[2].name}</h3>
                  <p className="text-gray-400 text-sm">Rank #{topPlayers[2].rank}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-2xl font-bold">{topPlayers[2].score.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Quizzes</p>
                  <p className="text-2xl font-bold">{topPlayers[2].quizzes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Global Rankings</h2>

            <div className="space-y-4">
              {globalRankings.map((player) => (
                <div key={player.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className=" text-white">#{player.id}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{player.name}</p>
                      <p className=" text-xs text-white">{player.quizzes} quizzes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{player.points.toLocaleString()}</p>
                    <p className=" text-xs text-white">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">

            <div className="bg-gray-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Category Champions</h2>

              <div className="space-y-4">
                {categoryChampions.map((champion, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-md">
                    <p className="text-white text-sm">{champion.category}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-medium text-white">{champion.name}</p>
                      <p className="font-bold text-white">{champion.points.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>




          </div>
        </div>
      </main >

      <footer className="border-t border-gray-800 py-6 mt-16 text-center bg-gray-800 text-white">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <span className="font-bold">TriviaTrack</span>
        </div>
      </footer>
    </div >
  )
}
