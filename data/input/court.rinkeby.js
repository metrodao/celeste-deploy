const { bn, bigExp } = require('../../src/helpers/numbers')
const { rinkeby: governor } = require('./governor')
const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')

const TERM_DURATION = 60 * 5                                              // 5 minutes
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
  governor: {
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
    feeToken:                      HNY,                             // fee token for the court is DAI
    maxRulingOptions:              bn(2),                        // max juror selectable outcomes for disputes
    evidenceTerms:                 bn(1),                        // evidence period lasts 21 terms (7 days)
    commitTerms:                   bn(1),                        // vote commits last 6 terms (2 days)
    revealTerms:                   bn(1),                        // vote reveals last 6 terms (2 days)
    appealTerms:                   bn(1),                        // appeals last 6 terms (2 days)
    appealConfirmTerms:            bn(1),                        // appeal confirmations last 6 terms (2 days)
    maxJurorsPerDraftBatch:        bn(81),                       // max number of jurors drafted per batch
    jurorFee:                      bigExp(33, 15),            // $10 / 300 (hny price) fee tokens for juror fees
    draftFee:                      bigExp(6, 14),             // $0.18 / 300 (hny price) fee tokens for draft fees paid in celeste fees and earned for each juror drafted
    settleFee:                     bigExp(33, 13),            // $0.1 / 300 (hny price) fee tokens for settle fees paid in celeste fees and earned for each juror settled
    penaltyPct:                    bn(1000),                     // 10% of the min active balance will be locked to each drafted juror
    finalRoundReduction:           bn(5000),                     // 50% of discount for final rounds
    firstRoundJurorsNumber:        bn(3),                        // disputes will start with 3 jurors
    appealStepFactor:              bn(2),                        // the number of jurors to be drafted will be incremented 3 times on each appeal
    maxRegularAppealRounds:        bn(3),                        // there can be up to 4 appeals in total per dispute
    finalRoundLockTerms:           bn(1),                        // coherent jurors in the final round won't be able to withdraw for 21 terms (7 days)
    appealCollateralFactor:        bn(30000),                    // appeal collateral is 3x of the corresponding juror fees
    appealConfirmCollateralFactor: bn(20000),                    // appeal-confirmation collateral is 2x of the corresponding juror fees
    finalRoundWeightPrecision:     bn(1000),                     // use to improve division rounding for final round maths
    skippedDisputes:               2,                               // number of dispute to skip
  },
  jurors: {
    minActiveBalance:              bigExp(5, 17),             // 0.5 HNY is the minimum balance jurors must activate to participate in the Court
    minMaxPctTotalSupply:          bigExp(1, 15),             // 0.1% of the current total supply is the max a juror can activate when the total supply stake is activated
    maxMaxPctTotalSupply:          bigExp(1, 16),             // 1% of the current total supply is the max a juror can activate when 0 stake is activated
  },
  subscriptions: {
    feeToken:                      HNY,                             // fee token for subscriptions is DAI
    feeAmount:                     bigExp(0, 18),             // Not used
    periodDuration:                bn(3),                        // each subscription period lasts 3 terms (? days)
    prePaymentPeriods:             bn(0),                        // Not used
    resumePrePaidPeriods:          bn(0),                        // Not used
    latePaymentPenaltyPct:         bn(0),                        // Not used
    governorSharePct:              bn(0),                        // Not used
  },
  brightIdRegister: {
    address: '0xeaed9896d5cf193441d5e8e685c244dcd0af2f0a'      // The BrightIdRegister address, requires deploying first part of DAO
  },
  feesUpdater: {
    priceOracle: "0xF0048Ef1fCef06c943b1ce1dF26506c8980A4ece", // Using HNY and DAI, with HNY as incentive token
    stableTokenAddress: DAI.address,
    stableFees: [bigExp(10, 18), bigExp(18, 16), bigExp(1, 17)]
    // juror fee = 10, draft fee = 0.18, settle fee = 0.1
  }
}
