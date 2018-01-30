import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import registerOrganisation from './register-organisation'

export default combineReducers({
  router: routerReducer,
  user,
  registerOrganisation
})
