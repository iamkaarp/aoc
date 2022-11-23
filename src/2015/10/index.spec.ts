import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  const dataACase1 = "1"
  const dataACase2 = "111221"
  test("Task A", async () => {
    //expect(await taskA(dataACase1)).toBe(1)
    expect(await taskA(dataACase2, true)).toBe("312211")
  })

  test("Task B", async () => {
    expect(await taskB("")).toBe(0)
  })
})
