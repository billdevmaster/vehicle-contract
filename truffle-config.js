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
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_API_KEY}`),
      network_id: 3,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`),
      network_id: 4,       // Rinkeby's id
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true  ,   // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 100000,
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.4", // A version or constraint - Ex. "^0.5.0"
      // settings: {
      //   optimizer: {
      //     enabled: true,
      //     runs: 1000   // Optimize for how many times you intend to run the code
      //   }
      // }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    // bscscan: 'QC4UPPIN4JPDA4YAY1PAS46RGNJUYFHKCM',
    // polygonscan: 'X1RVAXVNZFIXVMYUGS8DW8MR8NUZM5VA58'
    // bsctestscan: 'NPIT4183DK8BMGVZDT9C4R14S1QMEHIT88',
    etherscan: 'AE1GZQSMZDCKH8WP4KZY1UPSNTD8KAN64K'
  },
}