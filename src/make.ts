import * as fs from "fs-extra"
import * as path from "path"
import { request } from "https"
require("dotenv").config()

if (process.argv[2] === "day") {
  makeDay(process.argv[3])
    .then(() => {
      console.log(
        `All done, created a directory for ${process.argv[3]}, containing the input`
      )
    })
    .catch((error) => {
      console.log("An error ocurred")
      console.log(error)
    })
}

if (process.argv[2] === "year") {
  makeYear(process.argv[3])
    .then(() => {
      console.log(
        `All done, created a directory for ${process.argv[3]}, containing the input`
      )
    })
    .catch((error) => {
      console.log("An error ocurred")
      console.log(error)
    })
}

function getAocInput(year: string, day: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const today = new Date()
    const req = request(
      {
        hostname: "adventofcode.com",
        path: `/${year}/day/${day}/input`,
        port: 443,
        method: "GET",
        headers: {
          Cookie: "session=" + process.env.AOC_TOKEN,
        },
      },
      (res) => {
        res.on("data", (data) => {
          resolve(data.toString())
        })
      }
    )

    req.on("error", reject)
    req.end()
  })
}

async function makeYear(year: string): Promise<void> {
  if (!year) {
    throw new Error("No Year was provided")
  }
  await fs.ensureDir(path.join(__dirname, year))
}

async function makeDay(date: string): Promise<void> {
  if (!date) {
    throw new Error(
      "No day was provided, please append the day to your command"
    )
  }

  const [year, day] = date.split("/")

  if (!process.env.AOC_TOKEN) {
    throw new Error("Please provide your AOC_TOKEN")
  }

  makeYear(year)

  console.log(`Getting input data for day ${day}`)

  const response = await getAocInput(
    year,
    day.startsWith("0") ? day.substring(1) : day
  )

  await fs.copy("./src/template", `./src/${year}/${day}`)
  await fs.writeFile(`./src/${year}/${day}/input`, response)
}
