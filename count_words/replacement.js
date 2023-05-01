const fs = require('fs')

const asyncReadFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const asyncWriteFile = async (file, result) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) reject(err)
      else resolve(true)
    })
  })
}

const replacement = async (file, targetWord, replacementWord) => {
  let found = false
  console.log('FILE: ', file)
  const data = await asyncReadFile(file)

  const regex = new RegExp('\\b' + targetWord + '\\b', 'gi')

  const result = data.replace(regex, replacementWord)

  console.log('result: ', result)
  console.log('data: ', data)
  console.log('data !== result: ', data !== result)

  if (result !== data) {
    await asyncWriteFile(file, result)
    found = true
  }

  console.log('returning: ', found)
  const status = found ? 'SUCCESS' : 'TARGET_NOT_FOUND'
  return status
}

module.exports = { replacement }
module.exports.asyncReadFile = asyncReadFile
