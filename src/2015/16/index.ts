const sueRegExp: RegExp = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/

async function taskA(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const signature: Record<string, number> = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  }
  const result: number = Number(
    rows
      .filter((item) => {
        const parsed: Array<string> = item.match(sueRegExp)
        return (
          signature[parsed[2]] == +parsed[3] &&
          signature[parsed[4]] == +parsed[5] &&
          signature[parsed[6]] == +parsed[7]
        )
      })[0]
      .match(sueRegExp)[1]
  )

  return result
}

async function taskB(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const signature: Record<string, Function> = {
    children: (value: number) => value == 3,
    cats: (value: number) => value > 7,
    samoyeds: (value: number) => value == 2,
    pomeranians: (value: number) => value < 3,
    akitas: (value: number) => value == 0,
    vizslas: (value: number) => value == 0,
    goldfish: (value: number) => value < 5,
    trees: (value: number) => value > 3,
    cars: (value: number) => value == 2,
    perfumes: (value: number) => value == 1,
  }

  const result = Number(
    rows
      .filter((item) => {
        const parsed = item.match(sueRegExp)

        return (
          signature[parsed[2]](parsed[3]) &&
          signature[parsed[4]](parsed[5]) &&
          signature[parsed[6]](parsed[7])
        )
      })[0]
      .match(sueRegExp)[1]
  )

  return result
}

export { taskA, taskB }
