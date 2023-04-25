import { useQuery } from 'react-query'
import axios from 'axios'

export const callReplaceAPI = (reqBody) => {
  // eslint-disable-next-line
  return axios.post('http://localhost:8080/updateFile', reqBody,  { mode: 'no-cors' }).then(res => {
    console.log('API response is: ', res)
    return res
  })
}

export const useReplaceAPI = (shouldCallAPI, reqBody) => {
  const result = useQuery('movies', () => { return callReplaceAPI(reqBody) }, {
    enabled: shouldCallAPI,
    retry: 0
  })
  return result
}
