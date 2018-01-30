import { uport } from '../util/connectors.js';
import web3 from '../util/web3';
import Accounts from 'web3-eth-accounts';

import {getAttestationContract} from '../util/web3.js';

export function getOrganisations(){
  return async function(dispatch) {
    var contract = getAttestationContract();
    var accounts = new Accounts(web3);

    var count = await contract.methods.getOrgsCount().call();
    console.log('count result', count);

    var organisations = [];

    for (var i = 0; i < count; i++){
      var org = await contract.methods.orgs(i).call();
      organisations.push(org);
    }

    console.log(organisations);

    //var orgsCount = await contract.methods.getOrgsCount.call();
    //console.log('orgs count', orgsCount);
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
