import { useEffect, useState } from "react";
import { EMOJIS } from "@/constants";
import { Card } from "@/types";

export const createShuffledCards = () => {
  return [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
};

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);

  const initializeGame = () => {
    setCards(createShuffledCards());
  };

  useEffect(initializeGame, []);

  return {
    cards,
    resetGame: initializeGame,
  };
}
