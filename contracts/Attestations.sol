pragma solidity ^0.4.17;

contract Attestation {

  //mapping (address => Organisation) public organisations;
  Organisation[] public orgs;
  //uint orgCount = 1;

  event OrganisationAdded(address indexed orgAddress, string uportId, string name);

  struct Organisation {
    bool verified;
    string name;
    string registrationNumber;
    string uportId;
  }

  function addOrganisation(string uportId, string name,string registrationNumber) public {
    //require(!organisations[msg.sender]);

    Organisation memory org;

    org.verified=false;
    org.name= name;
    org.registrationNumber= registrationNumber;
    org.uportId = uportId;

    orgs.push(org);

    OrganisationAdded(msg.sender, uportId, name);
    //orgs[orgCount] = org;

    //organisations[msg.sender] = org;


  }


  function getOrgsCount() public constant returns(uint orgsCount) {
    return orgs.length;
  }
}
