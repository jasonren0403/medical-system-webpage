/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

exports.buildCCPOrg1 = () => {
    // build a JSON object from the file contents
    const ccp = {
        "name": "first-network-org1",
        "version": "1.0.0",
        "client": {
            "organization": "Org1",
            "connection": {
                "timeout": {
                    "peer": {
                        "endorser": "300"
                    }
                }
            }
        },
        "organizations": {
            "Org1": {
                "mspid": "Org1MSP",
                "peers": [
                    "peer0.org1.example.com",
                    "peer1.org1.example.com"
                ],
                "certificateAuthorities": [
                    "ca.org1.example.com"
                ]
            }
        },
        "peers": {
            "peer0.org1.example.com": {
                "url": "grpcs://localhost:7051",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem"
                },
                "grpcOptions": {
                    "ssl-target-name-override": "peer0.org1.example.com"
                }
            },
            "peer1.org1.example.com": {
                "url": "grpcs://localhost:8051",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem"
                },
                "grpcOptions": {
                    "ssl-target-name-override": "peer1.org1.example.com"
                }
            }
        },
        "certificateAuthorities": {
            "ca.org1.example.com": {
                "url": "https://localhost:7054",
                "caName": "ca-org1",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem"
                },
                "httpOptions": {
                    "verify": false
                }
            }
        }
    }
    console.log(`Loaded the network configuration CCPOrg1`);
    return ccp;
};

exports.buildCCPOrg2 = () => {
    const ccp = {
        "name": "first-network-org2",
        "version": "1.0.0",
        "client": {
            "organization": "Org2",
            "connection": {
                "timeout": {
                    "peer": {
                        "endorser": "300"
                    }
                }
            }
        },
        "organizations": {
            "Org2": {
                "mspid": "Org2MSP",
                "peers": [
                    "peer0.org2.example.com",
                    "peer1.org2.example.com"
                ],
                "certificateAuthorities": [
                    "ca.org2.example.com"
                ]
            }
        },
        "peers": {
            "peer0.org2.example.com": {
                "url": "grpcs://localhost:9051",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem"
                },
                "grpcOptions": {
                    "ssl-target-name-override": "peer0.org2.example.com"
                }
            },
            "peer1.org2.example.com": {
                "url": "grpcs://localhost:10051",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem"
                },
                "grpcOptions": {
                    "ssl-target-name-override": "peer1.org2.example.com"
                }
            }
        },
        "certificateAuthorities": {
            "ca.org2.example.com": {
                "url": "https://localhost:8054",
                "caName": "ca-org2",
                "tlsCACerts": {
                    "path": "crypto-config/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem"
                },
                "httpOptions": {
                    "verify": false
                }
            }
        }
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