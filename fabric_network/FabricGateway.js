const { Gateway, Wallets } = require('fabric-network');
// const {Gateway, Wallets} = function () {} // for webpage debug only
// const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./CAUtil');
const { buildCCPOrg1, buildWallet } = require('./AppUtil');

const channelName = 'fa-jason';
const chaincodeName = 'MedicalSystem';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

let FabricInstance = (function(){
    let instance = null;
    return function(){
        if(instance!==undefined){
            return instance
        }
        console.log("[Fabric Gateway] Fabric Gateway constructs")
        try{
            this.register().then((res)=>{
                if(res!==undefined){
                    this.contract = res
                    this.contract.submitTransaction('Init')
                }
            })
        }
        catch (e) {
            console.log(`[Fabric Gateway] error:${e}`)
        }
        return instance = this;
    }
})()

FabricInstance.prototype.register = async function(){
    const ccp = buildCCPOrg1();

    // const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);
    // await enrollAdmin(caClient, wallet, mspOrg1);
    // await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

    try{
        this.gateway = new Gateway()
        await this.gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true }
            // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        // Build a network instance based on the channel where the smart contract is deployed
        const network = await this.gateway.getNetwork(channelName);
        return network.getContract(chaincodeName)

    }catch(e){
        console.log(`[Fabric Gateway]error:${e}`)
    }
}

FabricInstance.prototype.submitTransaction = async function(name){
    let arglist = []
    for (let i = 0; i < arguments.length; i++) {
        arglist.push(arguments[i].toString())
    }
    try{
        let result = await this.contract.submitTransaction(name,...arglist)
        return result.toString()
    }catch(e){
        console.log(`[Fabric Gateway]Successfully caught the error: \n    ${e}`);
    }
}

FabricInstance.prototype.evaluateTransaction = async function(name){
    let arglist = []
    for (let i = 0; i < arguments.length; i++) {
        arglist.push(arguments[i].toString())
    }
    try {
        let result = await this.contract.submitTransaction(name,...arglist)
        return result.toString()
    }catch(e) {
        console.log(`[Fabric Gateway]Successfully caught the error: \n    ${e}`);
    }
}

FabricInstance.prototype.destroy = function(){
    this.gateway && this.gateway.disconnect()
    console.log(`[Fabric Gateway]Instance destroyed`)
}
export default FabricInstance