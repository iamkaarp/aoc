import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for 2015 03", () => {
  const dataACase1 = "^>v<"
  const dataACase2 = "^v^v^v^v^v"
  test("Task A", async () => {
    expect(await taskA(dataACase1)).toBe(4)
    expect(await taskA(dataACase2)).toBe(2)
  })

  const dataBCase1 = "^v"
  const dataBCase2 = "^>v<"
  const dataBCase3 = "^v^v^v^v^v"
  test("Task B", async () => {
    expect(await taskB(dataBCase1)).toBe(3)
    expect(await taskB(dataBCase2)).toBe(3)
    expect(await taskB(dataBCase3)).toBe(11)
  })
})
