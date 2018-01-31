pragma solidity ^0.4.17;

contract Marketplace {

  address owner;
  JobOffer[] public jobs;
  JobRequest[][] public jobRequests;
  //mapping (uint => JobRequest[]) public jobRequests;
  //mapping (uint => uint) jobRequestCount;

  event JobAdded(uint indexed id, string title);

  struct JobRequest {
    address requestorAddress;
    string requestorName;
    string requestorUportId;
  }

  struct JobOffer {
    string title;
    string description;
    address provider;
    string providerName;
    string providerUportId;
    string status;
    uint created;
    uint paymentAmountInWei;
    address request;
  }

  function addJobOffer(string title, string description, string providerName, uint paymentAmountInWei, string providerUportId) public returns (uint jobIndex) {
    JobOffer memory jobOffer;

    jobOffer.providerName = providerName;
    jobOffer.provider = msg.sender;
    jobOffer.description = description;
    jobOffer.title = title;
    jobOffer.created = block.timestamp;
    jobOffer.status = "Created";
    jobOffer.providerUportId = providerUportId;
    jobOffer.paymentAmountInWei = paymentAmountInWei;

    jobIndex = jobs.push(jobOffer)-1;

    JobAdded(jobIndex, title);

    return jobIndex;
  }

  function requestJob(uint jobId) public {
    JobOffer job = jobs[jobId];

    require(job.request == 0x0000000000000000000000000000000000000000);

    job.request = msg.sender;
    job.status = "Pending Accept";

    //address[] addresses = job.requests;
    //addresses.push(msg.sender);

    //job.requests = addresses;



    //null check plz
    //var currentCount = jobRequestCount[jobId];

    /* JobRequest memory jobRequest; */

    /* JobRequest[] storage j = JobRequest[](0); */

    /* jobRequest.requestorAddress = msg.sender; */
    /* jobRequest.requestorName = requestorName; */
    /* jobRequest.requestorUportId = requestorUportId; */
    /* jobRequests[jobId] = j; */

    // .push(jobRequest);// = jobRequest;
  }


  /* function getRequestsForJob(uint jobId) public returns (JobRequest) { */
  /*   JobRequest memory jobRequest; */
  /*   jobRequest = jobRequests[jobId]; */
  /*   return jobRequest; */
  /* } */


  function Marketplace() public {
    owner = msg.sender;
  }

  function getJobsCount() public constant returns(uint jobsCount) {
    return jobs.length;
  }
}
