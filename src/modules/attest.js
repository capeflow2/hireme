import { uport } from '../util/connectors.js';


export function attest(uportId, credentialName, credentialValue) {
  return async function(dispatch) {

    const toAttest = {
      sub: uportId,
      claim: { credentialName: credentialValue }
    };

    console.log('to attest', toAttest);

    try{
      var attest = await uport.attestCredentials(toAttest);

      console.log('attest result', attest);

      //dispatch({});
    }catch(e){
      console.log('attest error', e);
    }
  }
}
