// Utility function to convert hex color to rgba with alpha
export const hexToRgba = (hex: string, alpha: number) => {
  console.log("hex que viene", hex);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  console.log(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
