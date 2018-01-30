var Attestation = artifacts.require('./Attestation.sol');

contract('Attestation', function(accounts) {

  before(async function(){
    contract = await Attestation.deployed();
  });

  it("Contract is deployed", async function() {
    assert(contract);
  });


  it("Can create an organisation", async () => {

    return new Promise((resolve,reject) =>{
      const uportId = "2os9YQ6FPrTqsWDrMpDxCa6BrPd5x4Mh18p";
      var name = "T";
      var registrationNumber = "12";

      contract.OrganisationAdded([accounts[0], uportId], async (err, result) => {
        console.log('contract result', result);
        assert(result.args.orgAddress === accounts[0]);
        assert(result.args.uportId === uportId);
        assert(result.args.name === name);

        var orgsCount = await contract.getOrgsCount.call();

        for (var i = 0; i < orgsCount.toNumber(); i++){
          var org = await contract.orgs.call(0);
          console.log('org', org);
        }

        resolve();
      });

      contract.addOrganisation(uportId, name, registrationNumber);
    });


  });


  it("Can add multiple orgs", async () => {

    const uportId = "2os9YQ6FPrTqsWDrMpDxCa6BrPd5x4Mh18p";
    var name = "T";
    var registrationNumber = "12";

    var orgsCount = await contract.getOrgsCount.call();

    for (var i = 0; i < orgsCount.toNumber(); i++){
      var org = await contract.orgs.call(0);
      console.log('org', org);
    }

    contract.addOrganisation(uportId, name, registrationNumber);
  });

});

