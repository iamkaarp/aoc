import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  const data = `
    London to Dublin = 464
    London to Belfast = 518
    Dublin to Belfast = 141
  `
  test("Task A", async () => {
    expect(await taskA(data)).toBe(605)
  })

  test("Task B", async () => {
    expect(await taskB(data)).toBe(982)
  })
})
