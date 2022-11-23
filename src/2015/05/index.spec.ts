import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for 2015 05", () => {
  const dataACase1 = "ugknbfddgicrmopn"
  const dataACase2 = "jchzalrnumimnmhp"
  const dataACase3 = "haegwjzuvuyypxyu"
  const dataACase4 = "dvszwmarrgswjxmb"
  test("Task A", async () => {
    expect(await taskA(dataACase1)).toBe(1)
    expect(await taskA(dataACase2)).toBe(0)
    expect(await taskA(dataACase3)).toBe(0)
    expect(await taskA(dataACase4)).toBe(0)
  })

  test("Task B", async () => {
    const dataBCase1 = "qjhvhtzxzqqjkmpb"
    const dataBCase2 = "xxyxx"
    const dataBCase3 = "uurcxstgmygtbstg"
    const dataBCase4 = "ieodomkazucvgmuy"
    expect(await taskB(dataBCase1)).toBe(1)
    expect(await taskB(dataBCase2)).toBe(1)
    expect(await taskB(dataBCase3)).toBe(0)
    expect(await taskB(dataBCase4)).toBe(0)
  })
})
