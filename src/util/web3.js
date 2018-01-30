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
  var oldAddress = "0x12334cFF2F19cc1a86FDfb7c1516242dF75ecE9e";

  var address = "0x0fd4701d115bf16fa042417f6dc5b9b6d3a32721";
  var contract = new web3.eth.Contract(attestationContract.abi, address);

  return contract;
}

export default web3;
