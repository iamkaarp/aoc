import * as fs from "fs"
import * as fse from "fs-extra"
import * as path from "path"
import * as colors from "colors/safe"

if (process.argv.length <= 2) {
  throw new Error(
    "Missing day argument, please run ´dev X´ where X is the day you want to run"
  )
}

const [inputYear, inputDay] = process.argv[3].split("/")

const year = parseInt(inputYear)
const day = parseInt(inputDay)

if (Number.isNaN(day) || !Number.isInteger(day)) {
  throw new Error("Day argument is non-numeric")
}

if (day < 1 || day > 25) {
  throw new Error("Day argument has to be between 1 and 25")
}

const currentFilePath = path.dirname(__filename)
const templatePath = `${currentFilePath}/template`
const dayPath = `${currentFilePath}/${year}/${inputDay}`
const inputPath = `${dayPath}/input.test`
const expect = require(`${dayPath}/test.json`)

if (!fs.existsSync(dayPath)) {
  fse.copySync(templatePath, dayPath)
}

const timer = new Map<string, [number, number]>()

function startTimer(label: string): void {
  timer.set(label, process.hrtime())
}

function stopTimer(label: string): number {
  const elapsed = process.hrtime(timer.get(label))
  const nano = 1000000000
  return (elapsed[0] * nano + elapsed[1]) / 1000000
}

async function run(): Promise<void> {
  const { taskA, taskB } = await import(dayPath)
  const input = fs.readFileSync(inputPath, "utf8")

  console.log(
    `\n\n🎅 Running Advent of Code: Year ${year} Day ${day} (TEST) 🎅\n`
  )

  console.log(colors.yellow("\nRunning A..."))
  startTimer("Timer A")
  try {
    const resultA = await taskA(input)
    console.log(`  Time: ${stopTimer("Timer A")}ms`)
    if (resultA === expect.taskA) {
      console.log(colors.green("  Success"))
      console.log(colors.green("  Result:"), resultA)
    } else {
      console.log(colors.red("  Result:"), resultA)
      console.log(colors.yellow("  Expected:"), expect.taskA)
    }
  } catch (error) {
    console.log(colors.red("  Error:"), error.message)
  }

  console.log(colors.yellow("\nRunning B..."))
  startTimer("Timer B")
  try {
    const resultB = await taskB(input)
    console.log(`  Time: ${stopTimer("Timer B")}ms`)
    if (resultB === expect.taskB) {
      console.log(colors.green("  Success"))
      console.log(colors.green("  Result:"), resultB)
    } else {
      console.log(colors.red("  Result:"), resultB)
      console.log(colors.yellow("  Expected:"), expect.taskB)
    }
  } catch (error) {
    console.log(colors.red("  Error:"), error.message)
  }
}

run()
  .then(() => {
    console.log("\n\n🎄🎄🎄 Done 🎄🎄🎄\n\n")
  })
  .catch((error) => console.log(colors.red("Error:"), error.message))
