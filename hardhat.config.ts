import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
      gasPrice: 8000000000,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};

export default config;