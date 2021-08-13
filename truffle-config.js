const path = require("path");
var HDWallet = require("truffle-hdwallet-provider");
var mnemonic = "***";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      provider: function(){
        return new HDWallet(mnemonic, "https://rinkeby.infura.io/v3/1625bf9421f6416db6f0c1162d5e9d47");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,      
    }
  }, 
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
