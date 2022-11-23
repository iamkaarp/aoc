async function taskA(input: string): Promise<string> {
  let result = input.trim()
  while (!isValidPassword(result)) result = incrementString(result)
  return result
}

async function taskB(input: string): Promise<string> {
  let result = incrementString(await taskA(input))
  while (!isValidPassword(result)) result = incrementString(result)
  return result
}

const isContainStraightIncreasingSymbols = (string: string) =>
  string
    .split("")
    .map((char) => char.charCodeAt(0))
    .some(
      (char, index, arr) =>
        arr[index] === arr[index + 1] - 1 &&
        arr[index + 1] === arr[index + 2] - 1
    )
const isContainRestrictedSymbols = (string: string) => /i|o|l/.test(string)
const isContainPairs = (string: string) => /(\w)\1.*(\w)\2/.test(string)
const incrementChar = (char: string) =>
  char === "z" ? "a" : String.fromCharCode(char.charCodeAt(0) + 1)

const incrementString = (string: string): string => {
  const nextChar = incrementChar(string.slice(-1))
  return nextChar === "a"
    ? incrementString(string.slice(0, -1)) + "a"
    : string.slice(0, -1) + nextChar
}

const isValidPassword = (string: string) =>
  isContainStraightIncreasingSymbols(string) &&
  !isContainRestrictedSymbols(string) &&
  isContainPairs(string)

export { taskA, taskB }
