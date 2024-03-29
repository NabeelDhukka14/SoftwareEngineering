import React, { useEffect, useState } from 'react'
import { useReplaceAPI } from '../api'
// import '../css/general.css'

const InputFile = (props) => {
  const [isRead, setIsRead] = useState(false)
  const [lines, setLines] = useState([])
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [allWords, setAllWords] = useState(new Map())
  const [currFileType, setCurrFileType] = useState('')
  const [isEmptyFile, setIsEmptyFile] = useState(false)
  const [targetWord, setTargetWord] = useState('')
  const [replacementWord, setReplacementWord] = useState('')
  const [features, setFeatures] = useState({ read: false, replace: false })
  const [canCallWordReplaceAPI, setCanCallWordReplaceAPI] = useState(false)
  const [fileName, setFileName] = useState('')
  // eslint-disable-next-line
  const wordReplaceResponse = useReplaceAPI(canCallWordReplaceAPI, { fileName: fileName, targetWord: targetWord, replacementWord: replacementWord })

  useEffect(() => {
    console.log(wordReplaceResponse)
    if (wordReplaceResponse.isSuccess) {
      setCanCallWordReplaceAPI(false)
    }
  }, [wordReplaceResponse.data])

  useEffect(() => {
    if (lines.length > 0) {
      setIsRead(true)
    }
  }, [lines])

  async function readFile (setLines, setWordCount) {
    setCurrFileType('')
    const finalWordsMap = new Map()
    let fileCharCount = 0
    const userFile = features.read ? document.getElementById('UserTxtFile') : document.getElementById('UserTxtFileForReplace')
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

  const onTargetChange = (event) => {
    console.log('target CHANGING: ', event.target.value)
    setTargetWord(event.target.value)
  }

  const onReplaceWordChange = (event) => {
    console.log('replacement word CHANGING: ', event.target.value)
    setReplacementWord(event.target.value)
  }

  const replaceWord = (targetWord, replacementWord) => {
    setCanCallWordReplaceAPI(true)
    const userFile = document.getElementById('UserTxtFileForReplace')
    const fileType = userFile.files[0]?.name.split('.').slice(-1)[0]

    console.log('userFile: ', userFile)
    console.log('fileType: ', fileType)

    if (fileType === undefined) {
      console.log('undefined')

      return
    }

    if (fileType !== 'txt') {
      setCurrFileType(fileType)
      return
    }
    const file = userFile.files[0]
    console.log('FILE: ', file)
    setFileName(file.name)
  }

  const resetState = () => {
    setIsRead(false)
    setLines([])
    setCharCount(0)
    setWordCount(0)
    setAllWords(new Map())
  }

  const handleReadBtn = () => {
    setFeatures({ read: true, replace: false })
    resetState()
  }

  const handleReplaceBtn = () => {
    setFeatures({ read: false, replace: true })
    resetState()
  }

  return (
    <>
            <h1> Choose a feature </h1>
            <button onClick={handleReadBtn}>Read File Contents</button>
            <button onClick={handleReplaceBtn}>Replace File Contents</button>
            <hr></hr>
            {features.read && (
              <div className='featureSection'>
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
              </div>
            )}
            {features.replace && (
              <>
                <h1>Select a .txt file from the directory &quot;./src/Test/InputFiles/&ldquo; and enter a word for me to replace in the .txt file.</h1>
                <h4>Target Word</h4>
                <input role={'target'} className='userInput' onChange={onTargetChange} type='text' placeholder="Enter target word you want to replace"/>
                <h4>Replacement Word</h4>
                <input role={'replacement'} className='userInput' onChange={onReplaceWordChange} type='text' placeholder="Enter word that should replace the target word"/>

                <input type='file' id='UserTxtFileForReplace' accept='.txt' role={'fileSelector'}/>
                <button role={'replaceButton'} onClick={() => {
                  replaceWord(targetWord, replacementWord)
                }}>
                  Replace word
                </button>
                {wordReplaceResponse.isSuccess && (
                  <>
                    <hr></hr>
                    {wordReplaceResponse?.data?.data?.status === 'ERROR' && (<h1>Make sure your chosen file is in the ./src/Test/InputFiles/ directory</h1>)}
                    {wordReplaceResponse?.data?.data?.status === 'TARGET_NOT_FOUND' && (<>
                      <h1>
                        Could not find target word to replace. Please enter a new target word and new replacement word.
                      </h1>
                    </>)}
                    {wordReplaceResponse?.data?.data?.status === 'SUCCESS' && (<>
                        <h1>Successfully replaced words in the selected file </h1>
                    </>)
                    }
                  </>
                )}
              </>
            )}
    </>
  )
}

export default InputFile
