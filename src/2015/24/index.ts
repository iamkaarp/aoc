async function taskA(input: string): Promise<number> {
  const rows: Array<number> = input.trim().split("\n").map(Number)
  const totalSum: number = rows.reduce(
    (total: number, x: number) => total + x,
    0
  )
  const groupWeight: number = totalSum / 3
  const validPackages: Array<any> = []
  const Combinatronics = require("../utils/combinatorics")

  for (let i: number = 1; validPackages.length === 0; ++i) {
    let combination: any = Combinatronics.combination(rows, ++i)
    let cmb: any

    while ((cmb = combination.next())) {
      if (cmb.reduce((acc: any, x: any) => acc + x) === groupWeight)
        validPackages.push(cmb)
    }
  }

  const result = validPackages
    .map((pkg) => pkg.reduce((acc: any, x: any) => acc * x))
    .sort((a: number, b: number) => a - b)[0]

  return result
}

async function taskB(input: string): Promise<number> {
  const rows: Array<number> = input.trim().split("\n").map(Number)
  const totalSum: number = rows.reduce(
    (total: number, x: number) => total + x,
    0
  )
  const groupWeight: number = totalSum / 4
  const validPackages: Array<any> = []
  const Combinatronics = require("../utils/combinatorics")

  for (let i: number = 1; validPackages.length === 0; ++i) {
    let combination: any = Combinatronics.combination(rows, ++i)
    let cmb: any

    while ((cmb = combination.next())) {
      if (cmb.reduce((acc: any, x: any) => acc + x) === groupWeight)
        validPackages.push(cmb)
    }
  }

  const result = validPackages
    .map((pkg) => pkg.reduce((acc: any, x: any) => acc * x))
    .sort((a: number, b: number) => a - b)[0]

  return result
}

export { taskA, taskB }
