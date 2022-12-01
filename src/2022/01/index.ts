async function taskA(input: string): Promise<number> {
  const elves: Array<string> = input.split("\n\n")

  const caloryCount: Array<number> = elves.reduce(
    (result: Array<number>, elf: string) => {
      const caloriesPerElf: Array<string> = elf.split("\n")
      result.push(
        caloriesPerElf.reduce((total, calories: string) => {
          total += Number(calories)
          return total
        }, 0)
      )

      return result
    },
    new Array<number>()
  )
  const result = caloryCount.sort((a: number, b: number) => b - a)[0]

  return result
}

async function taskB(input: string): Promise<number> {
  const elves: Array<string> = input.split("\n\n")

  const caloryCount: Array<number> = elves.reduce(
    (result: Array<number>, elf: string) => {
      const caloriesPerElf: Array<string> = elf.split("\n")
      result.push(
        caloriesPerElf.reduce((total, calories: string) => {
          total += Number(calories)
          return total
        }, 0)
      )

      return result
    },
    new Array<number>()
  )
  const result = caloryCount
    .sort((a: number, b: number) => b - a)
    .slice(0, 3)
    .reduce((total: number, calories: number) => {
      total += calories
      return total
    }, 0)

  return result
}

export { taskA, taskB }
