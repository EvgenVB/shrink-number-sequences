# shrink-number-sequences
Converts number array to string with shrinking number sequences n+1

# install

```
npm install shrink-number-sequences
```
# use

```
const ShrinkArray = require('shrink-number-sequences');
const myArray = [1,2,3,4,7,8,10,11,12];

ShrinkArray(myArray, (err, result) => {
    console.log(result); // "1-4,7,8,10-12"
})

```
