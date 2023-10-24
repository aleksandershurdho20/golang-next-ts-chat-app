import { Star } from "react-feather";

type Props = {
  rating: number;
  hoverRating: number;
  onMouseEnter: (value: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (value: number) => void;
};

export default function Rating({
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}: Props) {
  const stars = [...Array(5)];

  return (
    <div
      onMouseEnter={() => onMouseEnter(hoverRating)}
      onMouseLeave={onMouseLeave}
    >
      {stars.map((_, index) => (
        <Star
          key={index}
          onClick={() => onSaveRating(index + 1)}
          fill={index < hoverRating ? "gold" : index < rating ? "gold" : "gray"}
        />
      ))}
    </div>
  );
}
