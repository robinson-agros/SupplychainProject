// migrating the appropriate contracts
var FarmerRole = artifacts.require("./FarmerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var BuyerRole = artifacts.require("./BuyerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");
var ownable = artifacts.require("./Ownable.sol");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(BuyerRole);
  deployer.deploy(SupplyChain);
  deployer.deploy(ownable);  
};
