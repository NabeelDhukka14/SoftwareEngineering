const fs = require('fs')
var cors = require('cors')
const bodyParser = require('body-parser');

// Import required modules
const express = require('express');

// Create an Express app
const app = express();
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Define an endpoint for HTTP GET request
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Send response to the client
});

// Define an endpoint for HTTP POST request
app.post('/updateFile', (req, res) => {

    console.log("req: ", req.body)
    const {fileName, targetWord, replacementWord} = req.body
    const file = "./src/Test/InputFiles/"+fileName;

    replacement(file, targetWord, replacementWord)

    res.send("Successfully replaced file")
});

// Start the server and listen for incoming requests
const port = 8080; // Port number to listen on
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export const replacement = (file, targetWord, replacementWord) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }

    const result = data.replace(targetWord, replacementWord)

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })

}