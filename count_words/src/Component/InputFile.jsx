import React, { useEffect, useState } from 'react'

const InputFile = () => {
  const [isRead, setIsRead] = useState(false)
  const [lines, setLines] = useState([])
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [allWords, setAllWords] = useState(new Map())
  const [currFileType, setCurrFileType] = useState('')
  const [isEmptyFile, setIsEmptyFile] = useState(false)

  function readFile (setLines, setWordCount) {
    setCurrFileType('')
    const finalWordsMap = new Map()
    let fileCharCount = 0
    const userFile = document.getElementById('UserTxtFile')
    const fileType = userFile.files[0]?.name.split('.').slice(-1)[0]
    if (fileType === undefined) {
      return
    }
    if (fileType !== 'txt') {
      setCurrFileType(fileType)
      return
    }

    const file = userFile.files[0]
    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = function () {
      let fileLines = []
      if (this.result.length > 0) {
        fileLines = this.result.split('\n')
      } else {
        setIsEmptyFile(true)
      }
      console.log(fileLines)
      setLines(fileLines)
      for (const line of fileLines) {
        // reset Char count, so it doesn't keep char count of previous file
        //  line without spaces
        const noSpaceLine = line.replace(/\s+/g, '')
        fileCharCount += noSpaceLine.length
        const words = line.replace(/\n/g, ' ').split(' ')

        const finalWords = words.filter(word => !(/^\s*$/.test(word))).map(word => {
          const x = word.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, '')
          
          return x
        })

        finalWords.forEach(word => {
          if (word === '') { return }
          let wordCount = finalWordsMap.get(word.toLowerCase())
          if (wordCount === undefined) {
            finalWordsMap.set(word.toLowerCase(), 1)
          } else {
            finalWordsMap.set(word.toLowerCase(), wordCount += 1)
          }
        })
        setCharCount(fileCharCount)
        setWordCount(finalWordsMap.size)
        setAllWords(finalWordsMap)
      }
    }
  }

  useEffect(() => {
    if (lines.length > 0) {
      setIsRead(true)
    }
  }, [lines])

  return (
    <>
            <h1>Select a .txt file for me to read</h1>
            <input type='file' id='UserTxtFile' accept='.txt' role={'fileSelector'}/>
            <button role={'readButton'} onClick={() => {
              readFile(setLines, setWordCount)
            }}>
              Read File
            </button>
            {currFileType !== '' && <h3>You Selected a &quot;{ currFileType }&ldquo; file. Please select a .txt file</h3>}
            {isEmptyFile && (
                <>
                  <hr></hr>
                  <h2>This file is empty, so it will not be read. Please select a file with data</h2>
                </>
            )}
            {isRead && (
                <>
                    <hr></hr>
                    <h2>Word Count for this file is: { wordCount }</h2>
                    <h2>Line Count for this file is: { lines.length }</h2>
                    <h2>Character Count for this file is: { charCount }</h2>
                    <hr></hr>
                    <h3>Your File Content Is Printed Below</h3>
                    {Array.from(allWords).map(([key, value]) => (
                    <h3 key={key}>{`${key}: ${value}`}</h3>
                    ))}
                </>
            )}
    </>
  )
}

export default InputFile
