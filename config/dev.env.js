'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"https://easy-mock.com/mock/5a52cd5873320b64d5048a4a/vue-admin"',
  // BASE_API: '" https://easy-mock.com/mock/5a51fb91d408383e0e384d1d/example/vue-admin"',
})
