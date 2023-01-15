const express = require('express');
const app = express();
app.use(express.json()); // is needed for json; like for API

const ExpressError = require('./ExpressError');

const {makeNumsArray, findMean, findMedian, findMode} = require('./helpers');


// the mean of 1, 3, 5, and 7, that would look like be a GET request to /mean?nums=1,3,5,7.


// The response of each operation should be JSON which looks like this:

// response: {
//   operation: "mean",
//   value: 4
// }


// need to check that all of the "numbers" listed are integers; if not respond with 400 Bad Request



app.get("/mean", function (req, res, next) {
    // throw error if numbers were not passed correctly
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }


    // add .filter boolean incase comma is added at the end of the last number ie /mean?nums=1,2,3,
    // the last comma will take the empty value and convert it to a 0 which we do not want
    const numsString = req.query.nums.split(',').filter(Boolean);

    let numArray = makeNumsArray(numsString) // convert numsString which is an array of strings to an array of integers
    if (numArray instanceof ExpressError) {
        throw new ExpressError(numArray.msg, numArray.status)
    }
    
    let result = {response: {
        operation: "mean",
        result: findMean(numArray)
      }}
    return res.send(result);
})



app.get("/median", function (req, res, next) {

    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    const numsString = req.query.nums.split(',').filter(Boolean);

    let numArray = makeNumsArray(numsString) // convert numsString which is an array of strings to an array of integers
    if (numArray instanceof ExpressError) {
        throw new ExpressError(numArray.msg, numArray.status)
    }
   
    let result = {response: {
        operation: "median",
        result: findMedian(numArray)
      }}
    return res.send(result);
})


app.get("/mode", function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    const numsString = req.query.nums.split(',').filter(Boolean);

    let numArray = makeNumsArray(numsString) // convert numsString which is an array of strings to an array of integers
    if (numArray instanceof ExpressError) {
        throw new ExpressError(numArray.msg, numArray.status)
    }

    let result = {response: {
        operation: "mode",
        result: findMode(numArray)
      }}

    return res.send(result);
})



app.get('/all', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    const numsString = req.query.nums.split(',').filter(Boolean);

    let numArray = makeNumsArray(numsString) // convert numsString which is an array of strings to an array of integers
    if (numArray instanceof ExpressError) {
        throw new ExpressError(numArray.msg, numArray.status)
    }

    let result = {response: {
        operation: "mode",
        mean: findMean(numArray),
        median: findMedian(numArray),
        mode: findMode(numArray)
      }}

    return res.send(result);
})




/* Error Handler */ 
app.use((err, req, res, next) => {
    let status = err.status || 500; //default to status code 500 if none
    let message = err.msg;

    return res.status(status).json({
        error: {message, status}
    })
})



app.listen(3000, function () {
    console.log('App on port 3000');
})