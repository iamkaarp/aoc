const opponentMoves: Map<string, { move: string; points: number }> = new Map<
  string,
  { move: string; points: number }
>([
  ["A", { move: "rock", points: 1 }],
  ["B", { move: "paper", points: 2 }],
  ["C", { move: "scissors", points: 3 }],
])

const winPoints: number = 6
const drawPoints: number = 3

async function taskA(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const playerMoves: Map<string, { move: string; points: number }> = new Map<
    string,
    { move: string; points: number }
  >([
    ["X", { move: "rock", points: 1 }],
    ["Y", { move: "paper", points: 2 }],
    ["Z", { move: "scissors", points: 3 }],
  ])
  const playRound = (opponent: string, player: string): number => {
    if (opponentMoves.get(opponent).move === playerMoves.get(player).move) {
      return drawPoints + playerMoves.get(player).points
    } else if (opponentMoves.get(opponent).move === "rock") {
      if (playerMoves.get(player).move === "paper") {
        return winPoints + playerMoves.get(player).points
      } else {
        return playerMoves.get(player).points
      }
    } else if (opponentMoves.get(opponent).move === "scissors") {
      if (playerMoves.get(player).move === "rock") {
        return winPoints + playerMoves.get(player).points
      } else {
        return playerMoves.get(player).points
      }
    } else if (opponentMoves.get(opponent).move === "paper") {
      if (playerMoves.get(player).move === "scissors") {
        return winPoints + playerMoves.get(player).points
      } else {
        return playerMoves.get(player).points
      }
    }
  }
  const result = rows.reduce((total: number, moves: string) => {
    const [opponent, player] = moves.split(" ")
    total += playRound(opponent, player)
    return total
  }, 0)
  return result
}

async function taskB(input: string): Promise<number> {
  const rows: Array<string> = input.trim().split("\n")
  const playerMoves: Map<string, number> = new Map<string, number>([
    ["rock", 1],
    ["paper", 2],
    ["scissors", 3],
  ])

  const winsTo: Map<string, string> = new Map<string, string>([
    ["rock", "paper"],
    ["paper", "scissors"],
    ["scissors", "rock"],
  ])

  const losesTo: Map<string, string> = new Map<string, string>([
    ["rock", "scissors"],
    ["paper", "rock"],
    ["scissors", "paper"],
  ])

  const playRound = (opponent: string, player: string): number => {
    if (
      ["rock", "paper", "scissors"].includes(
        opponentMoves.get(opponent).move
      ) &&
      player === "Y"
    ) {
      return drawPoints + playerMoves.get(opponentMoves.get(opponent).move)
    } else {
      const move = opponentMoves.get(opponent).move
      if (player === "X") {
        const counterMove = losesTo.get(move)
        return playerMoves.get(counterMove)
      } else if (player === "Z") {
        const counterMove = winsTo.get(move)
        return winPoints + playerMoves.get(counterMove)
      }
    }
    return 0
  }

  const result = rows.reduce((total: number, moves: string) => {
    const [opponent, player] = moves.split(" ")
    total += playRound(opponent, player)
    return total
  }, 0)
  return result
}

export { taskA, taskB }
