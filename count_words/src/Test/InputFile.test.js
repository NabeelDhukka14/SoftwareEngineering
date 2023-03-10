import React from 'react'
import InputFile from '../Component/InputFile'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom' // Import the jest-dom package

describe('MyComponent', () => {
  it('should read empty input file and show zero unque words', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE IS EMPTY
    const testFile = new File([''], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 0')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read a file with repeat word, and uniquely count all words', async () => {
    render(
                <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE HAS REPEAT WORD "hello"
    const testFile = new File(['hello\n   how are \n\t you? hello'], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 4')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read input file, and count same words with different cases as the same word', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE has the word "hello", in upper and lower case. Still counts as 1 word
    const testFile = new File(['hello\n   how are \n\t you? HELLO'], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 4')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read input file, and count same words with different cases as the same word even if single word has mixed case', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE has the word "hello", in upper and mixed case "HelLo". Still counts as 1 word
    const testFile = new File(['hello\n   how are \n\t you? HelLo'], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 4')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read input file with only whitespace. zero words', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE has only whitespace characters. should be zero words
    const testFile = new File(['\n\n\t   \n'], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 0')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read input file with words containing punctuation within the word as unique word', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE has the word "they're" counted as 1 word, but 'today?' will ignore the trailing "?", so only 'today' counts as word
    const testFile = new File(["hello they're , how are you today?"], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 6')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should read file with no content as zero words', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE has no content in first param
    const testFile = new File([], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFile] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })
    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('Word Count for this file is: 0')
    expect(wordCountHeader).toBeInTheDocument()
  })

  it('should Not read a file that is not .txt', async () => {
    render(
            <InputFile/>
    )

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()

    const readButton = screen.getByRole('readButton')

    // FILE is created as Jpeg
    const testFileJPEG = new File([], 'test.jpeg', { type: 'image/jpeg' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFileJPEG] } })
      // Click read button to render file contents and count unique words
      readButton.click()
    })

    // wait for word count header to appear with appropriate unique word count
    const wordCountHeader = await screen.findByText('You Selected a "jpeg" file. Please select a .txt file')
    expect(wordCountHeader).toBeInTheDocument()
  })
})
