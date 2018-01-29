import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {

  return async function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    try{
      var credentials;

      //move this check to something more convenient

      if (localStorage['credentials']){
        credentials = JSON.parse(localStorage['credentials']);
      } else {
        credentials = await uport.requestCredentials({
          requested: ['name', 'avatar', 'phone', 'country'],
        });

        localStorage.setItem('credentials', JSON.stringify(credentials));
      }

      //TODO: expire JWT
      console.log('credentails', credentials);

      dispatch(userLoggedIn(credentials))

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')


    }catch(e){
      console.log('credentials issue', e);
    }

  }
}
