import React, { useEffect, useState } from "react";

const InputFile = () => {

    let fileLines = []

    const [isRead, setIsRead] = useState(false)
    const [lines, setLines] = useState([])
    const [wordCount, setWordCount] = useState(0)


    function readFile(setLines, setWordCount) {
        console.log("WAS CLICKED")
        let finalWordsMap = new Map()
        const input = document.getElementById('UserTxtFile');
        console.log("input: ", input.files)
        const file = input.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
      
        reader.onload = function() {
          const fileLines = this.result.split('\n');
          setLines(fileLines)
          for (let line of fileLines) {

            let words = line.replace( /\n/g, " " ).split( " " )
    
            let finalWords = words.filter(word => !(/^\s*$/.test(word))).map(word => {
                let x = word.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, "")
                return x
            })

            finalWords.forEach(word => {
                let wordCount = finalWordsMap.get(word);
                if(wordCount===undefined){
                    finalWordsMap.set(word.toLowerCase(), 1)
                }else{
                    finalWordsMap.set(word.toLowerCase(), wordCount+=1)
                }
            })
            
            setWordCount(finalWordsMap.size);
            // console.log(line);
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
            {isRead && <h2>Word Count for this file is: {wordCount}</h2>}
            {isRead && <h3>Your File Content Is Printed Below</h3>}
            {isRead && lines.map((line,index) => {
                return (
                    <p key={index} >{line}</p>
                )
            })}
        </>
    )

}

export default InputFile;