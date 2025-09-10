/* eslint-disable @typescript-eslint/no-explicit-any */
type KeyValuePair = {
  key: string;
  value: string | number | boolean | null | undefined;
};

export const formatKeyValuePairs = (
  obj: Record<string, any>
): KeyValuePair[] => {
  if (!obj || typeof obj !== "object") return [];

  return Object.entries(obj).map(([key, value]) => ({
    key: formatLabel(key),
    value: value,
  }));
};

const formatLabel = (label: string): string => {
  return label
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};
