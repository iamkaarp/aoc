async function taskA(input: string): Promise<number> {
  const codeRegExp: RegExp = /(\d+)/g
  const [row, column] = input.trim().match(codeRegExp).map(Number)
  const firstCode: number = 20151125
  const targetIndex: number =
    (Math.pow(row + column - 1, 2) + row + column - 1) / 2 -
    (row + column - 1 - column)

  let result: number = firstCode
  for (let i: number = 1; i < targetIndex; ++i) {
    result = (result * 252533) % 33554393
  }
  return result
}

async function taskB(input: string): Promise<number> {
  return 0
}

export { taskA, taskB }
