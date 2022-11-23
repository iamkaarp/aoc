async function taskA(input: string): Promise<number> {
  let floor: number = 0
  const instructions: Array<string> = input.split("")

  instructions.forEach((i: string) => {
    if (i === "(") {
      floor++
    }
    if (i === ")") {
      floor--
    }
  })
  return floor
}

async function taskB(input: string): Promise<any> {
  let floor: number = 0
  let position: number = 0
  let inBasement: Boolean = false
  const instructions: Array<string> = input.split("")

  instructions.every((i: string, index: number) => {
    if (i === "(") {
      floor++
    }
    if (i === ")") {
      floor--
    }
    position++
    if (floor < 0) {
      if (!inBasement) {
        inBasement = true

        return false
      }
    }
    return true
  })

  return position
}

export { taskA, taskB }
