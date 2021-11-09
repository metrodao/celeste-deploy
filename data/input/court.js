const rpc = require('./court.rpc')
const rinkeby = require('./court.rinkeby')
const mainnet = require('./court.mainnet')
const xdai = require('./court.xdai')
const arbtest = require('./court.arbtest')

module.exports = {
  rpc,
  rinkeby,
  mainnet,
  xdai,
  arbtest,
}
