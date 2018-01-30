//import { web3 } from '../util/connectors.js';
import attestationContract from '../abis/Attestation.json';
import Web3 from 'web3';
import contract from 'truffle-contract';

var web3;// = new Web3();

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  console.log('setting localhost');
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

async function MyContractSetup () {
  let MyContractABI = new web3.eth.Contract(attestationContract.abi);
  //let MyContractObj = MyContractABI.at("0x12334cFF2F19cc1a86FDfb7c1516242dF75ecE9e");
  return MyContractObj;
}

export const registerOrg = (uportId, name, registrationNumber) => {
  return async dispatch => {
    console.log('w', web3);



    // web3.net.getListening(function(a,c) {
    //   console.log('c', c);
    // });

    //let StatusContract = contract(require('../abis/Attestation.json'));
    //StatusContract.setProvider(web3.currentProvider);
    const MyContract = await MyContractSetup();

    //let address = web3.eth.defaultAccount;
    //console.log("web3.eth.defaultAccount:"+address);

    //let statusContractInstance;
    //var c = await StatusContract.deployed();
    //console.log("c = ", c);

    var add = await MyContract.addOrganisation(uportId, name, registrationNumber, function(err, res) {
      console.log('err', err);
      console.log('r',res);
    });
  };
}
