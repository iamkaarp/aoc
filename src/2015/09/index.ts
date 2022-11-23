const directionRegExp: RegExp = /(\w+) to (\w+) = (\d+)/

async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const distances: Map<string, number> = buildDistanceMap(rows)
  const places: Set<string> = buildSet(rows)
  const allPossibleRoutes = permute(places)

  const allPossibleDistances = allPossibleRoutes.reduce((acc, route) => {
    let total = 0

    for (let i = 0; i < route.length; i++) {
      if (route[i + 1] === undefined) break

      total += distances.get(`${route[i]} -> ${route[i + 1]}`)
    }

    return acc.concat([total])
  }, [])

  const result = Math.min.apply(Math, allPossibleDistances)

  return result
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const distances: Map<string, number> = buildDistanceMap(rows)
  const places: Set<string> = buildSet(rows)
  const allPossibleRoutes = permute(places)

  const allPossibleDistances = allPossibleRoutes.reduce((acc, route) => {
    let total = 0

    for (let i = 0; i < route.length; i++) {
      if (route[i + 1] === undefined) break

      total += distances.get(`${route[i]} -> ${route[i + 1]}`)
    }

    return acc.concat([total])
  }, [])

  const result = Math.max.apply(Math, allPossibleDistances)

  return result
}

function permute(input: Set<string>): Array<any> {
  const array: Array<string> = Array.from(input)
  const permute = (
    res: Array<any>,
    item: string,
    key: number,
    arr: Array<string>
  ): Array<any> => {
    return res.concat(
      (arr.length > 1 &&
        arr
          .slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map((perm) => [item].concat(perm))) ||
        item
    )
  }

  return array.reduce(permute, [])
}

function buildDistanceMap(directions: Array<string>): Map<string, number> {
  const map: Map<string, number> = new Map()
  directions.forEach((direction: string) => {
    const parsed: Array<string> = direction.match(directionRegExp)
    map.set(`${parsed[1]} -> ${parsed[2]}`, +parsed[3])
    map.set(`${parsed[2]} -> ${parsed[1]}`, +parsed[3])
  })

  return map
}

function buildSet(directions: Array<string>): Set<string> {
  const places: Set<string> = new Set()
  directions.forEach((direction) => {
    const parsed: Array<string> = direction.match(directionRegExp)
    places.add(parsed[1]).add(parsed[2])
  })

  return places
}

export { taskA, taskB }
