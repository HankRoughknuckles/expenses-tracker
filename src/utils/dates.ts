import moment from "moment";

/** Converts the ms since epoch timestamp to the string format that is saved and used by the app */
export const msAsDateString = (msSinceEpoch: number): string => {
  return moment(msSinceEpoch).startOf("day").toISOString();
};

export const dateStringAsMs = (dateString: string): number => {
  return moment(dateString).valueOf();
};

/** Transforms the passed timestamp to the format: "Oct 13, 2022" */
export const dateAsReadable = (dateString: string): string => {
  return moment(dateString).format("ll");
};