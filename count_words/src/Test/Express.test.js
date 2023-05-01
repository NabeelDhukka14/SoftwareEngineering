import {replacement} from '../../express.js'


describe.skip('MyComponent', () => {
  it('should replace a word', async () => {
    
    const testFile = new File(['a aa b'], 'test.txt', { type: 'text/plain' })
    const response = replacement(testFile, "a", "c");
    expect(response).toBe(true);

  })
})