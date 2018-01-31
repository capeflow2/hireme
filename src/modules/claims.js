import { uport } from '../util/connectors.js';
import web3 from '../util/web3';
import getAccounts from '../util/get-accounts'

import {getAttestationContract} from '../util/web3.js';

const SET_ORGANISATIONS = "SET_ORGANISATIONS";
const GETTING_ORGANISATIONS = "GETTING_ORGANISATIONS";
const ADDING_CLAIM = "ADDING_CLAIM";
const CLAIM_ADDED = "CLAIM_ADDED";

const initialState = { loading: true, addingClaim:false, claimAddedResult:null, organisations: [] };

const claims = (state = initialState, action) => {
  switch (action.type){
  case ADDING_CLAIM:{
    return {...state, addingClaim:true};
  }
  case CLAIM_ADDED:{
    return {...state, addingClaim:false, loading:false, claimAddedResult: action.value};
  }
  case GETTING_ORGANISATIONS:{
    return {...state, loading:true};
  }
  case SET_ORGANISATIONS:{
    return {...state, organisations: action.value, loading: false};
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
    var contract;

    try{
      var contract = getAttestationContract();
    }catch(e){
      alert('could not get contract', e);
      return;
    }

    var accounts = await getAccounts();

    var count = await contract.methods.getOrgsCount().call();

    var organisations = [];

    for (var i = 0; i < count; i++){
      try{
        var org = await contract.methods.orgs(i).call({from: accounts[0]});
        if (org.name && org.owner){
          organisations.push({name:org.name, orgAddress:org.owner, uportId: org.uportId, registrationNumber: org.registrationNumber});
        }
      }catch(e){
        console.log(e);
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
    dispatch({type:ADDING_CLAIM});
    var accounts = await web3.eth.getAccounts();
    var address = accounts[0];

    var contract = getAttestationContract();

    var res = await contract.methods.addClaim(name, orgAddress, address, isPublic, uportId).send({from: accounts[0]});

    console.log('res', res);
    dispatch({type:CLAIM_ADDED, value:res});
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
