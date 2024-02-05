export const hasAllNonNullValues = <T, K extends keyof T>(obj: T, keys: K[]): boolean => {
  return keys.every(key => obj[key] !== null && obj[key] !== undefined);
};
