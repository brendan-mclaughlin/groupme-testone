var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
    botRegex =  /ChangeGroup$/;
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function postMessage() {
  var botResponse, options, body, botReq;

  //botResponse = cool();
  
  botResponse ='Always watching my children';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/76428023/update',
    method: 'POST'
  };
  // body = {
  //   "bot_id" : botID,
  //   "text" : botResponse
  // };
  body = {
    "name" : "PUCK CHOPS PEOPLE",
    "share": true,
    "image_url" : "https://static.cycloneshockey.com/images/events/57bf2d19ef92a.jpg",
    "office_mode": true
  };
  console.log('sending ' + botResponse + ' to ' + botID);
  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });
  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}
exports.respond = respond;