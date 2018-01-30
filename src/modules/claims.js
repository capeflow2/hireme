import { uport } from '../util/connectors.js';
import web3 from '../util/web3';
import Accounts from 'web3-eth-accounts';

import {getAttestationContract} from '../util/web3.js';

const SET_ORGANISATIONS = "SET_ORGANISATIONS";
const GETTING_ORGANISATIONS = "GETTING_ORGANISATIONS";

const initialState = { busy: false, organisations: [] };

const claims = (state = initialState, action) => {
  switch (action.type){
  case GETTING_ORGANISATIONS:{
    return {...state, busy:true};
  }
  case SET_ORGANISATIONS:{
    return {...state, organisations: action.value, busy: false};
  }
  default:{
    return state;
  }
  }
};

export default claims;

export function getOrganisations(){
  return async function(dispatch) {
    dispatch({type: GETTING_ORGANISATIONS});

    var contract = getAttestationContract();
    var accounts = new Accounts(web3);

    var count = await contract.methods.getOrgsCount().call();

    var organisations = [];

    for (var i = 0; i < count; i++){
      var org = await contract.methods.orgs(i).call();
      if (org.name){
        console.log('org', org);
        organisations.push({name:org.name, orgAddress:org.owner, uportId: org.uportId, registrationNumber: org.registrationNumber});
      }
    }

    dispatch({type: SET_ORGANISATIONS, value: organisations});

    //var orgsCount = await contract.methods.getOrgsCount.call();
    //console.log('orgs count', orgsCount);
  }
}

//await contract.addClaim(name, org, claimant, true, uportId);
export function addClaim(name, orgAddress, isPublic, uportId) {
  return async function(dispatch){
    var accounts = await web3.eth.getAccounts();
    var address = accounts[0];

    var contract = getAttestationContract();

    var claimId = await contract.methods.addClaim(name, orgAddress, address, isPublic, uportId).send({from: accounts[0]});

    console.log('claimId', claimId);
  }
}

// export function attest(uportId, credentialName, credentialValue) {
//   return async function(dispatch) {

//     const toAttest = {
//       sub: uportId,
//       claim: { credentialName: credentialValue }
//     };

//     try{
//       var attest = await uport.attestCredentials(toAttest);

//       //dispatch({});
//     }catch(e){
//       console.log('attest error', e);
//     }
//   }
// }
