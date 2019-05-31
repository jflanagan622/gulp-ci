// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = '*****************************************';
const authToken = '*****************************************';
const client = require('twilio')(accountSid, authToken);
var clientList = [];
clientList = ["+13046196694", "+13048806608"];

client.messages
  .create({
     body: "No Reply from Craigsville Little League: Pretty slick ain't it Melissa",
     from: '+13045748869',
     to: "+13046196694"
   })
  .then(message => console.log(message.sid));

/*for(var c=0; c<clientList.length; c++){
	client.messages
  .create({
     body: "No Reply from Craigsville Little League: Pretty slick ain't it Melissa",
     from: '+13045748869',
     to: clientList[c]
   })
  .then(message => console.log(message.sid));
}*/
/*To send sms texts, change the body and select the recipient list
then open a console and cd into the address below

C:\Users\JimBob\Documents\CLL Site\admin_main\CLL\routes>

once there, entere the node command below and the texts will be sent out

node send_sms.js
*/
