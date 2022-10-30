/** Whether the passed string can be parsed to a valid number */
export const isValidNumberString = (input: string): boolean => {
  // need to coerce to a number first since TS requires isNaN to receive a number
  return !isNaN(+input);
};