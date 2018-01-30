import React from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Attest from '../attest'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import '../../css/oswald.css'
import '../../css/open-sans.css'
import '../../css/pure-min.css'
import './App.css'

const App = (props) => (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/attest" component={Attest} />
    </div>
)

export default App
