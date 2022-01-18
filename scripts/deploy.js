const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account: ", deployer.address
  );

  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const Telephone = await ethers.getContractFactory("Telephone");
  const telephone = await Telephone.deploy();
  console.log("Telephone address: ", await telephone.address);
  console.log("Account balance after Telephone deploy: ", (await deployer.getBalance()).toString());

  const TelephoneAttack = await ethers.getContractFactory("TelephoneAttack");
  const telephoneAttack = await TelephoneAttack.deploy();
  console.log("TelephoneAttack address: ", await telephoneAttack.address);
  console.log("Account balance after Telephone deploy: ", (await deployer.getBalance()).toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
