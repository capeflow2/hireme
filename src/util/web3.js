import Web3 from 'web3';
import attestationContract from '../abis/Attestation.json';

var web3;// = new Web3();


if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

export const getAttestationContract = () => {

  var contract = new web3.eth.Contract(attestationContract.abi, "0x12334cFF2F19cc1a86FDfb7c1516242dF75ecE9e");

  return contract;
}

export default web3;
