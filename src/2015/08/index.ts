async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")

  const result = rows.reduce(
    (acc: any, line: any) => acc + (line.length - eval(line).length),
    0
  )

  return result
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")

  const result = rows.reduce(
    (acc, line) =>
      acc +
      (2 +
        line.replace(/\\/g, "\\\\").replace(/"/g, '\\"').length -
        line.length),
    0
  )
  return result
}

export { taskA, taskB }
