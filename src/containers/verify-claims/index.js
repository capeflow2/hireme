import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';
import moment from 'moment';

import { verifyClaim, getUnverifiedClaims } from '../../modules/verify-claims';

import labels from '../../constants/labels'
import './styles.css'

class VerifyClaims extends Component {

  constructor(props){
    super(props)
    this.state = {
      uportId: props.profile ? props.profile.address : "",
    };
  }


  componentWillMount(){
    this.props.getUnverifiedClaims();
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

  verify(id){
    this.props.verifyClaim(id);
  }

  render(){
      if (this.props.verifyClaims.busy){
          return (<div className="center-container full-height">Please wait while we retrieve your outstanding claims</div>);
      }
    else if (!this.props.verifyClaims.unverifiedClaims){
      return (<div className="full-height center-container">
              <RingLoader
              color={'#000000'}
              loading={this.props.verifyClaims.busy}
              />
              Please wait while we are retrieving your unverified claims.
              </div>);
    }

    else{
          return (
            <div className="claims-container full-height">
              <div className="claimsTable">
                <div className="claimsRow">
                  <div style={{flex:"3",width:"350px"}}>
                      claimant Uport Id
                    </div>
                    <div>
                      Claim Name
                    </div>
                    <div>
                      Added At
                    </div>
                    <div>
                      
                    </div>
                    </div>
              {
                this.props.verifyClaims.unverifiedClaims.map(u =>
                                                             <div key={u.claimantUportId+u.name} className="claimsRow">
                                                                 <div style={{flex:"3",width:"350px"}}>{ u.claimantUportId }</div>
                                                                   <div>{ u.name }</div>
                                                                     <div>{ moment(new Date(u.added * 1000)).format("YYYY/MM/DD HH:mm") }</div>
                                                                       <div>{ !u.verifying ? <button onClick={(e) => {e.preventDefault(); this.verify(u.id);} }>Verify</button> : null }</div>
                                                               </div>
                                                            )
              }
            </div>
              </div>
          );
      }


  }
}

const mapStateToProps = state => ({
  profile:state.user.profile,
  verifyClaims: state.verifyClaims
});

const mapDispatchToProps = dispatch => bindActionCreators({
  verifyClaim,
  getUnverifiedClaims
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyClaims);
