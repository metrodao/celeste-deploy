const governor = require('./governor')

const environments = {
  rpc: {
    factory:          undefined,                                      // Will be deployed unless specified
  },
  rinkeby: {
    controller:       undefined, 				                      // Will be set to the sender
    factory:          '0x6ffeb4038f7f077c4d20eaf1706980caec31e2bf',   // MiniMe token factory used for the templates
  },
  xdai: {
    controller:  undefined,
    factory:     '0xA54deE0cca6037179b0CC427e50FD3ab3D68a7B4' // I think...
  },
  mainnet: {
    controller:       governor.mainnet,                               // Will be set to the mainnet governor
    factory:          '0x081d5b92280eBF7deacdfFECEc6f2D356f47266C',   // MiniMe token factory used for the templates
  },
}

Object.keys(environments).forEach(network => {
  environments[network] = {
    ...environments[network],
    name: 'HoneyTest',
    symbol: 'HNYT',
    decimals: 18,
    transfersEnabled: true,
  }
})

module.exports = environments
