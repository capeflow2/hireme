import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getOrganisations } from '../../modules/claims';
import { bindActionCreators } from 'redux'
import {Redirect} from 'react-router-dom';
import labels from '../../constants/labels';
import { RingLoader } from 'react-spinners';

class AddClaim extends Component{

  constructor(props){
    super(props);

    this.state = {
      uportId : props.profile ? props.profile.address : "",
      credentialName : "",
      credentialValue : ""
    };

  }

    componentWillMount(){
        this.props.getOrganisations();
    }

  setInputValue(event){
    event.preventDefault();

    const target = event.target;
    const type = target.type;
    const value = target.value;

    const name = target.name;

    var newState = {...this.state};

    newState[name] = type == "number" ? Number(value) : value;

    this.setState(newState);
  }

  submitAttestation(event){
      event.preventDefault();

    var { uportId, credentialName, credentialValue} = this.state;
    this.props.attest(uportId, credentialName, credentialName);

  }

  render(){

      var a = this.props;


      if (!this.props.profile) {
              return (<Redirect to={{
                  pathname: '/',
                  state: { from: this.props.location }
              }}/>);
          }

      else if (this.props.claims.busy || !this.props.claims.organisations){
          return (<div className="full-height center-container">
              <RingLoader
                  color={'#000000'}
                  loading={this.props.claims.busy}
              />

              Please wait while we are retrieving the organisations.
          </div>);
      }else if (this.props.claims.organisations){
          return (
          <div className="full-height center-container">
                  <form className="contact100-form validate-form">
                      <div className="wrap-input100 validate-input" data-validate="Name is required">
                          <span className="label-input100">{labels.SELECT_ORGANISATION}</span>
              <select>
                  {this.props.claims.organisations.map(o => <option key={o.name} value={o.uportId}>{o.name}</option>)}
              </select>
                      </div>

                      <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                          <span className="label-input100">{labels.ENTER_CLAIM}</span>

                          <input onChange={(e) => this.setInputValue(e)} className="input100" type="text" name="name" placeholder={labels.ENTER_CLAIM_PLACEHOLDER}/>
                          <span className="focus-input100"></span>
                      </div>

                      <div className="container-contact100-form-btn">
                          <button onClick={(e) => {e.preventDefault(); this.registerOrg(); }} className="contact100-form-btn">
						                  <span>
							                    {labels.SUBMIT_PROOF_OF_SKILL}
							                    <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
						                  </span>
					                </button>
				              </div>
			            </form>

                  {/* <h3>Attest a user</h3>
                      <label>Uport Id</label>
                      <input value={this.state.uportId} type="text" name="uportId" onChange={(e) => this.setInputValue(e)} />

                      <label>Credential Name</label>
                      <input value={this.state.credentialName} type="text" name="credentialName" onChange={(e) => this.setInputValue(e)} />

                      <label>Credential Value</label>
                      <input value={ this.state.credentialValue } type="text" name="credentialValue" id="credentialValue"  onChange={(e) => this.setInputValue(e)}/>

                      <button onClick={(e) => this.submitAttestation(e)}>Attest</button> */}
          </div>
          );
          
      }
  }
}

const mapStateToProps = state => ({
    profile:state.user.profile,
    claims:state.claims
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getOrganisations
        //attest
    },dispatch);

const AddClaimContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClaim);

export default AddClaimContainer;
