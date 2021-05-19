const {Gateway, Wallets} = require('fabric-network');
// const {Gateway, Wallets} = function () {} // for webpage debug only
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {buildCAClient, registerAndEnrollUser, enrollAdmin} = require('./CAUtil');
const {buildCCPOrg1, buildWallet} = require('./AppUtil');

const channelName = 'fa-jason';
const chaincodeName = 'MedicalSystem';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'Org1';

class FBGateway{
    constructor() {
        console.log("[Fabric Gateway] Fabric Gateway constructs")
        if(!FBGateway.instance){
            //init
            const ccp = buildCCPOrg1();
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
            buildWallet(Wallets, walletPath).then((res)=>{
                let wallet = res
                this.gateway = new Gateway()
                enrollAdmin(caClient, wallet, mspOrg1).then(()=>{
                    registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1').then(r => {
                        // fixme: cannot connect because identity not found in wallet
                        this.gateway.connect(ccp, {
                            wallet,
                            identity: org1UserId,
                            discovery: {enabled: true, asLocalhost: true}
                            // using asLocalhost as this gateway is using a fabric network deployed locally
                        }).then(r => console.log(r),e=>console.log(e))
                        // Build a network instance based on the channel where the smart contract is deployed
                        this.gateway.getNetwork(channelName).then((res)=>{
                            if(res){
                                this.contract = res.getContract(chaincodeName)
                                console.log("contract=",this.contract)
                            }
                        }).catch(e=>{console.log(`[Fabric Gateway]register error:${e}`)})
                    })
                });
            }).catch(e=>{
                console.log(`[Fabric Gateway]register error:${e}`)
            })
            FBGateway.instance = this;
        }
        console.log("[Fabric Gateway] Fabric Gateway construction finished")
        return FBGateway.instance
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new FBGateway()
        }
        return this.instance
    }
    async submitTransaction(name){
        let arglist = []
        for (let i = 0; i < arguments.length; i++) {
            arglist.push(arguments[i].toString())
        }
        try {
            let result = await this.contract.submitTransaction(name, ...arglist)
            return result.toString()
        } catch (e) {
            console.log(`[Fabric Gateway] Successfully caught the error: \n    ${e}`);
        }
    }
    async evaluateTransaction(name){
        let arglist = []
        for (let i = 0; i < arguments.length; i++) {
            arglist.push(arguments[i].toString())
        }
        try {
            let result = await this.contract.submitTransaction(name, ...arglist)
            return result.toString()
        } catch (e) {
            console.log(`[Fabric Gateway] Successfully caught the error: \n    ${e}`);
        }
    }
    destroy(){
        this.gateway && this.gateway.disconnect()
        console.log(`[Fabric Gateway] Instance destroyed`)
    }
}

async function main() {
    let inst = new FBGateway()
    // while (true) {
    //     try {
    //         // await inst.submitTransaction("Init")
    //         // await instance.evaluateTransaction("GetAllDoctors")
    //         // await instance.evaluateTransaction("GetPatientInfoByPID","p3")
    //     } catch (e) {
    //         console.error(e)
    //         process.exit(-1)
    //         break;
    //     }
    // }
    inst.destroy()
}

main()