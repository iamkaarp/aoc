import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  test("Task A", async () => {
    const dataA = `
    A Y
B X
C Z
    `
    expect(await taskA(dataA)).toBe(15)
  })

  test("Task B", async () => {
    expect(await taskB("")).toBe(0)
  })
})
