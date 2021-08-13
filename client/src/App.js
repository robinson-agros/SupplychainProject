import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, sku: null, upc: null, messages:"Hello!", actorAddress:"null", farmPrice:null, productPrice: null, upcFetch:null,
farmerName:null, farmName:null, farmLat:null, farmLon:null, upcProduct:null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log(accounts);
    
  };

  createFarmer = async(event) =>{
    const { accounts, contract } = this.state;    
    await contract.methods.addFarmer(this.state.actorAddress).send({from: accounts[0]});
    this.setState({messages:"New Farmer Added"})
  }

  createDistributor = async(event) =>{
    const { accounts, contract } = this.state;    
    await contract.methods.addDistributor(this.state.actorAddress).send({from: accounts[0]});
    this.setState({messages:"New Distributor Added"})
  }

  createBuyer = async(event) =>{
    const { accounts, contract } = this.state;    
    await contract.methods.addBuyer(this.state.actorAddress).send({from: accounts[0]});
    this.setState({messages:"New Buyer Added"})
  }

  onChangeAddressActor(event){
    this.setState({actorAddress:event.target.value});
  }

  onChangeUPC(event){
    this.setState({upc:event.target.value});
  }

  onChangeUPCFetch(event){
    this.setState({upcFetch:event.target.value});
  }

  onChangeFarmPrice(event){
    this.setState({farmerPrice:event.target.value});
  }

  onChangeFarmerName(event){
    this.setState({farmerName:event.target.value});
  }

  onChangeFarmName(event){
    this.setState({farmName:event.target.value});
  }

  onChangeFarmerLat(event){
    this.setState({farmLat:event.target.value});
  }

  onChangeFarmerLon(event){
    this.setState({farmLon:event.target.value});
  }

  onChangeProductPrice(event){
    this.setState({productPrice:event.target.value});
  }

  onChangeUPCProduct(event){
    this.setState({upcProduct:event.target.value});
  }

  seed = async(event) =>{
    const { accounts, contract, upc, farmerName, farmName, farmLat, farmLon} = this.state;
    console.log(this.state);    
    await contract.methods.seedItem(upc, farmerName, farmName, farmLat, farmLon).send({from: accounts[0]});
    console.log("Seeded!");
  }

  grow = async(event) =>{
    const { accounts, contract, upc, farmerName, farmName, farmLat, farmLon} = this.state;    
    await contract.methods.growingItem(upc).send({from: accounts[0]});
    console.log("Growing!");
  }

  harvest = async(event) =>{
    const { accounts, contract, upc, farmerPrice} = this.state;    
    await contract.methods.harvestItem(upc, farmerPrice).send({from: accounts[0]});
    console.log("Harvested!");
  }

  collect = async(event) =>{
    const { accounts, contract, upc, productPrice} = this.state;    
    await contract.methods.collectItem(upc).send({from: accounts[0], value:productPrice});
    console.log("Collected");
  }

  pack = async(event) =>{
    const { accounts, contract, upc} = this.state;        
    await contract.methods.packItem(upc).send({from: accounts[0]});
    console.log("Packed");
  }

  advertise = async(event)=>{
    const { accounts, contract, upc} = this.state;        
    await contract.methods.advertiseItem(upc).send({from: accounts[0]});
    console.log("Advertised");
  }

  buy = async(event) =>{
    const { accounts, contract, upc, productPrice} = this.state;
    await contract.methods.buyItem(upc).send({from: accounts[0], value:productPrice});
    console.log("Bought");
  }

  fetchData1 = async(event) =>{
    const {contract, upcFetch} = this.state;
    var result = await contract.methods.fetchItemBuffer(upcFetch).call();
    console.log(result);
  }
  
  fetchData2 = async(event) =>{
    const {contract, upcFetch} = this.state;
    var result = await contract.methods.fetchItemBufferTwo(upcFetch).call();
    console.log(result)
  }



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="container">
          <h1>Supply Chain Testing</h1>
          <hr></hr>
          <p>Prove the authenticity of a crop using the Ethereum blockchain.</p>
        </div>
        <div className="ftc-harvest">
          <h2>Actors Creation</h2>
          <div className="form-group">                          
            <label>Put Here Actor's Address</label>
              <input type="text" onChange={this.onChangeAddressActor.bind(this)} ></input>
              <div>
                <button onClick={this.createFarmer.bind(this)} >Create Farmer</button>
                <button onClick={this.createDistributor.bind(this)}>Create Distributor</button>
                <button onClick={this.createBuyer.bind(this)}>Create Buyer</button>
              </div>  
            <label>{this.state.messages}</label>                        
          </div>
          <h2>Product Overview</h2>
          <div className="form-group">            
            UPC
            <br></br>
            <input onChange={this.onChangeUPCFetch.bind(this)} ></input>
            <br></br>
            <div>            
                <button onClick={this.fetchData1.bind(this)}>Fetch Data 1</button>
                <button onClick={this.fetchData2.bind(this)}>Fetch Data 2</button>
            </div>                     
          </div>
          <div className="form-break"></div>
          <h2>Farm Details</h2>
          <div className="form-group">
            UPC
            <br></br>
            <input type="text" onChange={this.onChangeUPC.bind(this)}></input>
            <br></br>          
            Price
            <br></br>
            <input type="text" onChange={this.onChangeFarmPrice.bind(this)}></input>
            <br></br>          
            Farmer Name
            <br></br>
            <input type="text" onChange={this.onChangeFarmerName.bind(this)}></input>
            <br></br>
            Farm Name
            <br></br>
            <input type="text" onChange={this.onChangeFarmName.bind(this)}></input>
            <br></br>
            Farm Latitude
            <br></br>
            <input type="text" onChange={this.onChangeFarmerLat.bind(this)}></input>
            <br></br>
            Farm Longitude
            <br></br>
            <input type="text" onChange={this.onChangeFarmerLon.bind(this)}></input>
            <br></br>
            <button onClick={this.seed.bind(this)}>Seed</button>
            <button onClick={this.grow.bind(this)}>Grow</button>
            <button onClick={this.harvest.bind(this)}>Harvest</button>            
          </div>
          <div className="form-break"></div>
          <h2>Product Details</h2>
          <div className="form-group">
            UPC
            <br></br>
            <input onChange={this.onChangeUPCProduct.bind(this)}></input>
            <br></br>
            Product Price
            <br></br>
            <input onChange={this.onChangeProductPrice.bind(this)}></input>
            <br></br>
            <button onClick={this.collect.bind(this)}>Collect</button>
            <button onClick={this.pack.bind(this)}>Pack</button>                                    
            <button onClick={this.advertise.bind(this)}>Advertise</button>
            <button onClick={this.buy.bind(this)}>Buy</button>            
          </div>

        <h2>Transaction Hsitory</h2> 
        <div>
          <ul>

          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
