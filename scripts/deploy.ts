const hre = require("hardhat");

async function main() {
  const GoodpromptRegistry = await hre.ethers.getContractFactory("GoodpromptRegistry");
  const contract = await GoodpromptRegistry.deploy();

  await contract.waitForDeployment();


  console.log(contract)

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
