async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")

  const result: number = rows.reduce((total, row) => {
    const [aLow, aHigh, bLow, bHigh] = row.match(/(\d+)/g)
    const aRange = range(Number(aHigh), Number(aLow))
    const bRange = range(Number(bHigh), Number(bLow))
    if (isBetween(aRange, bRange) || isBetween(bRange, aRange)) {
      total++
    }
    return total
  }, 0)

  return result
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")

  const result: number = rows.reduce((total, row) => {
    const [aLow, aHigh, bLow, bHigh] = row.match(/(\d+)/g)
    const aRange = range(Number(aHigh), Number(aLow))
    const bRange = range(Number(bHigh), Number(bLow))
    if (overlaps(aRange, bRange) || overlaps(bRange, aRange)) {
      total++
    }
    return total
  }, 0)

  return result
}

function overlaps(a: Array<number>, b: Array<number>): boolean {
  for (let i = Math.min.apply(null, a); i <= Math.max.apply(null, a); ++i) {
    if (b.includes(i)) {
      return true
    }
  }
  return false
}

function isBetween(a: Array<number>, b: Array<number>): boolean {
  return a.every((value: number) => {
    return b.includes(value)
  })
}

function range(max: number, min: number): Array<number> {
  return Array.from(
    { length: max - min + 1 },
    (_: undefined, i: number) => min + i
  )
}

export { taskA, taskB }
