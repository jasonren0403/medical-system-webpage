//todo: reinstall pkcs11js(currently node-gyp rebuild errored)
// const { Gateway, Wallets } = require('fabric-network');
// const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./CAUtil');
const { buildCCPOrg1, buildWallet } = require('./AppUtil');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

module.exports = {
    constructor() {
        try{
            this.register().then((res)=>{
                this.contract = res
                this.contract.submitTransaction('InitLedger')
            })
        }
        catch (e) {
            console.log(`error:${e}`)
        }
    },
    getInstance(){
        if(this.contract!==undefined){
            return this
        }
        this.constructor()
        return this
    },
    async register(){
        const ccp = buildCCPOrg1();
        /*
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
        const wallet = await buildWallet(Wallets, walletPath);
        await enrollAdmin(caClient, wallet, mspOrg1);
        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
        */
        try{

            /*
            gateway = new Gateway()
            await gateway.connect(ccp, {
                wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: true }
                // using asLocalhost as this gateway is using a fabric network deployed locally
            });
            // Build a network instance based on the channel where the smart contract is deployed
            const network = await gateway.getNetwork(channelName);
            return network.getContract(chaincodeName)
             */
        }catch(e){
            console.log(`error:${e}`)
        }
    },
    async submitTransaction(name) {
        let arglist = []
        for (let i = 0; i < arguments.length; i++) {
            arglist.push(arguments[i].toString())
        }
        try{
            let result = await this.contract.submitTransaction(name,...arglist)
            return result.toString()
        }catch(e){
            console.log(`*** Successfully caught the error: \n    ${e}`);
        }
    },
    async evaluateTransaction(name) {
        let arglist = []
        for (let i = 0; i < arguments.length; i++) {
            arglist.push(arguments[i].toString())
        }
        try {
            let result = await this.contract.submitTransaction(name,...arglist)
            return result.toString()
        }catch(e) {
            console.log(`*** Successfully caught the error: \n    ${e}`);
        }
    },
    delInstance() {
        this.gateway&&this.gateway.disconnect()
    }
}