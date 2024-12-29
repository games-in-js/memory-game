import { useEffect, useState } from "react";
import { EMOJIS } from "@/constants";
import { Card } from "@/types";
import { useTimer } from "./use-timer";

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
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const { time } = useTimer(gameStarted);

  const initializeGame = () => {
    setCards(createShuffledCards());
  };

  useEffect(initializeGame, []);

  const handleCardClick = (id: number) => {
    const clickedCard = cards.find((card) => card.id === id)!;

    if (
      flippedCards.length === 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    if (!gameStarted) setGameStarted(true);

    // flip the clicked card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      ),
    );

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      const isMatched = firstCard.emoji === secondCard.emoji;

      setTimeout(() => {
        const updatedCards = cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {
              ...card,
              isFlipped: isMatched,
              isMatched,
            };
          }

          return card;
        });

        setCards(updatedCards);
        setFlippedCards([]);
      }, 500);
    }
  };

  return {
    cards,
    moves,
    time,
    handleCardClick,
    resetGame: initializeGame,
  };
}
