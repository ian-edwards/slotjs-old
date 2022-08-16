/**
 * generates a non-deterministic random natural integer in the interval [0, max)
 * @param {number} max maximum exclusive random value
 * @returns {number} random natural integer in the interval [0, max)
 */
const randomNatural = max => Math.floor(Math.random() * max)

/**
 * returns the sum input weights
 * @param {number[]} weights input weights
 * @returns {number} weights sum
 */
const sumWeights = weights => {
    let sum = 0
    for(const weight in weights) {
        sum += weight
    }
    return sum
}

/**
 * 
 * @param {number[]} weights 
 * @param {function(number): number} random 
 * @returns {any}
 */
const randomWeight = (weights, random) => random(sumWeights(weights))

/**
 * 
 * @param {number[]} weights 
 * @param {number} weight 
 * @returns {number}
 */
const weightIndex = (weights, weight) => {
    for (let i = 0, w = 0; i < items.length; i++) {
        w += weights[i]
        if (weight < w) return i
    }
}

/**
 * 
 * @param {*} weights 
 * @param {*} random 
 * @returns 
 */
const randomIndex = (weights, random) => weightIndex(weights, randomWeight(weights, random))

/**
 * 
 * @param {*} items 
 * @param {*} weights 
 * @param {*} random 
 * @returns 
 */
const randomItem = (items, weights, random) => items[randomIndex(weights, random)]

const reels = [[
    [ 1, 2, 3, 4, 5 ],
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

console.log('hello world')