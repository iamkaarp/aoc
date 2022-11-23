async function taskA(input: string, test: boolean = false): Promise<string> {
  const repetitionRegExp: RegExp = /(\d)\1*/g
  const lookAndSay = (input: string) =>
    input
      .match(repetitionRegExp)
      .reduce((acc, char) => acc + `${char.length}${char[0]}`, "")
  let result = input
  if (test) {
    result = lookAndSay(result)
  } else {
    for (let i: number = 0; i < 40; ++i) {
      result = lookAndSay(result)
    }
  }
  return result.length.toString()
}

async function taskB(input: string): Promise<string> {
  const repetitionRegExp: RegExp = /(\d)\1*/g
  const lookAndSay = (input: string) =>
    input
      .match(repetitionRegExp)
      .reduce((acc, char) => acc + `${char.length}${char[0]}`, "")
  let result = input
  for (let i: number = 0; i < 50; ++i) {
    result = lookAndSay(result)
  }
  return result.length.toString()
}

export { taskA, taskB }
