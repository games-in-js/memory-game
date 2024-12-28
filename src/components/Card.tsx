import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_STYLES = {
  base: "absolute flex h-full w-full items-center justify-center rounded-xl border-2 backface-hidden",
  back: "border-white/20 bg-pink",
  front: "rotate-y-180 border-purple-200 bg-white",
};

type CardProps = {
  emoji: string;
};

function Card({ emoji }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-16 w-16 cursor-pointer" onClick={handleClick}>
      {/* div do 3D */}
      <div
        className={cn(
          "preserve-3d h-full w-full transition-transform duration-500",
          isFlipped && "rotate-y-180",
        )}
      >
        {/* Card back */}
        <div className={cn(CARD_STYLES.base, CARD_STYLES.back)}>
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        {/* Card front */}
        <div className={cn(CARD_STYLES.base, CARD_STYLES.front)}>{emoji}</div>
      </div>
    </div>
  );
}

export default Card;
