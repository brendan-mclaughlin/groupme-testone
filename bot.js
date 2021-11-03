var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      //botRegex = /^\/endgroupme$/;
  botRegex='Brotherhood spotlights';

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    
    postMessage();
    
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
  // if(request.text){
  //   switch(botRegex){
  //         case 'Brotherhood spotlights':
  //           this.res.writeHead(200);
  //           var text ='fuck';
  //           postMessage(text);
  //           this.res.end();
  //         break;
          
  //         case 'change':
  //         this.res.writeHead(200);
  //         var text ='fuck';
  //         postMessage(text);
  //         this.res.end();
  //         break;
  //         default:
  //           console.log("don't care");
  //           this.res.writeHead(200);
  //           this.res.end();
  //         break;
  //     }

  //  }

  
}

function postMessage(botResponce) {
  var options, body, botReq;

  //botResponse = cool();
 // botResponse ='Shut the fuck up rogers';
 
  // options = {
  //   hostname: 'api.groupme.com',
  //   path: '/v3/bots/post',
  //   method: 'POST'
  // 
//}
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/:id/update',
    method: 'POST'
  };

   body = {
    "name" : "XXXXXXX",
    "share": true,
    "image_url" : "https://i.groupme.com/123456789",
    "office_mode": true
  };
  // body = {
  //   "bot_id" : botID,
  //   "text" : botResponse
  // };

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