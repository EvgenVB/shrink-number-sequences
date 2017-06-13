var assert = require('assert');
var ShrinkFunction = require('../index');

var invalidParameters = [null, '', {}];
var taskTests = [{ param: [1, 2, 3, 4, 5, 6, 7, 8], result: "1-8" },
    { param: [1, 3, 4, 5, 6, 7, 8], result: "1,3-8" },
    { param: [1, 3, 4, 5, 6, 7, 8, 10, 11, 12], result: "1,3-8,10-12" },
    { param: [1, 2, 3], result: "1-3" },
    { param: [1, 2], result: "1,2" },
    { param: [1, 2, 4], result: "1,2,4" },
    { param: [1, 2, 4, 5, 6], result: "1,2,4-6" },
    { param: [1, 2, 3, 7, 8, 9, 15, 17, 19, 20, 21], result: "1-3,7-9,15,17,19-21" },
    { param: [1, 2, 3, 4, 5, 6, 100, 1091, 1999, 2000, 2001, 2002], result: "1-6,100,1091,1999-2002" },
    { param: [1], result: "1" },
    { param: [1, 3, 5, 7, 9, 11], result: "1,3,5,7,9,11" }];

describe('Shrink number sequences function', function() {

    describe('Invalid input array', function() {
        for (var i = 0; i < invalidParameters.length; i++) {
            it('should return error on ' + JSON.stringify(invalidParameters[i]) + ' instead of array', function (done) {
                ShrinkFunction(invalidParameters[i], function (err, result) {
                    if (err) {
                        done();
                    } else {
                        done(new Error('no error has been thrown'));
                    }
                })
            });
        }
    });

    describe('No sequences in array', function() {
        it('should return "1,3,5,7,9,11"', function(done) {
            ShrinkFunction([1,3,5,7,9,11], function(err, result) {
                done(assert.equal("1,3,5,7,9,11", result));
            })
        });
    });

    describe('One number in array', function() {
        it('should return "1"', function(done) {
            ShrinkFunction([1], function(err, result) {
                done(assert.equal("1", result));
            })
        });
    });

    describe('Single full sequence', function() {
        it('should return "1-5"', function(done) {
            ShrinkFunction([1,2,3,4,5], function(err, result) {
                done(assert.equal("1-5", result));
            })
        });
    });

    describe('Separate ranges on edges of array', function() {
        it('should return "1-6,100,1091,1999-2002"', function(done) {
            ShrinkFunction([1,2,3,4,5,6,100,1091,1999,2000,2001,2002], function(err, result) {
                done(assert.equal("1-6,100,1091,1999-2002", result));
            })
        });

        it('should return "1-3,7-9,15,17,19-21"', function(done) {
            ShrinkFunction([1,2,3,7,8,9,15,17,19,20,21], function(err, result) {
                done(assert.equal("1-3,7-9,15,17,19-21", result));
            })
        });
    });

    describe('Range in the middle of array', function() {
        it('should return "1,3-8,10,12,15"', function(done) {
            ShrinkFunction([1,3,4,5,6,7,8,10,12,15], function(err, result) {
                done(assert.equal("1,3-8,10,12,15", result));
            })
        });
    });

    describe('Two numbers range', function() {
        it('should do not shrink "1,2"', function(done) {
            ShrinkFunction([1,2], function(err, result) {
                done(assert.equal("1,2", result));
            })
        });

        it('should do not shrink "1,3,4,6"', function(done) {
            ShrinkFunction([1,3,4,6], function(err, result) {
                done(assert.equal("1,3,4,6", result));
            })
        });
    });

    describe('Task tests', function() {
        for (var i = 0; i < taskTests.length; i++) {
            // case of looping async function calls
            var testData = taskTests[i];
            it('should return ' + taskTests[i].result, function () {
                ShrinkFunction(testData.param, function(err, result) {
                    done(assert.equal(testData.result, result));
                })
            });
        }
    });
});

