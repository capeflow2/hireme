import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../../user/ui/loginbutton/LoginButtonActions'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

const OnlyAuthLinks =
    <span>
        <li className="pure-menu-item">
            <Link to="/attest" className="pure-menu-link">Attest</Link>
        </li>
        <li className="pure-menu-item">
            <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
            <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
    </span>;

const OnlyGuestLinks =
    <span>
        <LoginButtonContainer />
    </span>;

class Home extends Component {

    componentWillMount(){
        console.log('user', this.props.profile);

        if (!this.props.profile){
            this.props.loginUser();
        }
    }

    render(){
        var {profile}= this.props;
        return (<div>
            <header>
            {this.props.profile ? OnlyAuthLinks : OnlyGuestLinks }
            <Link to="/">Home {profile ? profile.name : null}</Link>
    </header>
    <div>
        <main>
        </main>
    </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    profile:state.user.profile
})

const mapDispatchToProps = dispatch => bindActionCreators({
      loginUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
