import React from "react";

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score }) => {
  const circleClasses = `h-10 w-10 rounded-full flex items-center justify-center font-bold text-base`;
  let bgColor = "bg-blue-600";

  if (score >= 7.5) {
    bgColor = "bg-blue-500";
  } else if (score < 7.5 && score >= 5) {
    bgColor = "bg-yellow-500";
  } else if (score < 5) {
    bgColor = "bg-red-500";
  }

  return <div className={`${circleClasses} ${bgColor}`}>{score}</div>;
};

export default ScoreCircle;
