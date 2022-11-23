async function taskA(input: string): Promise<number> {
  const result = input
    .match(/-?\d+/g)
    .reduce((total, number) => total + +number, 0)
  return result
}

async function taskB(input: string): Promise<number> {
  const json = JSON.parse(input, (key, value) => {
    if (!Array.isArray(value))
      return Object.keys(value)
        .map((key) => value[key])
        .indexOf("red") !== -1
        ? {}
        : value
    return value
  })

  const result = JSON.stringify(json)
    .match(/-?\d+/g)
    .reduce((total, number) => total + +number, 0)

  return result
}

export { taskA, taskB }
