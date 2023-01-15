const ExpressError = require('./ExpressError');


function makeNumsArray(strNums){
    let numsArr = [];
    
    // convert strings to integers and validate that the value is an integer
    for (i=0; i < strNums.length; i++) {
        let strToNum = Number(strNums[i]);

        if (Number.isNaN(strToNum)){
            return new ExpressError(`${strNums[i]} is not a valid number.`, 400)
        };

        numsArr.push(strToNum)
    };
    // console.log(numsArr)
    return numsArr;
}



function findMean(numArray){
    if (numArray.length === 0) return 0;
    return numArray.reduce((acc, cur) => {
        return acc + cur;
    }) / numArray.length
}



function findMedian(numArray){
    numArray.sort(function(a, b) { return a - b });
    var n = numArray.length;
    if (n % 2 === 0) {
        return (numArray[n/2] + numArray[n/2 - 1])/2;
    } else {
        
    }
    return numArray[(n-1)/2];
}


function findMode(numArray){
    let numDict = {}; // store number counter here

    for( i=0; i < numArray.length; i++){
        if(numDict[numArray[i]]){
            numDict[numArray[i]] += 1
        } else {
            numDict[numArray[i]] = 1
        }
    }

    let numFreq = 0; // number of times the key appears in the array
    let mostFrequentKey; // current key with highest frequency

    for(let key in numDict) {
        if(numDict[key] > numFreq) {
            mostFrequentKey = key;
            numFreq = numDict[key]
        }
    }

    return parseInt(mostFrequentKey)
}


module.exports = {makeNumsArray,findMean, findMedian, findMode};