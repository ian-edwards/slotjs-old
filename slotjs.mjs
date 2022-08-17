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
 * @example sumWeights({ 1, 2, 3}) // 6
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
 * @example randomWeight({ 1, 2, 3 }, max => Math.floor(Math.random() * max)) // 5
 */
const randomWeight = (weights, random) => random(sumWeights(weights))

/**
 * returns the index of weight from weights cumulatively
 * @param {number} weight index of this weight
 * @param {number[]} weights input weights
 * @returns {number} weight index
 * @example weightIndex(4, {1, 2, 3}) // 2
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
 * @example randomIndex({ 1, 2, 3 }, max => Math.floor(Math.random() * max)) // 2
 */
const randomIndex = (weights, random) => weightIndex(randomWeight(weights, random), weights)

/**
 * returns a random weighted item from input items
 * @param {any[]} items input items
 * @param {number[]} weights input weights
 * @param {function(number): number} random random natural integer generator
 * @returns {any} random item
 * @example randomItem({ 'slot', 'js' }, { 1, 2 }, max => Math.floor(Math.random() * max)) // 'slot'
 */
const randomItem = (items, weights, random) => items[randomIndex(weights, random)]

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

const item = randomItem(reels, weights, randomNatural)
console.log(item)