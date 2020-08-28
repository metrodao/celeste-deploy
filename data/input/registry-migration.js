const governor = require('./governor')
const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')

const environments = {
  mainnet: {
    oldRegistry:        '0xF9dDa954adf5E54b89f988C1560553A0a387CCE1',             // Court's old Jurors Registry instance
    newRegistry:        '0x0F7471C1df2021fF45f112878F755aAbe7AA16bF',             // Court's new Jurors Registry instance
    migrator:           '0x68380629555108aEae92e5a4C92973943073E811',             // Address of the migrator contract
  },
  rinkeby: {
    oldRegistry:         '0xe089e929FFf1912796F55a0f09fA23190F94eD78',            // Court's old Jurors Registry instance
    newRegistry:         undefined,                                               // Court's new Jurors Registry instance (TBD)
    migrator:            undefined,                                               // Address of the migrator contract (TBD)
  },
  rpc: {
    oldRegistry:         undefined,                                               // Court's old Jurors Registry instance
    newRegistry:         undefined,                                               // Court's new Jurors Registry instance (TBD)
    migrator:            undefined,                                               // Address of the migrator contract (TBD)
  },
}

Object.keys(environments).forEach(network => {
  environments[network] = {
    ...environments[network],
    governor:       governor[network],
    court:          requireOutput(`court.${network}`, getAddressIfDefined('court')),
    disputeManager: requireOutput(`court.${network}`, getAddressIfDefined('disputeManager')),
    bondedToken:    requireOutput(`minime.${network}`, getAddressIfDefined('ANJ')),
  }
})

module.exports = environments
