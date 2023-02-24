const findUniqueWords = require('../Implementation/StringsAndWords')


test('Read a file given file path Given Complex Example',()=>{

    let result = findUniqueWords('./Tests/InputFiles/StringsAndWords_Input_Doc.txt');
    expect(result).toBe(84)
});
test('Read a file given file path with Simple Data',()=>{

    let result = findUniqueWords('./Tests/InputFiles/StringsAndWords_Input_Doc_Simple_Example.txt');
    console.log(result)
    expect(result).toBe(6)
});

test('Same Words Different Case',()=>{

    let result = findUniqueWords('./Tests/InputFiles/StringsAndWords_Same_Words_Diff_Case.txt');
    console.log(result)
    expect(result).toBe(2)
});