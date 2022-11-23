async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.split("\n")
  let total: number = 0
  for (let row of rows) {
    if (row.length === 0) {
      continue
    }
    const dimensions: Array<string> = row.split("x")
    const l: number = parseInt(dimensions[0])
    const w: number = parseInt(dimensions[1])
    const h: number = parseInt(dimensions[2])
    const tmp: Array<number> = [l * w, w * h, h * l]

    const min = Math.min(...tmp)
    const dim = 2 * l * w + 2 * w * h + 2 * h * l

    total += dim + min
  }
  return total
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.split("\n")
  let total: number = 0
  for (let row of rows) {
    if (row.length === 0) {
      continue
    }
    const dimensions: Array<string> = row.split("x")
    const l: number = parseInt(dimensions[0])
    const w: number = parseInt(dimensions[1])
    const h: number = parseInt(dimensions[2])
    const tmp: Array<number> = [l, w, h]

    tmp.sort((a: number, b: number): number => {
      if (a < b) {
        return -1
      }
    })
    const ribbon = tmp[0] * 2 + tmp[1] * 2

    total += ribbon + l * w * h
  }
  return total
}

export { taskA, taskB }
