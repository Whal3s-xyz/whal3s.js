export const asyncSome = async <T>(
  arr: Array<T>,
  predicate: (argument: T) => Promise<boolean>
) => {
  for (const e of arr) {
    if (await predicate(e)) {
      return true;
    }
  }
  return false;
};
