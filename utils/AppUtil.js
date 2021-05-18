/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

exports.buildCCPOrg1 = () => {
    // build a JSON object from the file contents
    const ccp = {
        "PeerOrgs": [
            {
                "Name": "Org1",
                "Domain": "org1.example.com",
                "EnableNodeOUs": true,
                "Template": {
                    "Count": 1,
                    "SANS": [
                        "localhost"
                    ]
                },
                "Users": {
                    "Count": 1
                }
            }
        ]
    };
    console.log(`Loaded the network configuration CCPOrg1`);
    return ccp;
};

exports.buildCCPOrg2 = () => {
    const ccp = {
        "PeerOrgs": [
            {
                "Name": "Org2",
                "Domain": "org2.example.com",
                "EnableNodeOUs": true,
                "Template": {
                    "Count": 1,
                    "SANS": [
                        "localhost"
                    ]
                },
                "Users": {
                    "Count": 1
                }
            }
        ]
    }
    console.log(`Loaded the network configuration located at CCPOorg2`);
    return ccp;
};

exports.buildWallet = async (Wallets, walletPath) => {
    // Create a new wallet : Note that wallet is for managing identities.
    let wallet;
    if (walletPath) {
        wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Built a file system wallet at ${walletPath}`);
    } else {
        wallet = await Wallets.newInMemoryWallet();
        console.log('Built an in memory wallet');
    }

    return wallet;
};

exports.prettyJSONString = (inputString) => {
    if (inputString) {
        return JSON.stringify(JSON.parse(inputString), null, 2);
    } else {
        return inputString;
    }
}