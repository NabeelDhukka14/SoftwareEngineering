import React, { useEffect, useState } from "react";

const InputFile = () => {

    const [isRead, setIsRead] = useState(false)
    const [lines, setLines] = useState([])
    const [wordCount, setWordCount] = useState(0)
    const [allWords, setAllWords] = useState(new Map())
    const [currFileType, setCurrFileType] = useState("")

    function readFile(setLines, setWordCount) {

        setCurrFileType("")
        let finalWordsMap = new Map()
        const userFile = document.getElementById('UserTxtFile');
        const fileType = userFile.files[0].name.split(".").slice(-1)[0];

        if(fileType !== 'txt'){
            setCurrFileType(fileType)
            return;
        }

        const file = userFile.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file);
      
        fileReader.onload = function() {
          const fileLines = this.result.split('\n');
          setLines(fileLines)
          for (let line of fileLines) {

            let words = line.replace( /\n/g, " " ).split( " " )
    
            let finalWords = words.filter(word => !(/^\s*$/.test(word))).map(word => {
                let x = word.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, "")
                return x
            })

            finalWords.forEach(word => {
                if(word === ""){return}
                let wordCount = finalWordsMap.get(word);
                if(wordCount===undefined ){
                    finalWordsMap.set(word.toLowerCase(), 1)
                }else{
                    finalWordsMap.set(word.toLowerCase(), wordCount+=1)
                }
            })
            
            setWordCount(finalWordsMap.size);
            setAllWords(finalWordsMap)
          }
        };

      }
      
      useEffect(() => {
        if(lines.length > 0){
            setIsRead(true)
        }
      },[lines])


    return(
        <>
            <h1>Select a .txt file for me to read</h1>
            <input type="file" id="UserTxtFile" accept=".txt" role={"fileSelector"}/>
            <button role={"readButton"} onClick={()=>{readFile(setLines, setWordCount)}}>Read File</button>
            {currFileType !== "" && <h3>You Selected a "{currFileType}" file. Please select a .txt file</h3>}
            {isRead && <h2>Word Count for this file is: {wordCount}</h2>}
            {isRead && <h3>Your File Content Is Printed Below</h3>}
            {isRead && Array.from(allWords).map(([key, value]) => (
                    <h3 key={key}>{`${key}: ${value}`}</h3>
                ))
            }
        </>
    )

}

export default InputFile;