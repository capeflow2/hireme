import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getOrganisations } from '../../modules/attest';
import { bindActionCreators } from 'redux'
import {Redirect} from 'react-router-dom';

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
      if (!this.props.profile)
          return (<Redirect to={{
              pathname: '/',
              state: { from: this.props.location }
          }}/>);
          return (
          <div className="full-height center-container">
              <h3>Attest a user</h3>
              <label>Uport Id</label>
              <input value={this.state.uportId} type="text" name="uportId" onChange={(e) => this.setInputValue(e)} />

              <label>Credential Name</label>
              <input value={this.state.credentialName} type="text" name="credentialName" onChange={(e) => this.setInputValue(e)} />

              <label>Credential Value</label>
              <input value={ this.state.credentialValue } type="text" name="credentialValue" id="credentialValue"  onChange={(e) => this.setInputValue(e)}/>

              <button onClick={(e) => this.submitAttestation(e)}>Attest</button>
          </div>
          );
  }
}

const mapStateToProps = state => ({
    profile:state.user.profile
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
