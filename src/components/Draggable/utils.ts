export const calculateRange = (
  nextRange: number,
  targetRange: number,
  limitRange: number,
) => {
  if (nextRange + targetRange > limitRange) {
    return limitRange - targetRange;
  }
  if (nextRange < 0) {
    return 0;
  }
  return nextRange;
};
