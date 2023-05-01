import React from 'react'
import InputFile from '../Component/InputFile'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom' // Import the jest-dom package
import * as ReactQuery from 'react-query'
const fs = require('fs')
const replacementModule = require('../../replacement')

const queryClient = new ReactQuery.QueryClient()

beforeEach(() => {
  // If file does not exist, create it
  if (!fs.existsSync('./src/Test/InputFiles/replace_text.txt')) {
    fs.writeFileSync('./src/Test/InputFiles/replace_text.txt', 'ab cd ef')
  }
})

afterEach(() => {
  // after each test make sure to reset the file the way we found it
  fs.writeFileSync('./src/Test/InputFiles/replace_text.txt', 'ab cd ef')
})

describe('MyComponent', () => {
  it('should read empty input file and show empty file error message', async () => {
    render(
        <ReactQuery.QueryClientProvider client={queryClient}>
            <InputFile/>
        </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const emptyFileHeader = await screen.findByText('This file is empty, so it will not be read. Please select a file with data')

    expect(emptyFileHeader).toBeInTheDocument()
  })

  it('should read a file with repeat word, and uniquely count all words', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const lineCountHeader = await screen.findByText('Line Count for this file is: 3')
    const charCountHeader = await screen.findByText('Character Count for this file is: 20')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should read input file, and count same words with different cases as the same word', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const lineCountHeader = await screen.findByText('Line Count for this file is: 3')
    const charCountHeader = await screen.findByText('Character Count for this file is: 20')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should read input file, and count same words with different cases as the same word even if single word has mixed case', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const lineCountHeader = await screen.findByText('Line Count for this file is: 3')
    const charCountHeader = await screen.findByText('Character Count for this file is: 20')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should read input file with only whitespace, including new lines', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const lineCountHeader = await screen.findByText('Line Count for this file is: 4')
    const charCountHeader = await screen.findByText('Character Count for this file is: 0')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should read input file with words containing punctuation within the word as unique word', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const lineCountHeader = await screen.findByText('Line Count for this file is: 1')
    const charCountHeader = await screen.findByText('Character Count for this file is: 28')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should read file with no content and show the user a message indicating they need to select a non-empty file', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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
    const emptyFileHeader = await screen.findByText('This file is empty, so it will not be read. Please select a file with data')

    expect(emptyFileHeader).toBeInTheDocument()
  })

  it('should Not read a file that is not .txt', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

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

    const incorrectFileTypeHeader = await screen.findByText('You Selected a "jpeg“ file. Please select a .txt file')
    expect(incorrectFileTypeHeader).toBeInTheDocument()
  })

  it('should count Punctuation, numbers, alphabet all as characters. ', async () => {
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const readFeatureSelectBtn = screen.getByText('Read File Contents')
    fireEvent.click(readFeatureSelectBtn)

    expect(screen.getByText('Select a .txt file for me to read')).toBeTruthy()
    const readButton = screen.getByRole('readButton')

    // FILE is created as Jpeg
    const testFileJPEG = new File(['hi 12 1h1 ^h^  h.t 1\'1 5;j .,'], 'test.txt', { type: 'text/plain' })

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
    const wordCountHeader = await screen.findByText('Word Count for this file is: 7')
    const lineCountHeader = await screen.findByText('Line Count for this file is: 1')
    const charCountHeader = await screen.findByText('Character Count for this file is: 21')

    expect(wordCountHeader).toBeInTheDocument()
    expect(lineCountHeader).toBeInTheDocument()
    expect(charCountHeader).toBeInTheDocument()
  })

  it('should load the replace word feature', async () => {
    const mockCall = jest.fn()
    const mockRes = { data: { data: { status: 'SUCCESS' } }, status: 'success' }
    mockCall.mockReturnValue(mockRes)
    render(
      <ReactQuery.QueryClientProvider client={queryClient}>
          <InputFile/>
      </ReactQuery.QueryClientProvider>
    )
    const replaceFeatureSelectBtn = screen.getByText('Replace File Contents')
    fireEvent.click(replaceFeatureSelectBtn)

    expect(screen.getByText('Select a .txt file from the directory "./src/Test/InputFiles/“ and enter a word for me to replace in the .txt file.')).toBeTruthy()
    expect(screen.getByText('Target Word')).toBeTruthy()
    expect(screen.getByText('Replacement Word')).toBeTruthy()
    const target = screen.getByRole('target')
    const replacement = screen.getByRole('replacement')

    fireEvent.change(target, { target: { value: 'a' } })
    fireEvent.change(replacement, { target: { value: 'b' } })

    const replaceButton = screen.getByRole('replaceButton')

    // FILE is created as plain txt file
    const testFileTxt = new File(['ab cd ef'], 'test.txt', { type: 'text/plain' })

    const fileInputButton = screen.getByRole('fileSelector')
    // Make sure test is clean
    expect(fileInputButton.files.length).toBe(0)
    // Simulate a user picking the file
    await act(async () => {
      await fireEvent.change(fileInputButton, { target: { files: [testFileTxt] } })
      // Click read button to render file contents and count unique words
      fireEvent.click(replaceButton)
    })
  })

  it('should not replace word on partial match', async () => {
    const testFile = './src/Test/InputFiles/replace_text.txt'
    const readResultBefore = await replacementModule.asyncReadFile(testFile)
    const result = await replacementModule.replacement(testFile, 'a', 'b')
    // No full target was found so nothing will be replaced, so return TARGET_NOT_FOUND status
    expect(result).toBe('TARGET_NOT_FOUND')

    const readResultAfter = await replacementModule.asyncReadFile(testFile)
    expect(readResultBefore === readResultAfter).toBeTruthy()
  })

  it('should replace word on full match', async () => {
    const testFile = './src/Test/InputFiles/replace_text.txt'
    const readResultBefore = await replacementModule.asyncReadFile(testFile)
    const result = await replacementModule.replacement(testFile, 'ab', 'cd')
    // full target was found so it will be replaced in the file, with SUCCESS status
    expect(result).toBe('SUCCESS')

    const readResultAfter = await replacementModule.asyncReadFile(testFile)
    expect(readResultBefore !== readResultAfter).toBeTruthy()
    expect(readResultAfter === 'cd cd ef').toBeTruthy()
  })
})
