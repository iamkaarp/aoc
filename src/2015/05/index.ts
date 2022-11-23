async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.split("\n")
  const banned: RegExp = /ab|cd|pq|xy/g
  const vowels: RegExp = /[aeiou]/g
  const double: RegExp = /(.)\1/g

  let total: number = 0

  for (let row of rows) {
    if (row.match(banned)) {
      continue
    }
    const v = row.match(vowels)
    if (!v) {
      continue
    } else {
      if (v.length < 3) {
        continue
      }
    }
    if (!row.match(double)) {
      continue
    }
    ++total
  }
  return total
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.split("\n")
  const pair: RegExp = /(..).*\1/g
  const repeat: RegExp = /(.).\1/g
  let total: number = 0
  for (let row of rows) {
    if (!row.match(pair) || !row.match(repeat)) {
      continue
    }
    ++total
  }
  return total
}

export { taskA, taskB }
