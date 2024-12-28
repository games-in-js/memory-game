import Card from "./Card";

const EMOJIS = ["🍭", "🍬", "🍫", "🧁", "🍪", "🍩"] as const;

const CARDS = [...EMOJIS, ...EMOJIS]
  .sort(() => Math.random() - 0.5)
  .map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));

function GameBoard() {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2 sm:gap-4 sm:p-4">
      {CARDS.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

export default GameBoard;
