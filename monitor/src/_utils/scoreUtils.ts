type ScoreCategory = "Poor" | "Low" | "Average" | "Good" | "Excellent";

const getScoreCategory = (score: number): ScoreCategory => {
  if (score < 20) return "Poor";
  if (score < 40) return "Low";
  if (score < 60) return "Average";
  if (score < 80) return "Good";
  return "Excellent";
};

// Utility function to get Tailwind background class
export const categorizeScoreToBgClassName = (score: number): string => {
  const category = getScoreCategory(score);
  return `bg-ssindex-${category.toLowerCase()}`;
};

// Utility function to get score text
export const categorizeScoreToText = (score: number): ScoreCategory => {
  return getScoreCategory(score);
};
