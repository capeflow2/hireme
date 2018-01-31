import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';
import {Link} from 'react-router-dom'
import moment from 'moment';
import { getClaimsForUser } from '../../modules/view-skills';

import labels from '../../constants/labels'
//import './styles.css'

class ViewSkills extends Component {

  constructor(props){
    super(props)
    this.state = {
      uportId: props.profile ? props.profile.address : "",
      userAddress: ""
    };
  }

  componentWillMount(){
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

  getUserClaims(){
    console.log('userAddress', this.state.userAddress);

    this.props.getClaimsForUser(this.state.userAddress);
  }

  render(){
      if (this.props.viewSkills.loading){
        return (<div className="center-container full-height">

                           <RingLoader
                           color={'#000000'}
                           loading={this.props.viewSkills.loading}
                           />

                Please wait while we retrieve your outstanding claims</div>);
      }
    // else if (!this.props.viewClaims.claims){
    //   return (<div className="full-height center-container">
    //           <RingLoader
    //           color={'#000000'}
    //           loading={this.props.verifyClaims.busy}
    //           />
    //           Please wait while we are retrieving your unverified claims.
    //           </div>);
    // }
    else{
          return (
            <div className="claims-container full-height">
             { <button style={{position:"absolute", left:"0", top: "15px"}}><Link to="/">Back</Link></button> }
              <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"center"}}>
                <label style={{marginTop:"5px"}}>User Address / Name:</label>
                <input style={{border:"1px solid #b2b2b2", margin:"5px", width:"400px"}} name="userAddress" type="text" onChange={(e) => this.setInputValue(e)}></input>
                <button onClick={(e) => this.getUserClaims()}>Get User Claims</button>
              </div>
              <br/>
              <br/>
              <br/>

              <div className="claimsTable">
                <div className="claimsRow">
                  <div style={{flex:"3",width:"350px"}}>
                      Claimant Uport Id
                    </div>
                    <div>
                      Claim Name
                    </div>
                    <div>
                      Added At
                    </div>
                    <div>
                      Is Verified
                    </div>
                    </div>
              {
                this.props.viewSkills.claims.map(u =>
                                                             <div key={u.claimantUportId+u.name} className="claimsRow">
                                                                 <div style={{flex:"3",width:"350px"}}>{ u.claimantUportId }</div>
                                                                   <div>{ u.name }</div>
                                                                     <div>{ moment(new Date(u.added * 1000)).format("YYYY/MM/DD HH:mm") }</div>
                                                                       <div>{ u.verified }</div>
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
  viewSkills: state.viewSkills
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getClaimsForUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSkills);
