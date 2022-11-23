import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for 2015 01", () => {
  const dataA = [
    {
      input: "(())",
      output: 0,
    },
    {
      input: "()()",
      output: 0,
    },
    {
      input: "(((",
      output: 3,
    },
    {
      input: "(()(()(",
      output: 3,
    },
    {
      input: "))(((((",
      output: 3,
    },
    {
      input: "())",
      output: -1,
    },
    {
      input: "))(",
      output: -1,
    },
    {
      input: ")))",
      output: -3,
    },
    {
      input: ")())())",
      output: -3,
    },
  ]

  test("Task A case 1", async () => {
    expect(await taskA(dataA[0].input)).toBe(dataA[0].output)
    expect(await taskA(dataA[1].input)).toBe(dataA[1].output)
  })

  test("Task A case 2", async () => {
    expect(await taskA(dataA[2].input)).toBe(dataA[2].output)
    expect(await taskA(dataA[3].input)).toBe(dataA[3].output)
    expect(await taskA(dataA[4].input)).toBe(dataA[4].output)
  })

  test("Task A case 3", async () => {
    expect(await taskA(dataA[5].input)).toBe(dataA[5].output)
    expect(await taskA(dataA[6].input)).toBe(dataA[6].output)
  })

  test("Task A case 4", async () => {
    expect(await taskA(dataA[6].input)).toBe(dataA[6].output)
    expect(await taskA(dataA[7].input)).toBe(dataA[7].output)
  })

  const dataB = [
    {
      input: ")",
      output: 1,
    },
    {
      input: "()())",
      output: 5,
    },
  ]

  test("Task B", async () => {
    expect(await taskB(dataB[0].input)).toBe(dataB[0].output)
    expect(await taskB(dataB[1].input)).toBe(dataB[1].output)
  })
})
