

exports.simpleApiAuthWasSuccessful = function(apiSecret){
  if (apiSecret == process.env.API_ACCESS_TOKEN) {
    return true;
  } else if (apiSecret == null){
    return false;
  } else {
    return false;
  }
}
