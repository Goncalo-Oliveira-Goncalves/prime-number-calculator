function factorial(n) {
    if (n == 0) {
        return 1n;
    }
    else {
        return factorial(n-1n) * n;
    }
}

function calculateCoefficient(prime, coefficientIndex) {
    return factorial(prime) /
        (factorial(coefficientIndex) * factorial((prime - coefficientIndex)));
}

function calculateCoefficients(prime) {
    let coefficients = [];
    
    for (
        let coefficientIndex = prime;
        coefficientIndex >= 0;
        coefficientIndex--
    ) {
        let coefficient = (calculateCoefficient(prime, coefficientIndex));

        coefficients.push(coefficient);
    }

    return coefficients;
}

function testDivisability(coefficient, prime) {
    return (0 == (coefficient%prime))
}

function testPrimality(prime) {
    const coefficients = calculateCoefficients(prime);
    console.log(`${prime}: ${coefficients.slice(1, -1)}`)

    const coefficients_array_half_index = Math.ceil(coefficients.length / 2)

    // we remove the first and last elements as according to the formula
    // https://www.youtube.com/watch?v=HvMSRWTE2mI
    for (const coefficient of coefficients.slice(1, -1).slice(0, coefficients_array_half_index)) { 
        const divisability = testDivisability(coefficient, prime)
        
        if (divisability == true) {
            console.log(`${coefficient} is divisable by ${prime}`)
            continue
        }
        else if (divisability == false) {
            console.log(coefficient)
            return false
        }
        else {
            console.log("Something is wrong, likely with `testDivisability`, wrong output.")
        }
    }

    return true
}

function findPrimesUpTo(max) {
    let primes = []

    for (let i = 1n; i <= max; i++) {
        const primality = testPrimality(i)

        if (primality == true) {
            primes.push(i)
        }
    }

    return primes
}

// should give:
// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
console.log(findPrimesUpTo(100))