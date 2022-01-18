const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TelephoneAttack", function() {
  let Telephone, telephone, TelephoneAttack, telephoneAttack;
  let owner, attacker, alice, signers;

  beforeEach(async function() {
    [owner, attacker, alice, signers] = await ethers.getSigners();
    Telephone = await ethers.getContractFactory("Telephone");
    telephone = await Telephone.deploy();
    TelephoneAttack = await ethers.getContractFactory("TelephoneAttack");
    telephoneAttack = await TelephoneAttack.connect(attacker).deploy();
  });

  describe("deployment", function() {
    it("should set the attacker", async function() {
      expect(await telephoneAttack.attacker()).to.equal(attacker.address);
    });
  });

  describe("#attack", function() {
    it("should be reverted if non-attacker tries", async function() {
      await expect(
        telephoneAttack.connect(alice).attack(telephone.address)
      ).to.be.revertedWith(
        "TelephoneAttack: NOT_OWNER"
      );
    });

    it("should change the owner of Telephone contract", async function() {
      expect(await telephone.owner()).to.equal(owner.address);
      await telephoneAttack.connect(attacker).attack(telephone.address);
      expect(await telephone.owner()).to.equal(attacker.address);
    });
  });
});
