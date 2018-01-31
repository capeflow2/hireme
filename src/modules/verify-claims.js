import web3 from '../util/web3';
import getAccounts from '../util/get-accounts'

import {getAttestationContract} from '../util/web3.js';

const VERIFY_CLAIM = "VERIFY_CLAIM";
const VERIFY_CLAIM_INITIATED = "VERIFY_CLAIM_INITIATED";
const GETTING_UNVERIFIED_CLAIMS = "GETTING_UNVERIFIED_CLAIMS";
const SET_UNVERIFIED_CLAIMS = "SET_UNVERIFIED_CLAIMS";

const initialState = { busy: true, unverifiedClaims: [] };

const verifyClaims = (state = initialState, action) => {
  switch (action.type){
  case GETTING_UNVERIFIED_CLAIMS:{
    return {...state, busy:true};
  }
  case SET_UNVERIFIED_CLAIMS:{
    return {...state, busy:false, unverifiedClaims:action.value};
  }
  default:{
    return state;
  }
  }
};

export default verifyClaims;

export function getUnverifiedClaims(){
  return async function(dispatch) {
    dispatch({type: GETTING_UNVERIFIED_CLAIMS});

    var contract = getAttestationContract();
    var accounts = await getAccounts();
    console.log("accounts = ", accounts);

    var orgAddress = accounts[0];

    var count = await contract.methods.getClaimsCount().call();

    var claims = [];

    for (var i = 0; i < count; i++){
      var claim = await contract.methods.claims(i).call();
      console.log(claim);
      if (claim.organisation === accounts[0] && !claim.verified){
        claims.push({...claim, id: i});
      }
    }

    console.log('claims', claims);

    dispatch({type: SET_UNVERIFIED_CLAIMS, value: claims});
  }
}

//await contract.addClaim(name, org, claimant, true, uportId);
export function verifyClaim(id) {
  return async function(dispatch){
    var accounts = await web3.eth.getAccounts();
    var address = accounts[0];

    var contract = getAttestationContract();

    var claimId = await contract.methods.verifyClaim(id).send({from: accounts[0]});
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
