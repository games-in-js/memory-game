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
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

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

    // flip the clicked card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      ),
    );

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
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
    handleCardClick,
    resetGame: initializeGame,
  };
}
