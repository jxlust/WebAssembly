function getType(n: i32): String | null {
  if (n % 2 === 0) {
    return "double";
  }
  if (n % 3 === 0) {
    return "triple";
  }
  if (n % 5 === 0) {
    return "fivefold";
  }
  return null;
}

export { getType };
