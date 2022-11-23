import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  test("Task A", async () => {
    expect(await taskA("")).toBe(0)
  })

  test("Task B", async () => {
    expect(await taskB("")).toBe(0)
  })
})
