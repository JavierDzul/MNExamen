import { create, all } from 'mathjs'

// create a mathjs instance with configuration
const config = {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 64,
  predictable: false,
  randomSeed: null
}
const mathApp = create(all, config)

// read the applied configuration
console.log(mathApp.config())

export default mathApp;


