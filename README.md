# 这是什么？
* 本项目改造自[easonyq/vue-nodejs-template](https://github.com/easonyq/vue-nodejs-template "")，是使用Vue.js和Node.js(koa)的一体化项目
* 本项目用于[medical-system-chaincode](https://github.com/jasonren0403/medical-system-chaincode "")的前端及中间接口实现


# 启动项目

* `npm run dev` - 启动开发服务器，端口 8000 （可以在配置中修改）

* `npm run build` - 进行构建，把 Vue 部分生成到 `/vue-dist`

* `npm run start` - 用生产模式启动构建后的项目

# API返回
* 统一格式
  1. 成功返回
    ```json5
    {
        "success": true,
        "content": {}
    }
    ```
  2. 失败返回
    ```json5
    {
        "success": false,
        "message": "",  // 错误信息
        "type": ""   // 错误类型
    }
    ```
# Gateway usage（备用）
* 要点，获取`contract`对象，利用`contract.submitTransaction('合约名称',...params)`提交交易信息，需要返回值时，使用`contract.evaluateTransaction('合约名称',...params)`
```js
// Create a new gateway instance for interacting with the fabric network.
// In a real application this would be done as the backend server session is setup for
// a user that has been verified.
const gateway = new Gateway();
// setup the gateway instance
// The user will now be able to create connections to the fabric network and be able to
// submit transactions and query. All transactions submitted by this gateway will be
// signed by this user using the credentials stored in the wallet.
await gateway.connect(ccp, {
    wallet,
    identity: org1UserId,
    discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
});

// Build a network instance based on the channel where the smart contract is deployed
const network = await gateway.getNetwork(channelName);

// Get the contract from the network.
const contract = network.getContract(chaincodeName);
// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
// This type of transaction would only be run once by an application the first time it was started after it
// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
// an "init" type function.
await contract.submitTransaction('InitLedger');
// Let's try a query type operation (function).
// This will be sent to just one peer and the results will be shown.
let result = await contract.evaluateTransaction('GetAllAssets');
// Now let's try to submit a transaction.
// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
// to the orderer to be committed by each of the peer's to the channel ledger.
console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
result = await contract.submitTransaction('CreateAsset', 'asset13', 'yellow', '5', 'Tom', '1300');
// Disconnect from the gateway when the application is closing
// This will close all connections to the network
gateway.disconnect();
```
