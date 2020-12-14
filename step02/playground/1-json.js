const fs = require("fs");

// const book = {
//   title: "Note Title",
//   author: "Holiday",
// };

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync("1-json.json", bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data);

const dataBuffer = fs.readFileSync("1-json.json");
const dateToJSON = dataBuffer.toString();
const data = JSON.parse(dateToJSON);

data.name = "baker";
data.age = 23;

const convertedData = JSON.stringify(data);

fs.writeFileSync("1-json.json", convertedData);
