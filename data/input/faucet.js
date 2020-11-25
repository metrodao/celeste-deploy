const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')
const { bigExp } = require('../../src/helpers/numbers')

const getTokenAddress = (network, tokenSymbol) => {
  return requireOutput(`minime.${network}`, getAddressIfDefined(tokenSymbol))
}

module.exports = {
  rpc: {
    tokens: [],                                                       // No tokens set for local env
  },
  rinkeby: {
    owner:        undefined,                                          // Ownership will remain to the sender
    tokens: [
      {
        symbol:   'HNY',
        address:  getTokenAddress('rinkeby', 'HNY'),    // ANT address in Rinkeby
        period:   1000,                                                        // The ANT quota period lasts 1 second
        amount:   bigExp(10, 18)                                   // Accounts will be allowed to withdraw 10 HNY every 16 mins
      },
      {
        symbol:   'DAI',
        address:  getTokenAddress('rinkeby', 'DAI'),    // Fee token (DAI) address in Rinkeby
        period:   1000,                                                        // The fee token quota period lasts 1 second
        amount:   bigExp(10000, 18)                                   // Accounts will be allowed to withdraw 10000 DAI every 16 mins
      }
    ]
  },
}
