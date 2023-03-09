import React from "react";
import InputFile from "../Component/InputFile";
import { render,screen , fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the jest-dom package

import userEvent from '@testing-library/user-event'
const fs = require('fs')

describe('MyComponent', () => {

    it('should read input file', async () => {

       const component =  render(
            <InputFile/>
        )
        
        expect(screen.getByText("Select a .txt file for me to read")).toBeTruthy()

        const readButton = screen.getByRole("readButton")

        const testImageFile = new File(["hello\n   how are \n\t you? hello"], "test.txt", { type: "text/plain" });
        
       

        const fileInputButton = screen.getByRole("fileSelector");
        // Make sure test is clean
        expect(fileInputButton.files.length).toBe(0);
        // Simulate a user picking the file
        fireEvent.change(fileInputButton, { target: { files: [testImageFile] } });

        //Click read button to render file contents and count unique words
        readButton.click();
        //wait for word count header to appear with appropriate unique word count
        const wordCountHeader = await screen.findByText("Word Count for this file is: 4")
        expect(wordCountHeader).toBeInTheDocument()
        });

});    