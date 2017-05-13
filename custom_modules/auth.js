

exports.simpleApiAuthWasSuccessful = function(apiSecret){
  console.log("DEBUGGING::: "+apiSecret +':::' +process.env.API_ACCESS_TOKEN)
  if (apiSecret == process.env.API_ACCESS_TOKEN) {
    return true;
  } else if (apiSecret == null){
    return false;
  } else {
    return false;
  }
}
