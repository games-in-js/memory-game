import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameModal from "@/components/GameModal";
import DifficultySelector from "@/components/DifficultySelector";
import { useMemoryGame } from "@/hooks/use-memory-game";

function App() {
  const gameCompleted = false;
  const difficulty = "easy";

  const { cards, handleCardClick } = useMemoryGame();

  console.log(cards);

  if (!difficulty) return <DifficultySelector />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-blue-200 p-4 sm:gap-8 sm:p-8">
      <ScoreBoard moves={0} time={0} onRestart={() => {}} />

      <GameBoard cards={cards} onCardClick={handleCardClick} />

      {gameCompleted && <GameModal moves={10} time={0} onRestart={() => {}} />}
    </div>
  );
}

export default App;
