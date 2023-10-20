import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//use dot env
import 'dotenv/config'

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.matic.today", // Polygon Mumbai RPC URL
      accounts: {
        mnemonic: process.env.MNEMOMIC_PHRASE, // Replace with your mnemonic phrase
      },
    },
  }
};

export default config;