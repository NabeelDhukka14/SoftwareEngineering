

const BigNumMath = (num1, num2, opp) => {

    let bigNum1 = BigInt(num1)
    let bigNum2 = BigInt(num2)

    switch(opp){
        case "add":
            return bigNum1 + bigNum2
        case "sub":  
            return bigNum1 - bigNum2
        default:
            throw new Error("Invalid Opperation ("+opp+").\n [add, sub] are supported opperations")
    }
}

module.exports = BigNumMath;