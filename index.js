//
// ES5 compatible code
//

var RANGE_SEPARATOR_CHAR = '-';
var SEPARATOR_CHAR = ',';

module.exports = function(sourceArray, cb) {
    // Makes call async
    process.nextTick(function() {
        // check input array
        if (!sourceArray || !Array.isArray(sourceArray)) {
            cb(new Error('Not defined or invalid input array parameter'));
            return;
        }

        var resultString = '',
                lastValue  = -1,
                currentValue  = -1,
                rangeStartValue = -1,
                isNextNumberInRange = false,
                isLastValue = false;

        for (var i = 0; i < sourceArray.length; i++) {
            currentValue = sourceArray[i];
            isNextNumberInRange = (lastValue + 1 === currentValue && i !== 0);
            isLastValue = (i === sourceArray.length - 1);

            // handles state when range breaks in the middle of array
            if (!isNextNumberInRange
                    && rangeStartValue > -1) {

                // checks range longer than two numbers
                if (lastValue - rangeStartValue > 1) {
                    resultString += RANGE_SEPARATOR_CHAR + lastValue;
                } else {
                    resultString += SEPARATOR_CHAR + lastValue;
                }

                // reset range start value
                rangeStartValue = -1;
            }

            if (i === 0) {
                resultString += currentValue;
            } else if (isNextNumberInRange) {
                // must to handle last array value
                if (isLastValue) {
                    // checks that range was started and has ended by last value
                    // and is more than two numbers in row
                    if (rangeStartValue > -1
                            && currentValue - rangeStartValue > 1) {
                        resultString += RANGE_SEPARATOR_CHAR + currentValue;
                    } else {
                        resultString += SEPARATOR_CHAR + currentValue;
                    }
                }
                // checks to start range handling
                if (rangeStartValue === -1) rangeStartValue = lastValue;
            } else {
                // handles not in range values
                resultString += SEPARATOR_CHAR + currentValue;
            }

            lastValue = currentValue;
        }

        cb(null, resultString);
    });
}