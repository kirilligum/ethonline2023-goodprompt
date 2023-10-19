const hre = require("hardhat");

async function main() {
  const JsonStorage = await hre.ethers.getContractFactory("JsonStorage");
  const jsonStorage = await JsonStorage.deploy();
  await jsonStorage.deployed();

  console.log("JsonStorage deployed to:", jsonStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
