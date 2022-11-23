const attributeRegExp: RegExp =
  /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./

async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const personAttributes: Map<string, number> = getPersonAttributes(rows)
  const allPossiblePermutations = permute(getAttendees(rows))

  const totalHappiness = allPossiblePermutations.reduce(
    (totalHappiness: number, permutaion: Array<string>) => {
      const total = permutaion.reduce(
        (total: number, person: string, index: number, arr: Array<string>) => {
          const leftOne = arr[index - 1 < 0 ? arr.length - 1 : index - 1]
          const rightOne = arr[index + 1 > arr.length - 1 ? 0 : index + 1]

          total += personAttributes.get(`${person} -> ${leftOne}`)
          total += personAttributes.get(`${person} -> ${rightOne}`)

          return total
        },
        0
      )
      return total > totalHappiness ? total : totalHappiness
    },
    0
  )

  return totalHappiness
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const personAttributes: Map<string, number> = getPersonAttributes(rows, true)
  const allPossiblePermutations = permute(getAttendees(rows).add("joakim"))
  const totalHappiness = allPossiblePermutations.reduce(
    (totalHappiness: number, permutaion: Array<string>) => {
      const total = permutaion.reduce(
        (total: number, person: string, index: number, arr: Array<string>) => {
          const leftOne = arr[index - 1 < 0 ? arr.length - 1 : index - 1]
          const rightOne = arr[index + 1 > arr.length - 1 ? 0 : index + 1]

          total += personAttributes.get(`${person} -> ${leftOne}`)
          total += personAttributes.get(`${person} -> ${rightOne}`)

          return total
        },
        0
      )
      return total > totalHappiness ? total : totalHappiness
    },
    0
  )

  return totalHappiness
}

function permute(input: Set<string>): Array<any> {
  const array = Array.from(input)
  const permute = (
    res: Array<string>,
    item: string,
    key: number,
    arr: Array<any>
  ) => {
    return res.concat(
      (arr.length > 1 &&
        arr
          .slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map((perm: string) => [item].concat(perm))) ||
        item
    )
  }

  return array.reduce(permute, [])
}

function getPersonAttributes(
  input: Array<string>,
  addSelf: boolean = false
): Map<string, number> {
  return input.reduce((map: Map<string, number>, person: string) => {
    const parsed = person.match(attributeRegExp)
    const name = parsed[1]
    const lose = parsed[2] === "lose"
    const count = +parsed[3]
    const neighbour = parsed[4]

    map.set(`${name} -> ${neighbour}`, lose ? -count : count)
    if (addSelf) {
      map.set(`joakim -> ${name}`, 0)
      map.set(`${name} -> joakim`, 0)
    }

    return map
  }, new Map<string, number>())
}

function getAttendees(input: Array<string>): Set<string> {
  return input.reduce((set: Set<string>, person: string) => {
    const parsed = person.match(attributeRegExp)
    return set.add(parsed[1])
  }, new Set<string>())
}

export { taskA, taskB }
