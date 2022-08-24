/**
 * generates a non-deterministic random natural integer in the interval [0, max)
 * @param {number} max maximum exclusive random value
 * @returns {number} random natural integer in the interval [0, max)
 * @example randomNatural(8) // 4
 */
const randomNatural = max => Math.floor(Math.random() * max)

/**
 * returns the sum input weights
 * @param {number[]} weights input weights
 * @returns {number} weights sum
 * @example sumWeights({ 1, 2, 3 }) // 6
 */
const sumWeights = weights => {
    let sum = 0
    for(const weight in weights) {
        sum += weight
    }
    return sum
}

/**
 * returns a random integer weight in the interval 0 to the sum of weights exclusive
 * @param {number[]} weights input weights
 * @param {function(number): number} random random natural integer generator
 * @returns {number} random weight
 * @example randomWeight({ 1, 2, 3 }, randomNatural) // 5
 */
const randomWeight = (weights, random) => random(sumWeights(weights))

/**
 * returns the index of weight from weights cumulatively
 * @param {number} weight index of this weight
 * @param {number[]} weights input weights
 * @returns {number} weight index
 * @example weightIndex(4, { 1, 2, 3 }) // 2
 */
const weightIndex = (weight, weights) => {
    for (let i = 0, w = 0; i < weights.length; i++) {
        w += weights[i]
        if (weight < w) return i
    }
}

/**
 * returns a random index from weights
 * @param {number[]} weights input weights
 * @param {function(number): number} random random natural integer generator
 * @returns {number} random index
 * @example randomIndex({ 1, 2, 3 }, randomNatural) // 2
 */
const randomIndex = (weights, random) => weightIndex(randomWeight(weights, random), weights)

/**
 * returns a random weighted item from input items
 * @param {any[]} items input items
 * @param {number[]} weights input weights
 * @param {function(number): number} random random natural integer generator
 * @returns {any} random item
 * @example randomItem({ 'slot', 'js' }, { 1, 2 }, randomNatural) // 'slot'
 */
const randomItem = (items, weights, random) => items[randomIndex(weights, random)]

/**
 * returns '{@link size}' number of symbols incrementing from {@link position} on {@link reel}
 * @param {number[]} reel input reel
 * @param {number} size return symbols count
 * @param {number} position start position
 * @returns {number[]} reel symbols
 * @example reelSymbols({ 1, 2, 3 }, 1, 7) // { 2, 3, 1, 2, 3, 1, 2 }
 */
const reelSymbols = (reel, size, position) => {
    const symbols = Array(size)
    for (let i = 0, p = position; i < size; i++, p++) {
        if (p == reel.length) p = 0
        symbols[i] = reel[p]
    }
    return symbols
}

/**
 * returns a random reel position
 * @param {number[]} reel input reel
 * @param {function(number): number} random random natural integer generator
 * @returns {number} random reel position
 * @example randomPosition({ 1, 2, 3 }, randomNatural) // 2
 */
const randomPosition = (reel, random) => random(reel.length)

/**
 * returns '{@link size}' number of symbols from a random position on {@link reel}
 * @param {number[]} reel input reel 
 * @param {number} size return symbols count
 * @param {function(number): number} random random natural integer generator
 * @returns {number[]} random reel spin symbols
 * @example spinReel({ 1, 2, 3 }, 5, randomNatural) // { 3, 1, 2, 3, 1 }
 */
const spinReel = (reel, size, random) => reelSymbols(reel, size, randomPosition(reel, random))

/**
 * returns corresponding '{@link layout}' number of symbols from a random position on each reel in {@link reels}
 * @param {number[][]} reels input reelset
 * @param {number[]} layout input layout
 * @param {function(number): number} random random natural integer generator
 * @returns {number[][]} random reelset spin symbols
 * @example todo
 */
const spinReelSet = (reels, layout, random) => reels.map((r, i) => spinReel(r, layout[i], random))

/**
 * todo
 * @param {number} value 
 * @param {Map<number, number>} counter 
 */
const incrementCount = (value, counter) => counter.set(value, (counter.get(value) ?? 0) + 1)

const reels = [[
    [ 9, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ]
], [
    [ 1, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ],
    [ 1, 2, 3, 4, 5 ]
]]

const weights = [ 4, 5 ]

const layout = [ 3, 3, 3, 3 ]

const counter = new Map()

console.log('start')
for(let i = 0; i < 10_000_000; i++) {
    const r = randomItem(reels, weights, randomNatural)
    const s = spinReelSet(r, layout, randomNatural)
    const n = s[0][0] + s[1][1] + s[2][2] 
    incrementCount(n, counter)
}
console.log(counter)