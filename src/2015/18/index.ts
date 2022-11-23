async function taskA(input: string): Promise<number> {
  const rows = input.trim().split(/\n|/)
  let grid = new Grid(100, 100, rows)
  for (let i = 0; i < 100; i++) grid.tick()

  const result = grid.cells.reduce(
    (total, cell) => (cell === "#" ? ++total : total),
    0
  )
  return result
}

async function taskB(input: string): Promise<number> {
  const rows = input.trim().split(/\n|/)
  let grid = new Grid(100, 100, rows, true)
  for (let i = 0; i < 100; i++) grid.tick()

  const result = grid.cells.reduce(
    (total, cell) => (cell === "#" ? ++total : total),
    0
  )
  return result
}

class Grid {
  width: number
  height: number
  cells: Array<any>
  onSymbol: string
  offSymbol: string
  taskB: boolean

  constructor(
    width: number,
    height: number,
    cells: Array<any>,
    taskB: boolean = false
  ) {
    this.width = width
    this.height = height
    this.cells = cells
    this.onSymbol = "#"
    this.offSymbol = "."
    this.taskB = taskB

    if (taskB) {
      this.cells[0] = "#"
      this.cells[this.width - 1] = "#"
      this.cells[this.width * this.height - this.width] = "#"
      this.cells[this.width * this.height - 1] = "#"
    }
  }

  getCell(x: number, y: number) {
    return this.cells[this.width * y + x]
  }

  setCell(x: number, y: number, value: boolean) {
    this.cells[this.width * y + x] = value
    return this
  }

  toggleCell(x: number, y: number) {
    return this.setCell(x, y, !this.isOn(x, y))
  }

  isOn(x: number, y: number) {
    return this.getCell(x, y) === this.onSymbol
  }

  isOff(x: number, y: number) {
    return this.getCell(x, y) === this.offSymbol
  }

  isInGrid(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  getNeighboursCount(x: number, y: number) {
    let count = this.isOn(x, y) ? -1 : 0

    for (let yD = 0; yD < 3; yD++) {
      for (let xD = 0; xD < 3; xD++) {
        if (
          this.isInGrid(x + xD - 1, y + yD - 1) &&
          this.isOn(x + xD - 1, y + yD - 1)
        ) {
          count++
        }
      }
    }

    return count
  }

  tick() {
    let cells = new Array(this.width * this.height).fill(this.offSymbol)

    if (this.taskB) {
      cells[0] = "#"
      cells[this.width - 1] = "#"
      cells[this.width * this.height - this.width] = "#"
      cells[this.width * this.height - 1] = "#"
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let onLightsCount = this.getNeighboursCount(x, y)

        if (this.isOn(x, y)) {
          if (onLightsCount === 2 || onLightsCount === 3) {
            cells[this.width * x + y] = this.onSymbol
          }
        } else if (onLightsCount === 3) {
          cells[this.width * x + y] = this.onSymbol
        }
      }
    }

    this.cells = cells
  }
}

export { taskA, taskB }
