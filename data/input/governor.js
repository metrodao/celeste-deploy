const governor = require('../../src/models/shared/Governor')

const rpc =     governor('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')    // Ganache first deterministic
const aragen =  governor('0xb4124cEB3451635DAcedd11767f004d8a28c6eE7')    // Aragon first deterministic address
const ropsten = governor('0x0090aED150056316E37FE6DFa10Dc63E79D173B6')    // EOA

const rinkeby = governor({
  agent:        '0x77529e8deddb1e63c2cd30b62374c08260382aca',             // Agent of AN DAO Rinkeby
  voting:       '0x4410027dc24361ab4737d1893c423172c7f76902',             // Voting of AN DAO Rinkeby
  tokenManager: '0x0a8063d332b14a3a7dcea444d68b94b3da7e18fc',             // Token Manager of AN DAO Rinkeby
})

const mainnet = governor({ // https://mainnet.aragon.org/#/network
  agent:        '0x5e8c17a6065c35b172b10e80493d2266e2947df4',             // Agent of AN DAO
  voting:       '0x240b4de6000b4ad52ceaa1057c2647bfc24ce697',             // Voting of AN DAO
  tokenManager: '0xda15e525b09266488c95c2742e849ca71683a0f5',             // Token Manager of AN DAO
})

module.exports = {
  rpc,
  rinkeby,
  mainnet
}
