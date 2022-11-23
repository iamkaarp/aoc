interface Attributes {
  capacity: number
  durability: number
  flavor: number
  texture: number
  calories: number
}

interface Cookies {
  score: number
  calories: number
}

async function taskA(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const ingredientAttributes: Map<string, Attributes> =
    getIngredientsAttributes(rows)
  const ingredients: Set<string> = getIngredients(rows)
  const teaspoons: number = 100
  const allPossibleCookies: Array<number> = []

  for (let sprinkles: number = 0; sprinkles < teaspoons; ++sprinkles) {
    for (
      let butterscotch: number = 0;
      butterscotch < teaspoons - sprinkles;
      ++butterscotch
    ) {
      for (
        let chocolate: number = 0;
        chocolate < teaspoons - sprinkles - butterscotch;
        ++chocolate
      ) {
        let candy: number = teaspoons - sprinkles - butterscotch - chocolate
        allPossibleCookies.push(
          makeCookie(ingredients, ingredientAttributes, {
            Sprinkles: sprinkles,
            Butterscotch: butterscotch,
            Chocolate: chocolate,
            Candy: candy,
          })[0]
        )
      }
    }
  }

  const result = allPossibleCookies.sort((a: number, b: number) => b - a)[0]

  return result
}

async function taskB(input: string): Promise<number> {
  const rows = input.trim().split("\n")
  const ingredientAttributes: Map<string, Attributes> =
    getIngredientsAttributes(rows)
  const ingredients: Set<string> = getIngredients(rows)
  const teaspoons: number = 100
  const allPossibleCookies: Array<Cookies> = []

  for (let sprinkles: number = 0; sprinkles < teaspoons; ++sprinkles) {
    for (
      let butterscotch: number = 0;
      butterscotch < teaspoons - sprinkles;
      ++butterscotch
    ) {
      for (
        let chocolate: number = 0;
        chocolate < teaspoons - sprinkles - butterscotch;
        ++chocolate
      ) {
        let candy: number = teaspoons - sprinkles - butterscotch - chocolate
        let cookie: Array<number> = makeCookie(
          ingredients,
          ingredientAttributes,
          {
            Sprinkles: sprinkles,
            Butterscotch: butterscotch,
            Chocolate: chocolate,
            Candy: candy,
          }
        )
        allPossibleCookies.push({
          score: cookie[0],
          calories: cookie[1],
        })
      }
    }
  }
  const result = allPossibleCookies
    .filter((cookie) => cookie.calories === 500)
    .sort((a: Cookies, b: Cookies) => b.score - a.score)[0].score

  return result
}

function makeCookie(
  ingredients: Set<string>,
  ingredientAttributes: Map<string, Attributes>,
  teaspoons: Record<string, number>
): Array<number> {
  const map = new Map<string, number>()

  ingredients.forEach((ingredient: string) => {
    const attributes = ingredientAttributes.get(ingredient)
    const teaspoonsCount = teaspoons[ingredient]
    map.set(
      "capacity",
      (map.get("capacity") || 0) + attributes.capacity * teaspoonsCount
    )
    map.set(
      "durability",
      (map.get("durability") || 0) + attributes.durability * teaspoonsCount
    )
    map.set(
      "flavor",
      (map.get("flavor") || 0) + attributes.flavor * teaspoonsCount
    )
    map.set(
      "texture",
      (map.get("texture") || 0) + attributes.texture * teaspoonsCount
    )
    map.set(
      "calories",
      (map.get("calories") || 0) + attributes.calories * teaspoonsCount
    )
  })

  if (Array.from(map.values()).some((item) => item <= 0))
    return [0, map.get("calories")]
  return [
    map.get("capacity") *
      map.get("durability") *
      map.get("flavor") *
      map.get("texture"),
    map.get("calories"),
  ]
}

function getIngredientsAttributes(
  input: Array<string>
): Map<string, Attributes> {
  const ingredientAttributes: RegExp =
    /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/

  return input.reduce((map: Map<string, Attributes>, ingredient: string) => {
    const parsed: Array<string> = ingredient.match(ingredientAttributes)
    map.set(parsed[1], {
      capacity: +parsed[2],
      durability: +parsed[3],
      flavor: +parsed[4],
      texture: +parsed[5],
      calories: +parsed[6],
    })

    return map
  }, new Map<string, Attributes>())
}

function getIngredients(input: Array<string>): Set<string> {
  const ingredientAttributes: RegExp =
    /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
  return input.reduce((set, ingredient) => {
    const parsed: Array<string> = ingredient.match(ingredientAttributes)
    set.add(parsed[1])
    return set
  }, new Set<string>())
}

export { taskA, taskB }
