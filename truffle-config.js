const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    ropesten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_API_KEY}`),
      network_id: 3,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.4", // A version or constraint - Ex. "^0.5.0"
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000   // Optimize for how many times you intend to run the code
        }
      }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    // bscscan: 'QC4UPPIN4JPDA4YAY1PAS46RGNJUYFHKCM',
    // polygonscan: 'X1RVAXVNZFIXVMYUGS8DW8MR8NUZM5VA58'
    // bsctestscan: 'NPIT4183DK8BMGVZDT9C4R14S1QMEHIT88',
    etherscan: 'QNH5TIIYA5GXN2TT326FFBMSSY3H5B24XX'
  },
}