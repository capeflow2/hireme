import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import registerOrganisation from './register-organisation'
import claims from './claims'
import verifyClaims from './verify-claims'

export default combineReducers({
  router: routerReducer,
  user,
  registerOrganisation,
  claims,
  verifyClaims
})
