const cors = require('cors')
const bodyParser = require('body-parser')
const replacementModule = require('./replacement')
// Import required modules
const express = require('express')

// Create an Express app
const app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Define an endpoint for HTTP GET request
app.get('/', (req, res) => {
  res.send('Hello, world!') // Send response to the client
})

// Define an endpoint for HTTP POST request
app.post('/updateFile', async (req, res) => {
  console.log('req: ', req.body)
  const { fileName, targetWord, replacementWord } = req.body
  const file = './src/Test/InputFiles/' + fileName

  let statusCode = 'TARGET_NOT_FOUND'
  try {
    statusCode = await replacementModule.replacement(file, targetWord, replacementWord)
  } catch (err) {
    console.log('ERR: ', err)
    statusCode = 'ERROR'
  }

  console.log('status: ', statusCode)
  res.send({ status: statusCode })
})

// Start the server and listen for incoming requests
const port = 8080 // Port number to listen on
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// const replacement = async(file, targetWord, replacementWord) => {
//   let found = false;
//   const data = await asyncReadFile(file)

//   const regex = new RegExp("\\b" + targetWord + "\\b", "gi");

//   const result = data.replace(regex, replacementWord)

//   console.log("result: ", result)
//   console.log("data: ", data)
//   console.log("data !== result: ", data !== result)

//   if(result !== data){
//     await asyncWriteFile(file, result)
//     found = true;
//   }

//   console.log("returning: ", found)
//   const status = found ? "SUCCESS" : "TARGET_NOT_FOUND";
//   return status;
// }

// module.exports = { replacement };
