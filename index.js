const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1263196",
  key: "58076679737bf1420003",
  secret: "d33feb99a51f44ac9345",
  cluster: "mt1",
  useTLS: true
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/speech', function(req, res) {
    console.log(req.body);
    
    var newSpeech = {
        name: req.body.name,
        message: req.body.message,
    }

    pusher.trigger("my-channel", "my-event", newSpeech); 
    res.json({created:true});     
})
 
app.get('/', function (req, res) {
    console.log(req.body);
  
})
 
app.listen(3000)