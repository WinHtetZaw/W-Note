type Input = number | string;

export const calculatePercentage = (input: Input, max: Input) => {
  const value = Number(input);
  const total = Number(max);

  if (!Number.isFinite(value) || !Number.isFinite(total) || total === 0) {
    return 0;
  }

  return (value / total) * 100;
};
