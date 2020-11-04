const { bn, bigExp } = require('../../src/helpers/numbers')
const { rinkeby: governor } = require('./governor')
const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')

const TERM_DURATION = 60 * 60 * 8                                      // 8 hours
const START_DATE = Math.floor(new Date() / 1000 + TERM_DURATION + 120) // 2 minutes from now

const HNY = {
  symbol: 'HNY',
  decimals: 18,
  address: requireOutput('minime.rinkeby', getAddressIfDefined('HNY'))
}

const DAI = {
  symbol: 'DAI',
  decimals: 18,
  address: requireOutput('minime.rinkeby', getAddressIfDefined('DAI'))
}

module.exports = {
  governor: {                      // Agent of AN DAO
    funds:                         governor,
    config:                        governor,
    feesUpdater:                   governor, // Must be updated post deployment to the newly created feesUpdater
    modules:                       governor,
  },
  clock: {
    termDuration:                  bn(TERM_DURATION),            // terms lasts 8 hours
    firstTermStartTime:            bn(START_DATE),               // first term start timestamp in seconds
  },
  court: {
    feeToken:                      DAI,                          // fee token for the court is DAI
    evidenceTerms:                 bn(21),                       // evidence period lasts 21 terms (7 days)
    commitTerms:                   bn(6),                        // vote commits last 6 terms (2 days)
    revealTerms:                   bn(6),                        // vote reveals last 6 terms (2 days)
    appealTerms:                   bn(6),                        // appeals last 6 terms (2 days)
    appealConfirmTerms:            bn(6),                        // appeal confirmations last 6 terms (2 days)
    maxJurorsPerDraftBatch:        bn(81),                       // max number of jurors drafted per batch
    jurorFee:                      bigExp(10, DAI.decimals),     // 10 fee tokens for juror fees
    draftFee:                      bigExp(18, DAI.decimals - 2), // 0.18 fee tokens for draft fees
    settleFee:                     bigExp(1, DAI.decimals - 1),  // 0.1 fee tokens for settle fees
    penaltyPct:                    bn(1000),                     // 10% of the min active balance will be locked to each drafted juror
    finalRoundReduction:           bn(5000),                     // 50% of discount for final rounds
    firstRoundJurorsNumber:        bn(3),                        // disputes will start with 3 jurors
    appealStepFactor:              bn(3),                        // the number of jurors to be drafted will be incremented 3 times on each appeal
    maxRegularAppealRounds:        bn(4),                        // there can be up to 4 appeals in total per dispute
    finalRoundLockTerms:           bn(21),                       // coherent jurors in the final round won't be able to withdraw for 21 terms (7 days)
    appealCollateralFactor:        bn(30000),                    // appeal collateral is 3x of the corresponding juror fees
    appealConfirmCollateralFactor: bn(20000),                    // appeal-confirmation collateral is 2x of the corresponding juror fees
    finalRoundWeightPrecision:     bn(1000),                     // use to improve division rounding for final round maths
    skippedDisputes:               2,                            // number of dispute to skip
  },
  jurors: {
    token:                         HNY,
    minActiveBalance:              bigExp(100, HNY.decimals),    // 100 HNY is the minimum balance jurors must activate to participate in the Court
    minMaxPctTotalSupply:          bigExp(1, 15),             //  0.1% of the current total supply is the max a juror can activate when the total supply stake is activated
    maxMaxPctTotalSupply:          bigExp(1, 16),             //  1% of the current total supply is the max a juror can activate when 0 stake is activated
  },
  subscriptions: {
    feeToken:                      HNY,                          // fee token for subscriptions is DAI
    feeAmount:                     bigExp(10, HNY.decimals),     // 10 fee tokens per subscription period
    periodDuration:                bn(90),                       // each subscription period lasts 90 terms (30 days)
    prePaymentPeriods:             bn(12),                       // cannot pre-pay more than 12 periods in advance (1 year)
    resumePrePaidPeriods:          bn(12),                       // 12 pre-paid periods when resuming activity (1 year)
    latePaymentPenaltyPct:         bn(1000),                     // late payment subscriptions are charged 20%
    governorSharePct:              bn(0),                        // 0% of the subscription fees
  },
  brightIdRegister: {
    address: '0xd1ec79ba01130a0ac3bb4f1df25b32f796fc9abc'           // The BrightIdRegister address
  },
  feesUpdater: {
    priceOracle: "0x9c88252DB404C00B9a412Bb35955C846B2Aa92d7", // Using HNY and DAI, with HNY as incentive token
    stableTokenAddress: DAI.address,
    stableFees: [bigExp(10, 18), bigExp(18, 16), bigExp(1, 17)]
  }
}
