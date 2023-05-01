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
app.post('/updateFile', async (req, res) => {

    console.log("req: ", req.body)
    const {fileName, targetWord, replacementWord} = req.body
    const file = "./src/Test/InputFiles/"+fileName;

    const didReplace = await replacement(file, targetWord, replacementWord);
    console.log("didReplace: ", didReplace)

    const status = didReplace ? "SUCCESS" : "TARGET_NOT_FOUND";

    console.log("status: ", status)
    res.send({status: status})
});

// Start the server and listen for incoming requests
const port = 8080; // Port number to listen on
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const asyncReadFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      else resolve(data);
    })

  })
}

const asyncWriteFile = async (file, result) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) reject(err);
      else resolve(true);
    })
  })
}


const replacement = async(file, targetWord, replacementWord) => {
  let found = false;
  const data = await asyncReadFile(file)

  
  const regex = new RegExp("\\b" + targetWord + "\\b", "gi");
  
  const result = data.replace(regex, replacementWord)

  console.log("result: ", result)
  console.log("data: ", data)
  console.log("data !== result: ", data !== result)

  if(result !== data){
    await asyncWriteFile(file, result)
    found = true;
  }

  console.log("returning: ", found)

  return found;
}


module.exports = { replacement };
