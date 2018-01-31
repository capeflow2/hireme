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
  //var address = "0xba930bb471be501ee0ce7dc48edc2ea851b00ddd";

  var address = "0xc4a24e29985031c5f0a7a518167c0b91f7d4638d";

  var contract = new web3.eth.Contract(attestationContract.abi, address);

  return contract;
}

export default web3;
