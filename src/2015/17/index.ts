async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const containers: Array<number> = rows.reduce(
    (arr: Array<number>, item: string) => {
      arr.push(Number(item))
      return arr
    },
    []
  )
  const Combinatorics = require("../utils/combinatorics")

  let total: number = 0
  for (let i = 1; i < containers.length - 1; i++) {
    let combination = Combinatorics.combination(containers, i)
    let c = []

    while ((c = combination.next())) {
      if (c.reduce((a: number, b: number) => a + b) === 150) total++
    }
  }
  return total
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const containers: Array<number> = rows
    .reduce((arr: Array<number>, item: string) => {
      arr.push(Number(item))
      return arr
    }, [])
    .sort((a: number, b: number) => b - a)
  const Combinatorics = require("../utils/combinatorics")

  let total: number = 0
  let combination = Combinatorics.combination(containers, 4)
  let c = []

  while ((c = combination.next())) {
    if (c.reduce((a: number, b: number) => a + b) === 150) total++
  }
  return total
}

export { taskA, taskB }
