const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')
const { bigExp } = require('../../src/helpers/numbers')

const ONE_WEEK = 60 * 60 * 24 * 7

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
        address:  getTokenAddress('rinkeby', 'HNY'),       // ANT address in Rinkeby
        period:   ONE_WEEK,                                           // The ANT quota period lasts 1 week
        amount:   bigExp(10000, 18)                                   // Accounts will be allowed to withdraw 10,000 ANT per week maximum
      },
      {
        symbol:   'DAI',
        address:  getTokenAddress('rinkeby', 'DAI'),       // Fee token (DAI) address in Rinkeby
        period:   ONE_WEEK,                                           // The fee token quota period lasts 1 week
        amount:   bigExp(10000, 18)                                   // Accounts will be allowed to withdraw 10,000 DAI per week maximum
      }
    ]
  },
}
