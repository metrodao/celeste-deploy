const { bn, bigExp } = require('../../src/helpers/numbers')
const { polygon: governor } = require('./governor')
const { requireOutput, getAddressIfDefined } = require('../../src/helpers/require-output')

const TERM_DURATION = 60 * 60 * 8 // 8 hours
const START_DATE = Math.floor(new Date() / 1000 + TERM_DURATION + 120) // 2 minutes from now

const HNY = {
  symbol: 'HNY',
  decimals: 18,
  address: requireOutput('minime.polygon', getAddressIfDefined('HNY'))
}

const DAI = {
  symbol: 'DAI',
  decimals: 18,
  address: requireOutput('minime.polygon', getAddressIfDefined('DAI'))
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
    evidenceTerms:                 bn(21),                       // evidence period lasts 21 terms (7 days)
    commitTerms:                   bn(6),                        // vote commits last 6 terms (2 days)
    revealTerms:                   bn(6),                        // vote reveals last 6 terms (2 days)
    appealTerms:                   bn(6),                        // appeals last 6 terms (2 days)
    appealConfirmTerms:            bn(6),                        // appeal confirmations last 6 terms (2 days)
    maxJurorsPerDraftBatch:        bn(81),                       // max number of jurors drafted per batch
    jurorFee:                      bigExp(1, 16),             // $10 / 1000 (hny price) fee tokens for juror fees
    draftFee:                      bigExp(1, 14),             // $0.1 / 1000 (hny price) fee tokens for draft fees paid in celeste fees and earned for each juror drafted
    settleFee:                     bigExp(5, 13),             // $0.05 / 1000 (hny price) fee tokens for settle fees paid in celeste fees and earned for each juror settled
    penaltyPct:                    bn(3000),                     // 30% of the min active balance will be locked to each drafted juror
    finalRoundReduction:           bn(5000),                     // 50% of discount for final rounds
    firstRoundJurorsNumber:        bn(3),                        // disputes will start with 3 jurors
    appealStepFactor:              bn(3),                        // the number of jurors to be drafted will be incremented 3 times on each appeal
    maxRegularAppealRounds:        bn(4),                        // there can be up to 4 appeals in total per dispute
    finalRoundLockTerms:           bn(21),                       // coherent jurors in the final round won't be able to withdraw for 21 terms (7 days)
    appealCollateralFactor:        bn(30000),                    // appeal collateral is 3x of the corresponding juror fees
    appealConfirmCollateralFactor: bn(20000),                    // appeal-confirmation collateral is 2x of the corresponding juror fees
    finalRoundWeightPrecision:     bn(1000),                     // use to improve division rounding for final round maths
    skippedDisputes:               1,                               // number of dispute to skip
  },
  jurors: {
    minActiveBalance:              bigExp(5, 17),             // 0.5 HNY is the minimum balance jurors must activate to participate in the Court
    minMaxPctTotalSupply:          bigExp(1, 14),             // 0.01% of the current total supply is the max a juror can activate when the total supply of HNY is activated
    maxMaxPctTotalSupply:          bigExp(1, 15),             // 0.1% of the current total supply is the max a juror can activate when 0 HNY is activated
    feeTokenTotalSupply:           bigExp(30863, 18)          // The current Honey total supply on xDai, since we can't get it directly on a different network it is hardcoded
  },
  subscriptions: {
    feeToken:                      HNY,                             // fee token paid as reward is Honey
    feeAmount:                     bigExp(0, 18),             // Not used
    periodDuration:                bn(90),                       // each subscription period lasts 90 terms (30 days)
    prePaymentPeriods:             bn(0),                        // Not used
    resumePrePaidPeriods:          bn(0),                        // Not used
    latePaymentPenaltyPct:         bn(0),                        // Not used
    governorSharePct:              bn(0),                        // Not used
    periodPercentageYield:         bn(2084, 13)                  // ~2% = 25% APY
  },
  brightIdRegister: {
    address: "0x3Ee8DaBfBeaD0d29bc118272f0e26878C76c6C2c"      // The BrightIdRegister address, copy in after deploying first part of DAO
  },
  feesUpdater: {
    priceOracle: "0x156ce190838e0e59284266D025b3BFA2C8f6E969", // Using HNY and DAI, with HNY as incentive token
    stableTokenAddress: DAI.address,
    stableFees: [bigExp(10, 18), bigExp(1, 17), bigExp(5, 16)]
    // juror fee = 10, draft fee = 0.1, settle fee = 0.05 in xdai
  }
}
