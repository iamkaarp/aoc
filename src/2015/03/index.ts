interface Houses {
  coord: string
  count: number
}

interface SantaCoord {
  x: number
  y: number
}

async function taskA(input: string): Promise<number> {
  const moves = input.split("")
  const santaCoord: SantaCoord = {
    x: 0,
    y: 0,
  }
  const houses: Array<Houses> = []
  incrementHouse(santaCoord.x, santaCoord.y, houses)
  for (let move of moves) {
    const coords = calcMove(santaCoord.x, santaCoord.y, move)
    santaCoord.x = coords.x
    santaCoord.y = coords.y
    incrementHouse(santaCoord.x, santaCoord.y, houses)
  }
  return houses.length
}

async function taskB(input: string): Promise<number> {
  const moves = input.split("")
  const santaCoord: SantaCoord = {
    x: 0,
    y: 0,
  }
  const robotSantaCoord: SantaCoord = {
    x: 0,
    y: 0,
  }
  const houses: Array<Houses> = []

  let moveSanta: Boolean = true
  incrementHouse(santaCoord.x, santaCoord.y, houses)
  incrementHouse(robotSantaCoord.x, santaCoord.y, houses)
  for (let move of moves) {
    if (moveSanta) {
      const coords = calcMove(santaCoord.x, santaCoord.y, move)
      santaCoord.x = coords.x
      santaCoord.y = coords.y
      incrementHouse(santaCoord.x, santaCoord.y, houses)
      moveSanta = false
    } else {
      const coords = calcMove(robotSantaCoord.x, robotSantaCoord.y, move)
      robotSantaCoord.x = coords.x
      robotSantaCoord.y = coords.y
      incrementHouse(robotSantaCoord.x, robotSantaCoord.y, houses)
      moveSanta = true
    }
  }
  return houses.length
}

function calcMove(x: number, y: number, move: string) {
  if (move === "^") {
    y += 1
  } else if (move === "v") {
    y -= 1
  } else if (move === "<") {
    x -= 1
  } else {
    x += 1
  }

  return { x, y }
}

function incrementHouse(x: number, y: number, houses: Array<Houses>) {
  const index = houses.findIndex((e) => e.coord === `${x};${y}`)

  if (index >= 0) {
    houses[index].count += 1
  } else {
    houses.push({ coord: `${x};${y}`, count: 1 })
  }
}

export { taskA, taskB }
