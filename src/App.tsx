import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameModal from "@/components/GameModal";
import DifficultySelector from "@/components/DifficultySelector";
import { useMemoryGame } from "@/hooks/use-memory-game";
import { formatTime } from "./lib/formatTime";

function App() {
  const difficulty = "easy";

  const { cards, moves, time, gameCompleted, handleCardClick, resetGame } =
    useMemoryGame();
  const formattedTime = formatTime(time);

  if (!difficulty) return <DifficultySelector />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-blue-200 p-4 sm:gap-8 sm:p-8">
      <ScoreBoard moves={moves} time={formattedTime} onRestart={resetGame} />

      <GameBoard cards={cards} onCardClick={handleCardClick} />

      {gameCompleted && (
        <GameModal moves={moves} time={formattedTime} onRestart={resetGame} />
      )}
    </div>
  );
}

export default App;
