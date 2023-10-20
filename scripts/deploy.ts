import { ethers } from "hardhat";

async function main() {

  const contract = await ethers.deployContract('GoodpromptRegistry', {
    gasLimit: 1000000
  });

  await contract.waitForDeployment();

  console.log("Contract deployed", contract);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
