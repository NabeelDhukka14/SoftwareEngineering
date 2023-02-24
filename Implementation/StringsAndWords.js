const readline = require('readline');
const fs = require('fs')
const events = require('events');
const lineReader = require('line-reader');

const findUniqueWords =  (pathToDocument) => {

    let docText = fs.readFileSync(pathToDocument,'utf-8');
    let words = docText.replace( /\n/g, " " ).split( " " )

    let finalWords = words.filter(word => !(/^\s*$/.test(word))).map(word => {
        
        let x = word.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, "")
        return x
    })

    let finalWordsMap = new Map()
    
    finalWords.forEach(word => {
        let wordCount = finalWordsMap.get(word);
        if(wordCount===undefined){
            finalWordsMap.set(word.toLowerCase(), 1)
        }else{
            finalWordsMap.set(word.toLowerCase(), wordCount+=1)
        }
    })

    console.log(finalWordsMap)

    return finalWordsMap.size
}

module.exports = findUniqueWords;