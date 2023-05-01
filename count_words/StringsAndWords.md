
# Version 1.0.0
## Checkpoint 3 Requirements (1.2.0)
- User needs to be able to select if they want to read a file, or replace words within a file
- User needs to be able to specify what word to replace AND what word to replace it with
- Word replacement request needs to be able to update any file from within the "./src/Test/InputFiles/" directory
- Word replacement should only occur on full match, not partial. “ab cd ef”, replace “a” with “b” will result in no change, while replace “ab” with “cd” will result in “cd cd ef”. 

## Checkpoint 2 Requirements (1.1.0)

- Program needs to count how many lines are read from the file and present the count to the user. Lines are determined by number of newline breaks. so file with only whitespace but 2 newline breaks will be 2 lines, 0 words, 0 chars.
- Program needs to determine how many characters are in each line read by the program, sum those counts, and display the over all character count of the file to the user
- A character, does NOT NEED to be alphabetical. Punctuation, numbers, alphabet all count as characters. 
- Whitespace does NOT count as a character
- All punctuation is not a word. all numbers can be words. all alpha can be words. any puctuation wrapped within numbers and alpha will be counted as a word.
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



