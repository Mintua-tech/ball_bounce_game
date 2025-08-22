const express = require('express');
const path = require('path');
const app = express();
const WebSocket = require('ws');
const port = 3000;

// Serve static files from the "public" folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
const serverAddress = 'wss://ball-bounce-ws.onrender.com/';  

const ws = new WebSocket(serverAddress, {
    headers: {
        "user-agent": "chrome"
    }
});

// Render the EJS template for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');

app.listen(port, (err) => {
  if(err) console.log(err)  
  console.log(`Server is running at http://localhost:${port}`);
});
