import { Transaction } from "../model/transactions";

/** Converts the price value to an easy-to-read format */
export const valueAsReadable = (input: Transaction["value"]): string => {
  return `${input.toFixed(2)} Kc`;
};