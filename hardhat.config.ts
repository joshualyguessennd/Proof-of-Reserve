import { HardhatUserConfig } from "hardhat/config";
import "@shardlabs/starknet-hardhat-plugin";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
import { token } from "./typechain-types/@openzeppelin/contracts";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

const { HOSTNAME_L1, HOSTNAME_L2 } = process.env;

const config: HardhatUserConfig = {
  networks: {
    l2_testnet: {
      url: `http://${HOSTNAME_L2 || "localhost"}:5050`,
    },
    l1_testnet: {
      url: `http://${HOSTNAME_L1 || "localhost"}:8545`,
    },
    /* mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY],
    }, */
  },
  solidity: {
    compilers: [
      {
        version: "0.8.15",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/solidity-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
  },
  starknet: {
    // dockerizedVersion: "0.9.1", // alternatively choose one of the two venv options below
    // uses (my-venv) defined by `python -m venv path/to/my-venv`
    venv: ".venv",

    // uses the currently active Python environment (hopefully with available Starknet commands!)
    // venv: "active",
    recompile: false,
    network: "l2_testnet",
    wallets: {
      OpenZeppelin: {
        accountName: "OpenZeppelin",
        modulePath:
          "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
        accountPath: "~/.starknet_accounts",
      },
    },
  },

  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPriceApi: process.env.ETHERSCAN_API,
    coinmarketcap: process.env.COIN_API
  },

  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    starknetSources: "./contracts",
    starknetArtifacts: "./starknet-artifacts",
    cairoPaths: ["/usr/local/lib/python3.9/site-package"],
  },
};

export default config;
