const homedir = require("os").homedir;
const path = require("path");
const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require("@truffle/hdwallet-provider");

const DEFAULT_MNEMONIC =
  "explain tackle mirror kit van hammer degree position ginger unfair soup bonus";

const defaultRPC = network => `https://${network}.eth.aragon.network`;

const configFilePath = filename => path.join(homedir(), `.aragon/${filename}`);

const mnemonic = () => {
  try {
    return require(configFilePath("mnemonic.json")).mnemonic;
  } catch (e) {
    return DEFAULT_MNEMONIC;
  }
};

const settingsForNetwork = network => {
  try {
    return require(configFilePath(`${network}_key.json`));
  } catch (e) {
    return {};
  }
};

// Lazily loaded provider
const providerForNetwork = network => () => {
  let { rpc, keys } = settingsForNetwork(network);
  rpc = rpc || defaultRPC(network);

  if (!keys || keys.length === 0) {
    return new HDWalletProvider(mnemonic(), rpc);
  }

  return new HDWalletProvider(keys, rpc);
};

const mochaGasSettings = {
  reporter: "eth-gas-reporter",
  reporterOptions: {
    currency: "USD",
    gasPrice: 3
  }
};

const mocha = process.env.GAS_REPORTER ? mochaGasSettings : {};

module.exports = {
  networks: {
    rpc: {
      network_id: 15,
      host: "localhost",
      port: 8545,
      gas: 8e6,
      gasPrice: 15000000001
    },
    xdai: {
      network_id: 100,
      provider: providerForNetwork('xdai'),
      gas: 9e6,
      gasPrice: 1000000000
    },
    mainnet: {
      network_id: 1,
      provider: providerForNetwork("mainnet"),
      gas: 7.9e6
    },
    ropsten: {
      network_id: 3,
      provider: providerForNetwork("ropsten"),
      gas: 7.9e6
    },
    rinkeby: {
      network_id: 4,
      provider: providerForNetwork("rinkeby"),
      gas: 8e6,
      gasPrice: 1000000000
    },
    polygon: {
      network_id: 137,
      provider: providerForNetwork("matic"),
      gas: 8e6,
      gasPrice: 30000000000
    },
    arbtest: {
      network_id: "*",
      provider: providerForNetwork("arbtest"),
      gasPrice: 0,
      gas: 700e6
    },
    staging: {
      network_id: 4,
      provider: providerForNetwork("rinkeby"),
      gas: 8e6,
      gasPrice: 15000000001
    },
    kovan: {
      network_id: 42,
      provider: providerForNetwork("kovan"),
      gas: 6.9e6
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,
      gas: 0xffffffffff,
      gasPrice: 0x01
    }
  },
  mocha,
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.8", // A version or constraint - Ex. "^0.5.0".
                         // Can also be set to "native" to use a native solc
      // docker: true,   // Use a version obtained through docker
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        // https://solidity.readthedocs.io/en/v0.5.12/using-the-compiler.html#setting-the-evm-version-to-target
        optimizer: {
          enabled: true,
          runs: 10000   // Optimize for how many times you intend to run the code
        }
        // evmVersion: <string>   // Default: "petersburg"
      }
    }
  }
}
