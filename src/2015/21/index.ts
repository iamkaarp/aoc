interface Stats {
  cost: number
  damage: number
  armor: number
}

const weapons: Map<string, Stats> = new Map<string, Stats>([
  ["dagger", { cost: 8, damage: 4, armor: 0 }],
  ["shortsword", { cost: 10, damage: 5, armor: 0 }],
  ["warhammer", { cost: 25, damage: 6, armor: 0 }],
  ["longsword", { cost: 40, damage: 7, armor: 0 }],
  ["greatAxe", { cost: 74, damage: 8, armor: 0 }],
])

const armors: Map<string, Stats> = new Map<string, Stats>([
  ["nothing", { cost: 0, damage: 0, armor: 0 }],
  ["leather", { cost: 13, damage: 0, armor: 1 }],
  ["chainmail", { cost: 31, damage: 0, armor: 2 }],
  ["splintmail", { cost: 53, damage: 0, armor: 3 }],
  ["bandedmail", { cost: 75, damage: 0, armor: 4 }],
  ["platemail", { cost: 102, damage: 0, armor: 5 }],
])

const rings: Map<string, Stats> = new Map<string, Stats>([
  ["nothing", { cost: 0, damage: 0, armor: 0 }],
  ["damage+1", { cost: 25, damage: 1, armor: 0 }],
  ["damage+2", { cost: 50, damage: 2, armor: 0 }],
  ["damage+3", { cost: 100, damage: 3, armor: 0 }],
  ["defense+1", { cost: 20, damage: 0, armor: 1 }],
  ["defense+2", { cost: 40, damage: 0, armor: 2 }],
  ["defense+3", { cost: 80, damage: 0, armor: 3 }],
])

const boss: Map<string, number> = new Map<string, number>([
  ["health", 100],
  ["damage", 8],
  ["armor", 2],
])

const player: Map<string, number> = new Map<string, number>([
  ["health", 100],
  ["damage", 0],
  ["armor", 0],
])

async function taskA(input: string): Promise<number> {
  let result = Infinity
  for (let bundle of possibleBundles()) {
    player.set("damage", bundle.damage).set("armor", bundle.armor)
    if (makeMove(boss, player)) result = Math.min(result, bundle.cost)
  }
  return result
}

async function taskB(input: string): Promise<number> {
  let result = 0
  for (let bundle of possibleBundles()) {
    player.set("damage", bundle.damage).set("armor", bundle.armor)
    if (!makeMove(boss, player)) result = Math.max(result, bundle.cost)
  }
  return result
}

function hitPerSecond(
  defenderHealth: number,
  defenderArmor: number,
  attackerDmg: number
): number {
  return Math.ceil(defenderHealth / Math.max(1, attackerDmg - defenderArmor))
}

function makeMove(
  boss: Map<string, number>,
  player: Map<string, number>
): boolean {
  return (
    hitPerSecond(boss.get("health"), boss.get("armor"), player.get("damage")) <=
    hitPerSecond(player.get("health"), player.get("armor"), boss.get("damage"))
  )
}

function* possibleBundles() {
  for (let weapon of weapons.values()) {
    for (let armor of armors.values()) {
      for (let leftRing of rings.values()) {
        for (let rightRing of rings.values()) {
          if (leftRing.cost !== rightRing.cost)
            yield getTotalStats(weapon, armor, leftRing, rightRing)
        }
      }
    }
  }
}

function getTotalStats(
  weapon: Stats,
  armor: Stats,
  leftRing: Stats,
  rightRing: Stats
): Record<string, number> {
  return {
    cost: weapon.cost + armor.cost + leftRing.cost + rightRing.cost,
    damage: weapon.damage + armor.damage + leftRing.damage + rightRing.damage,
    armor: weapon.armor + armor.armor + leftRing.armor + rightRing.armor,
  }
}

export { taskA, taskB }
