export const normalizeInputValue = (name, value) => {
  let numValue = Number(value);

  if (name === "red" || name === "green" || name === "blue") {
    numValue = Math.max(0, Math.min(255, numValue));
  }

  if (name === "shape") {
    numValue = Math.max(0, Math.min(2, numValue));
  }

  return numValue;
};
