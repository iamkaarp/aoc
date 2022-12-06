async function taskA(input: string): Promise<number> {
  const buffer: Array<string> = []
  const trimmed: string = input.trim()
  let pos: number = 0
  for (let i: number = 0; i < trimmed.length; ++i) {
    buffer.push(trimmed[i])
    if (buffer.length > 4) {
      buffer.shift()
    }

    if (buffer.length === 4) {
      if (
        buffer.every((c: string) => buffer.indexOf(c) === buffer.lastIndexOf(c))
      ) {
        pos = i + 1
        break
      }
    }
  }
  return pos
}

async function taskB(input: string): Promise<number> {
  const buffer: Array<string> = []
  const trimmed: string = input.trim()
  let pos: number = 0
  for (let i: number = 0; i < trimmed.length; ++i) {
    buffer.push(trimmed[i])
    if (buffer.length > 14) {
      buffer.shift()
    }

    if (buffer.length === 14) {
      if (
        buffer.every((c: string) => buffer.indexOf(c) === buffer.lastIndexOf(c))
      ) {
        pos = i + 1
        break
      }
    }
  }
  return pos
}

export { taskA, taskB }
