async function taskA(input: string): Promise<number> {
  const replacements: Array<string> = input.trim().split("\n\n")[0].split("\n")
  const molecule: string = input.trim().split("\n\n")[1]
  const allMolecules: Set<string> = new Set<string>()
  replacements.forEach((replacement) => {
    const [from, to] = replacement.split(" => ")
    const findRegexp: RegExp = new RegExp(from, "g")
    const replaceRegexp: RegExp = new RegExp(from)

    let match
    while ((match = findRegexp.exec(molecule))) {
      allMolecules.add(
        molecule.slice(0, match.index) +
          molecule.slice(match.index).replace(replaceRegexp, to)
      )
    }
  })

  return allMolecules.size
}

async function taskB(input: string): Promise<number> {
  const replacements: Map<string, string> = input
    .split("\n\n")[0]
    .split("\n")
    .reduce(
      (map: Map<string, string>, r: string) =>
        map.set(r.split(" => ")[1], r.split(" => ")[0]),
      new Map<string, string>()
    )
  let molecule: string = input.split("\n\n")[1]
  let count: number = 0
  while (molecule !== "e") {
    const randomMolecule = Array.from(replacements.keys())[
      Math.round(Math.random() * replacements.size)
    ]
    molecule = molecule.replace(randomMolecule, (match) => {
      ++count
      return replacements.get(match)
    })
  }
  return count
}

export { taskA, taskB }
