import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import labels from '../../constants/labels'

import './form.css'

class RegisterOrg extends Component {

  constructor(props){
    super(props)
    this.state = {
      name:"",
      regNumber:"",
      uportId: props.profile ? props.profile.address : "",
    };
  }

  render(){
    return (
      <div className="contact-reg center-container full-height">
			<form className="contact100-form validate-form">
				<div className="wrap-input100 validate-input" data-validate="Name is required">
					<span className="label-input100">{labels.ENTER_ORG_NAME}</span>
					<input className="input100" type="text" name="name" placeholder={labels.ENTER_ORG_NAME_PLACEHOLDER}/>
					<span className="focus-input100"></span>
				</div>

				<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
					<span className="label-input100">{labels.ENTER_EMAIL}</span>
          <input className="input100" type="text" name="email" placeholder={labels.ENTER_EMAIL_PLACEHOLDER}/>
          <span className="focus-input100"></span>
				</div>

				<div className="container-contact100-form-btn">
					<button className="contact100-form-btn">
						<span>
							{labels.REGISTER_AS_ORG}
							<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile:state.user.profile
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterOrg);
