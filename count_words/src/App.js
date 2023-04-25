import React from 'react'
import InputFile from './Component/InputFile'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App' style={ { padding: '5%' } }>
        <InputFile></InputFile>
      </div>
    </QueryClientProvider>
  )
}

export default App
