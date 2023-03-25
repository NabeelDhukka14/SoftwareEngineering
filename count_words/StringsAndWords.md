
# Version 1.0.0

## Initial Requirements (1.1.0)

- Program needs to count how many lines are read from the file and present the count to the user
- Program needs to determine how many characters are in each line read by the program, sum those counts, and display the over all character count of the file to the user
- A character, does NOT NEED to be alphabetical. Punctuation, numbers, alphabet all count as characters. 
- Whitespace does NOT count as a character
- If an Empty file is passed to the program to read, show a message to the user indicating we dont read empty files as there will be no words, chars, or lines to read.

## Initial Requirements (1.0.0)

- Program needs to propmt/ask the user to select a .txt file
- Program needs to allow the user to choose a file 
- Program needs to allow the user to kick off the process for reading the file for unique words
- Program needs to parse through the file contents, separating the document based on spaces, tabs,punctuation, and newline chars to extract "words"
- Program needs to display to the user the count of unique words found and what the words are
- Program needs to display an error, if the proper file type isn't selected, as this could affect the reading of the file. 




## Test Cases
- test cases are described in the "/src/Test/InputFile.test.js" file. 
- example:    
    -  it('should read empty input file and show zero unque words', async () => {...



