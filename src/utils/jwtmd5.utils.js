const md5 = require('md5'); // Import the md5 library or module

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
const year = String(currentDate.getFullYear());
const minute = String(currentDate.getMinutes()).padStart(2, '0');
const inputString = `toearnnow${day}${month}${year}${minute}`;
console.log(inputString);
const secretmd5 = md5(inputString)
console.log(secretmd5);
module.exports = {
    secretmd5
}
