import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../../user/ui/loginbutton/LoginButtonActions'

import labels from '../../constants/labels'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

const OnlyAuthLinks =
    <div class="full-height center-container">
        <Link to="/addclaim" className="btn">{ labels.ADD_PROOF_OF_SKILL }</Link>
        <Link to="/registerorg" className="btn">{ labels.REGISTER_AS_ORG }</Link>
        <Link to="/profile" className="btn">{ labels.VIEW_PROFILE }</Link>
        <LogoutButtonContainer />
    </div>;

class Home extends Component {

    componentWillMount(){
        if (!this.props.profile){
            this.props.loginUser();
        }
    }

    componentWillReceiveProps(nextProps){
        if (!this.props.profile && !nextProps.profile){
            this.props.loginUser();
        }
    }

    render(){
        var {profile}= this.props;
        return (
        <div className="full-height">
            {this.props.profile ? OnlyAuthLinks : null }
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
