import { motion } from "motion/react";
import { ANIMATIONS } from "@/constants";
import { Card as CardType } from "@/types";
import Card from "./Card";

type GameBoardProps = {
  cards: CardType[];
  onCardClick: (id: number) => void;
};

function GameBoard({ cards, onCardClick }: GameBoardProps) {
  return (
    <motion.div
      {...ANIMATIONS.fadeInUp}
      className="grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2 sm:gap-4 sm:p-4"
    >
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => onCardClick(card.id)} />
      ))}
    </motion.div>
  );
}

export default GameBoard;
