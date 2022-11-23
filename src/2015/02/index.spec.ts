import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for 2015 02", () => {
  const dataACase1 = "2x3x4"
  const dataACase2 = "1x1x10"
  test("Task A", async () => {
    expect(await taskA(dataACase1)).toBe(58)
    expect(await taskA(dataACase2)).toBe(43)
  })

  test("Task B", async () => {
    expect(await taskB(dataACase1)).toBe(34)
    expect(await taskB(dataACase2)).toBe(14)
  })
})
