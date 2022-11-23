async function taskA(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const _time: number = 2503

  const getReindeerDistance = (row: string) => {
    const reindeerRegex = /\d+/g
    const args = row.match(reindeerRegex).map(Number)
    const speed: number = Number(args[0])
    const time: number = Number(args[1])
    const rest: number = Number(args[2])

    return Math.ceil(_time / (time + rest)) * (speed * time)
  }

  const result = rows.reduce(
    (max, reindeer) =>
      getReindeerDistance(reindeer) > max ? getReindeerDistance(reindeer) : max,
    0
  )
  return result
}

async function taskB(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const _time: number = 2503
  const reindeerName: RegExp = /^\w+/
  const reindeerArgs: RegExp = /\d+/g
  const reindeerPoints: Map<string, number> = new Map<string, number>()

  const getReindeerName = (row: string) => row.match(reindeerName)[0]

  function* getReindeerDistanceIterator(input: string) {
    const args = input.match(reindeerArgs).map(Number)
    const speed = args[0]
    const time = args[1]
    const rest = args[2]

    let currentDistance = 0

    for (let currentTime = 0; currentTime <= time; currentTime++) {
      let isMoving =
        currentTime % (time + rest) <= time && currentTime % (time + rest) !== 0
      yield isMoving ? (currentDistance += speed) : currentDistance
    }
  }

  const allTraveledDistances = rows.reduce(
    (map, reindeer) =>
      map.set(
        getReindeerName(reindeer),
        Array.from(getReindeerDistanceIterator(reindeer))
      ),
    new Map()
  )

  console.log(allTraveledDistances.entries())

  for (let currentTime = 0; currentTime <= _time; currentTime++) {
    let winnerInTheRound = ""
    let max = 0

    for (let reindeerName of allTraveledDistances.keys()) {
      let reindeerTraveled = allTraveledDistances.get(reindeerName)[currentTime]

      if (reindeerTraveled >= max) {
        winnerInTheRound = reindeerName
        max = reindeerTraveled
      }
    }

    reindeerPoints.set(
      winnerInTheRound,
      (reindeerPoints.get(winnerInTheRound) || 0) + 1
    )
  }

  const result = Math.max.apply(Math, Array.from(reindeerPoints.values()))
  return result
}

export { taskA, taskB }
