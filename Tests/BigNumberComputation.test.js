const BigNumMath = require('../Implementation/BigNumberComputation')

test('Add two normal numbers',() => { 

    let result = BigNumMath(5,2,'add');
    expect(result).toBe(BigInt(7))
});

test('Add two Big Numbers',() => { 

    let result = BigNumMath(2312123211345545367,2312123211345545367,'add');
    expect(result).toBe(BigInt(4624246422691090734))
});

test('Subtract two normal numbers',() => { 

    let result = BigNumMath(5,2,'sub');
    expect(result).toBe(BigInt(3))
});

test('Subtract two Big Numbers',() => { 

    let result = BigNumMath(4624246422691090734,2312123211345545367,'sub');
    expect(result).toBe(BigInt(2312123211345545367))
});

test('Subtract two Big Numbers, expecting negative result',() => { 

    let result = BigNumMath(2312123211345545367,4624246422691090734,'sub');
    expect(result).toBe(BigInt(-2312123211345545367))
});