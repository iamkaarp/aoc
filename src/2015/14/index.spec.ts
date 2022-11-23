import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  const dataA = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.`
  test("Task A", async () => {
    expect(await taskA(dataA)).toBe(0)
  })

  test("Task B", async () => {
    expect(await taskB("")).toBe(0)
  })
})
