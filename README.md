# How to run
- <u><b>Note: you must have node.js and npm installed</b></u>
    - I am using node v18.12.1
    - am using npm 8.19.2
    - You can use the docs here to help you download the above. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

- Once you've installed the above, navigate to the "count_words" directory

- run command " npm i " 

- once all dependencies have been pulled in, you can use command "npm start" to launch the app. 

- navigate to "http://localhost:3000/" in your browser to use the app. The <u><b>"count_words/src/Test/InputFiles"</u></b> directory has some .txt files for you to use if you would like.

- To run unit tests, use the command "npm run test" in your command line 

- To run code quality analysis use command "npm run lint" . empty response means no errors. 

- NOTE:// To use word replacement feature you must start local express server. 
    - navigate to the "count_words" directory
    - make sure you have done an "npm i" , so you grab all the express dependencies. 
    - run "node express.js" (express.js is in the root directory, do not move the file)
    - You should see a message stating "Server is running on port 8080", to be assured that the server is up and running. 
    - You can now proceed to your browser to use the word replace feature from the UI.
    
     
# Git Repo Link
https://github.com/NabeelDhukka14/SoftwareEngineering

# Requirements and Implementation 
- Implementation and test files can be found in <u><b>"count_words/src/"</u></b> directory
- Requirements Specification can be found at <u><b>"count_words/StringsAndWords.md"</u></b>
