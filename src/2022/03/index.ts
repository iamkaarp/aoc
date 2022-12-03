async function taskA(input: string): Promise<number> {
  const items: Array<string> = input.trim().split("\n")
  const result: number = items.reduce((total: number, item: string) => {
    const first: string = item.slice(0, item.length / 2)
    const second: string = item.slice(item.length / 2)
    const matches: Array<string> = Array.from(match(first, second))
    total += matches.reduce((num: number, match: string) => {
      return convertCharToNumber(match)
    }, 0)

    return total
  }, 0)

  return result
}

async function taskB(input: string): Promise<number> {
  const thirdRegex: RegExp = /(?=[\s\S])(?:.*\n?){1,3}/g
  const items: Array<string> = input.trim().match(thirdRegex)
  const result: number = items.reduce((total, item) => {
    const [first, second, third] = item.trim().split("\n")
    const matches: Array<string> = Array.from(matchPerElf(first, second, third))
    total += matches.reduce((num: number, match: string) => {
      return convertCharToNumber(match)
    }, 0)
    return total
  }, 0)
  return result
}

function matchPerElf(first: string, second: string, third: string) {
  const match: Set<string> = new Set<string>()
  for (let i in Array.from(first)) {
    Array.from(third).includes(first[i]) &&
    Array.from(second).includes(first[i])
      ? match.add(first[i])
      : false
  }

  return match
}

function match(first: string, second: string): Set<string> {
  const match: Set<string> = new Set<string>()
  for (let i in Array.from(first)) {
    Array.from(second).includes(first[i]) ? match.add(first[i]) : false
  }

  return match
}

function convertCharToNumber(char: string): number {
  let out: number = 0
  const len: number = char.length
  for (let pos: number = 0; pos < len; pos++) {
    out += (char.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1)
  }
  return char === char.toUpperCase() ? out + 26 : out - 32
}

export { taskA, taskB }
