function validateMinMax(min: number, max: number, value: number) {
  if (min > max)
    throw new Error('The min value must be inferior to the max value');

  return value >= min && value <= max;
}

function validateMin(min: number, value: number) {
  return value >= min;
}

function validateMax(max: number, value: number) {
  return value <= max;
}

export { validateMax, validateMin, validateMinMax };
