import React from "react";
import InputFile from "../Component/InputFile";
import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


describe('MyComponent', () => {

    it('should read input file', () => {

       const component =  render(
            <InputFile/>
        )
        
    
        const testImageFile = new File(["hello\n   how are \n\t you?"], "test.txt", { type: "text/plain" });
        const fileInput = screen.getByRole("fileSelector");

        // Make sure test is clean
        expect(fileInput.files.length).toBe(0);
        userEvent.upload(fileInput, testImageFile);
        // Make sure the action was successful
        expect(fileInput.files.length).toBe(1);

        expect(screen.getByText("Select a .txt file for me to read")).toBeTruthy()
        const readButton = screen.getByRole("readButton")
        readButton.click();
        setTimeout(() => {  console.log("World!"); }, 10000);
        // console.log(document.body.innerHTML);
        // const wordCount = await screen.getByText("Word Count for this file is: 4")
        // const fileContentHeading = await screen.getByText("Your File Content Is Printed Below")
        // const fileLines = ['hello','   how are ','\t you?']
        // fileLines.forEach(line => async () => {
        //     expect(await screen.findByText(line)).toBeTruthy()
        // })

            });
});    