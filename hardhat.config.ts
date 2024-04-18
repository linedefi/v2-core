import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import { task, types } from 'hardhat/config'

if (!process.env.DEPLOYER) throw new Error("DEPLOYER not found. Set DEPLOYER to the .env file");
const deployer = process.env.DEPLOYER;

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not found. Set PRIVATE_KEY to the .env file");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.LINEA_RPC_URL) throw new Error("LINEA_RPC_URL not found. Set LINEA_RPC_URL to the .env file");
const LINEA_RPC_URL = process.env.LINEA_RPC_URL;

task('token-name', 'Add fee tier')
  .setAction(async (taskArgs, hre) => {
    const { getNamedAccounts, ethers, deployments } = hre
    const factory = await ethers.getContract('UniswapV2Factory')
    console.log(await factory.pairCodeHash());
    // const pair = await ethers.getContractAt(abi, '0x879D5E99cFaf7A50F9Fef18B1b69f382A4Df8537')
    // console.log(await pair.name());
    
  })

const config = {
  networks: {
    linea: {
      url: LINEA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 59144,
      live: true,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer,
    alice: {
      default: 1,
    },
    bob: {
      default: 2,
    },
    carol: {
      default: 3,
    },
    dev: {
      default: 4,
    },
    feeTo: {
      default: 5,
    },
  },
  etherscan: {
    apiKey: {
      linea: 'W9EEZBTK4YQC8PMZNJ75C6QI126D25ZVV4',
    },
    customChains: [
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build/"
        }
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
