/**
 * Searches the passed array for something where predicate returns true.  It then replaces that element with the passed
 * newElement.  Will only replace the first one found in the list (in case there are duplicates present)
 */
export const replaceElement = <T>(array: T[], newElement: T, predicate: (element: T) => boolean): T[] => {
  const newArray = [...array];
  const index = newArray.findIndex(predicate);

  if (index === -1) throw new Error("No matching element found in array");

  newArray[index] = newElement;
  return newArray;
};

/** Sums all the items in the passed number array */
export const sumArray = (input: number[]): number => (
  input.reduce((sum, current) => sum + current, 0)
);