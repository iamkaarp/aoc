async function taskA(input: string): Promise<any> {
  const instructions: Array<string> = input.trim().split("\n")
  const wires: Map<string, { command: any; args: any }> = new Map()

  instructions.forEach((instruction) => {
    const parsedInstruction = parseInstructions(instruction)
    wires.set(parsedInstruction.destination, {
      command: parsedInstruction.command,
      args: parsedInstruction.args,
    })
  })

  return calcWire("a", wires)
}

async function taskB(input: string): Promise<any> {
  const instructions: Array<string> = input.trim().split("\n")
  const wires: Map<string, { command: any; args: any }> = new Map()

  instructions.forEach((instruction) => {
    const parsedInstruction = parseInstructions(instruction)
    wires.set(parsedInstruction.destination, {
      command: parsedInstruction.command,
      args: parsedInstruction.args,
    })
  })

  wires.set("b", { command: undefined, args: [46065] })

  return calcWire("a", wires)
}

function calcWire(
  wireName: any,
  wires: Map<string, { command: any; args: any }>
) {
  const bitwiseMethods: Record<string, any> = {
    AND: (a: number, b: number) => a & b,
    OR: (a: number, b: number) => a | b,
    NOT: (a: number) => ~a,
    LSHIFT: (a: number, b: number) => a << b,
    RSHIFT: (a: number, b: number) => a >> b,
  }
  const wire = wires.get(wireName)
  if (typeof wireName === "number") return wireName
  if (typeof wire === "number") return wire
  if (typeof wire === "undefined") return undefined

  if (!wire.command) {
    // @ts-ignore
    wires.set(wireName, calcWire(wire.args[0], wires))
  } else {
    wires.set(
      wireName,
      bitwiseMethods[wire.command](
        calcWire(wire.args[0], wires),
        calcWire(wire.args[1], wires)
      )
    )
  }

  return wires.get(wireName)
}

function parseInstructions(instruction: string) {
  const commandRegExp: RegExp = /[A-Z]+/g
  const argumentsRegExp: RegExp = /[a-z0-9]+/g
  const command = instruction.match(commandRegExp)
  const args = instruction.match(argumentsRegExp)
  const destination = args.pop()

  return {
    command: command && command[0],
    args: args.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))),
    destination: destination,
  }
}

export { taskA, taskB }
