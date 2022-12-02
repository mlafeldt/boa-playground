export function reverse(prepend) {
  const arr = ["a", 2, 5.4, prepend];
  return reverseAppend(arr);
}

export async function promise() {
 return Promise.resolved('hello');
}
