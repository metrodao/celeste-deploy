const path = require('path')
const TruffleContract = require('@truffle/contract')

module.exports = class Artifacts {
  constructor(provider, defaults) {
    this.defaults = defaults
    this.provider = provider
  }

  require(contractName, dependency = undefined) {

    let Contract

    try {
      const contractPath = dependency
        ? this._getNodeModulesPath(dependency, contractName)
        : this._getLocalBuildPath(contractName)
      Contract = TruffleContract(require(contractPath))
    } catch {
      console.log('Using alt node modules path')
      const contractPath = dependency
        ? this._getNodeModulesPathAlt(dependency, contractName)
        : this._getLocalBuildPath(contractName)
      Contract = TruffleContract(require(contractPath))
    }

    Contract.defaults(this.defaults)
    Contract.setProvider(this.provider)
    return Contract
  }

  _getLocalBuildPath(contractName) {
    return path.resolve(process.cwd(), `./artifacts/${contractName}.json`)
  }

  _getNodeModulesPath(dependency, contractName) {
    return `${process.cwd()}/node_modules/${dependency}/build/contracts/${contractName}.json`
  }

  _getNodeModulesPathAlt(dependency, contractName) {
    return `${process.cwd()}/node_modules/${dependency}/artifacts/${contractName}.json`
  }
}
