const initialState = {
  profile: null
}

const user = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      profile: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      profile: null
    })
  }

  return state
}

export default user
