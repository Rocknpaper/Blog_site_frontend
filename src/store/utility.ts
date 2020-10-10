import { Blogs } from "../models";

export function updateState<T>(oldState: T, newState: T) {
  return {
    ...oldState,
    ...newState,
  };
}

export function updateBlogs(oldState: Blogs[], newState: Blogs[]) {
  const updatedArray = [...oldState, ...newState];

  const checker: string[] = [];

  return updatedArray.filter((currentValue, index, arr) => {
    if (checker.includes(currentValue._id.$oid)) {
      return false;
    } else {
      checker.push(currentValue._id.$oid);
      return true;
    }
  });
}
