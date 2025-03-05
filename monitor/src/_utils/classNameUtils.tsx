// Utility function to categorize score to Tailwind text color class
export const categorizeScoreToBgClassName = (score: number): string => {
  if (score < 20) return "bg-ssindex-poor";
  if (score < 40) return "bg-ssindex-low";
  if (score < 60) return "bg-ssindex-average";
  if (score < 80) return "bg-ssindex-good";
  return "bg-ssindex-excellent";
};
