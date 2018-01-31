import web3 from '../util/web3';
import getAccounts from '../util/get-accounts'

import {getAttestationContract} from '../util/web3.js';

const GETTING_USER_CLAIMS = "GETTING_USER_CLAIMS";
const SET_USER_CLAIMS = "SET_USER_CLAIMS";

const initialState = { loading: false, claims: []};

const viewSkills = (state = initialState, action) => {
  switch (action.type){
  case GETTING_USER_CLAIMS:{
    return {...state, busy:true};
  }
  case SET_USER_CLAIMS:{
    return {...state, loading:false, claims: action.value};
  }
  default:{
    return state;
  }
  }
};

export default viewSkills;

export function getClaimsForUser(userAddress){
  return async function(dispatch) {
    dispatch({type: GETTING_USER_CLAIMS});

    var contract = getAttestationContract();
    var accounts = await getAccounts();

    var orgAddress = accounts[0];
    var userAddress = accounts[0];

    var count = await contract.methods.getClaimsCount().call();

    var claims = [];

    for (var i = 0; i < count; i++){
      var claim = await contract.methods.claims(i).call();
      if (claim.claimant === userAddress){
        claims.push({...claim, id: i});
      }
    }

    dispatch({type: SET_USER_CLAIMS, value: claims});
  }
}
