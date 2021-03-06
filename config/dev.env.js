'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"https://easy-mock.com/mock/5a52cd5873320b64d5048a4a/vue-admin"',
  // BASE_API: '"http://192.168.1.12:7300/mock/5c60ecb158609d1dd2508d0c/vue-admin"',
  // BASE_API: '"http://localhost:8888/backend/beta-01/api/public/v1"'
  BASE_API: '"http://localhost:8888/api/public/v1"'
})
