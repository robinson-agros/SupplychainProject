var SupplyChain = artifacts.require('SupplyChain')

contract("SupplyChain",function(accounts){
    var sku = 2
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"    
    //const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const buyerID = accounts[3]    
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])    
    console.log("Buyer: accounts[3] ", accounts[3])

    it("Testing smart contract funcionality seedItem that allow farmers to start seeding", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        

        await supplyChain.addFarmer(originFarmerID);

        await supplyChain.seedItem(upc, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, {from: originFarmerID})

        await supplyChain.getPastEvents("Seeded", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Seeded");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality growingItem that allow farmers to start grow their Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        

        //await supplyChain.addFarmer(originFarmerID);

        //await supplyChain.seedItem(upc, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, {from: originFarmerID})
        await supplyChain.growingItem(upc, {from:originFarmerID});

        await supplyChain.getPastEvents("Growing", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Growing");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality Harvesting Item that allow farmers to start Harvesting their Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        

        //await supplyChain.addFarmer(originFarmerID);

        //await supplyChain.seedItem(upc, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, {from: originFarmerID})
        await supplyChain.harvestItem(upc, productPrice, {from:originFarmerID});

        await supplyChain.getPastEvents("Harvested", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Harvested");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[1], productPrice, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[2], 2, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality Collecting Item that allow distributors to Collect Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        

        await supplyChain.addDistributor(distributorID);

        //await supplyChain.seedItem(upc, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, {from: originFarmerID})
        await supplyChain.collectItem(upc, {from:distributorID, value:productPrice});

        await supplyChain.getPastEvents("Collected", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Collected");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid farmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[1], productPrice, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[2], 3, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality Packing Item that allow distributors to Collect Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        
        await supplyChain.packItem(upc, {from:distributorID});

        await supplyChain.getPastEvents("Packed", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Packed");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid farmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[1], productPrice*2, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[2], 4, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality Advertise Item that allow distributors to Advertise Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        
        await supplyChain.advertiseItem(upc, {from:distributorID});

        await supplyChain.getPastEvents("Advertised", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Advertised");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid farmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[1], productPrice*2, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[2], 5, 'Error: Missing or Invalid originFarmLongitude')
    })

    it("Testing smart contract funcionality Buying Item that allow Buyers to Buy Crops", async() =>{
        const supplyChain = await SupplyChain.deployed()
        var eventEmmited = false
        

        await supplyChain.addBuyer(buyerID);

        await supplyChain.buyItem(upc, {from:buyerID, value:productPrice*3});

        await supplyChain.getPastEvents("Buyed", {fromBlock: 0, toBlock: "latest"},(err, res) => {            
            console.log(err, res)}).then((events)=>{
                eventEmitted = true;
                console.log("Buyed");
            })

        const resultBufferOne = await supplyChain.fetchItemBuffer.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], buyerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid farmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid farmerName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[1], productPrice*2, 'Error: Missing or Invalid productPrice')
        assert.equal(resultBufferTwo[2], 6, 'Error: Missing or Invalid originFarmLongitude')
    })

})
