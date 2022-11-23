async function taskA(input: string): Promise<number> {
  const INPUT: number = 29000000 / 10
  const houses: Uint32Array = new Uint32Array(INPUT)
  let houseNumber: number = INPUT

  for (let i: number = 1; i < INPUT; ++i) {
    for (let j: number = i; j < INPUT; ++j) {
      if ((houses[j] += i) >= INPUT && j < houseNumber) houseNumber = j
    }
  }

  return houseNumber
}

async function taskB(input: string): Promise<number> {
  const INPUT: number = 29000000 / 10
  const houses: Uint32Array = new Uint32Array(INPUT)
  let houseNumber: number = INPUT

  for (let i: number = 1; i < INPUT; ++i) {
    var visits = 0
    for (let j: number = i; j < INPUT; ++j) {
      if (
        (houses[j] = (houses[j] || 11) + i * 11) >= INPUT * 10 &&
        j < houseNumber
      )
        houseNumber = j

      visits++
      if (visits === 50) break
    }
  }

  return houseNumber
}

export { taskA, taskB }
