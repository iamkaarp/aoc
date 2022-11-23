async function taskA(input: string): Promise<number> {
  const commands: Array<string> = input.trim().split("\n")
  const lights: Uint8Array = new Uint8Array(1000 * 1000)

  for (let _command of commands) {
    let command = parseCommand(_command)

    for (let x: number = Number(command.x1); x <= Number(command.x2); ++x) {
      for (let y: number = Number(command.y1); y <= Number(command.y2); ++y) {
        let index = 1000 * x + y
        if (command.command === "turn on") lights[index] = 1
        if (command.command === "turn off") lights[index] = 0
        if (command.command === "toggle")
          lights[index] = lights[index] === 0 ? 1 : 0
      }
    }
  }
  const total = lights.reduce(
    (total, light) => (light === 0 ? total : ++total),
    0
  )
  return total
}

async function taskB(input: string): Promise<number> {
  const commands: Array<string> = input.trim().split("\n")
  const lights: Uint8Array = new Uint8Array(1000 * 1000)

  for (let _command of commands) {
    let command = parseCommand(_command)

    for (let x: number = Number(command.x1); x <= Number(command.x2); ++x) {
      for (let y: number = Number(command.y1); y <= Number(command.y2); ++y) {
        let index = 1000 * x + y
        switch (command.command) {
          case "turn on":
            lights[index] += 1
            break
          case "turn off":
            lights[index] = lights[index] === 0 ? 0 : lights[index] - 1
            break
          case "toggle":
            lights[index] += 2
            break
        }
      }
    }
  }
  const total = lights.reduce((brightness, light) => brightness + light, 0)
  return total
}

function parseCommand(_command: string) {
  let command = _command.match(
    /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
  )
  return {
    command: command[1],
    x1: +command[2],
    y1: +command[3],
    x2: +command[4],
    y2: +command[5],
  }
}

export { taskA, taskB }
