const simpleCommand: RegExp = /(hlf|tpl|inc) (\w+)/
const jumpCommand: RegExp = /(jmp) ([+-]\d+)/
const conditionalJumpCommand: RegExp = /(jie|jio) (\w+), ([+-]\d+)/

const commandAssembler: Record<string, Function> = {
  hlf: (_: any, value: number) => value / 2,
  tpl: (_: any, value: number) => value * 3,
  inc: (_: any, value: number) => value + 1,
  jmp: (offset: number) => +offset,
  jie: (offset: number, register: number) => (register % 2 === 0 ? +offset : 1),
  jio: (offset: number, register: number) => (register === 1 ? +offset : 1),
}

async function taskA(input: string): Promise<number> {
  const commands: Array<string> = input.trim().split("\n")

  const registers: Map<string, number> = new Map<string, number>([
    ["a", 0],
    ["b", 0],
  ])

  let pointer: number = 0

  while (commands[pointer]) {
    const command = commands[pointer]
    const parsed = parseCommands(command)

    if (["jmp", "jie", "jio"].indexOf(parsed.command) !== -1) {
      pointer += commandAssembler[parsed.command](
        parsed.offset,
        registers.get(parsed.register)
      )
    } else {
      registers.set(
        parsed.register,
        commandAssembler[parsed.command](
          parsed.offset,
          registers.get(parsed.register)
        )
      )
      ++pointer
    }
  }
  const result = registers.get("b")
  return result
}

async function taskB(input: string): Promise<number> {
  const commands: Array<string> = input.trim().split("\n")

  const registers: Map<string, number> = new Map<string, number>([
    ["a", 1],
    ["b", 0],
  ])

  let pointer: number = 0

  while (commands[pointer]) {
    const command = commands[pointer]
    const parsed = parseCommands(command)

    if (["jmp", "jie", "jio"].indexOf(parsed.command) !== -1) {
      pointer += commandAssembler[parsed.command](
        parsed.offset,
        registers.get(parsed.register)
      )
    } else {
      registers.set(
        parsed.register,
        commandAssembler[parsed.command](
          parsed.offset,
          registers.get(parsed.register)
        )
      )
      ++pointer
    }
  }
  const result = registers.get("b")
  return result
}

function parseCommands(command: string): Record<string, any> {
  let parsed: Array<string>

  if (simpleCommand.test(command)) parsed = command.match(simpleCommand)
  if (jumpCommand.test(command)) parsed = command.match(jumpCommand)
  if (conditionalJumpCommand.test(command))
    parsed = command.match(conditionalJumpCommand)

  return {
    command: parsed[1],
    register: isNaN(Number(parsed[2])) ? parsed[2] : null,
    offset:
      typeof parsed[3] === "undefined" && parsed[1] === "jmp"
        ? parsed[2]
        : parsed[3],
  }
}

export { taskA, taskB }
