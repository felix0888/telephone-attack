const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Telephone", function() {
  let Telephone, telephone;
  let owner, signers;

  beforeEach(async function() {
    [owner, signers] = await ethers.getSigners();
    Telephone = await ethers.getContractFactory("Telephone");
    telephone = await Telephone.deploy();
  });

  describe("deployment", function() {
    it("should set the owner", async function() {
      expect(await telephone.owner()).to.equal(owner.address);
    });
  });
});
