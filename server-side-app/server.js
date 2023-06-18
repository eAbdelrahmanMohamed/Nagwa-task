var http = require("http");
var fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("stream/consumers");
const port = 3001;
let WordList = [];
let result = [];
let ScoresList = [];
let random = [];

const bodyParser = require("body-parser");
const corsOptions = {
  origin: "*",
};
function SetResponse(d){
  const jsonData = JSON.parse(d);
  // store only wordlist from file
  WordList = jsonData.wordList;
 

  if (result.length === 10 && random.length === 10) {
      // if there is already result sended before then delete / empty the result and 
      // random arraies to begain again from start
      // the guarantee new array ever request
    
    random = [];
    result = [];
  }
  for (let i = 0; i < 10; i++) {
    // get random number between 1 and 15 which is the end/length of wordlist
    let rnum = Math.floor(Math.random() * WordList.length) + 1;
    // prevent repeated / duplicate random numbers so after that can use in words array
    if (
      random.includes(rnum) == false &&
      random.length < 10 &&
      WordList.includes(WordList[rnum])
    ) {
      // if there are no repeated numbers => add it to random array
      random.push(rnum);
      // then use that random number as indeex inside wordlist array and add it to result array
      result.push(WordList[rnum]);
    } else {
      // skip if there are repeated numbers
      continue;
    }
  }
  // if result contains 10 items then return
  // else repeat the process until it has 10 items
  if(result.length == 10){
    console.log(result);
    return result;
  }
  else{
    SetResponse(d);
  }
  // result.length == 10 ? result : SetResponse(d);
}
app.use(cors(corsOptions));
// Middleware to parse JSON request body
app.use(bodyParser.json());
// add /rank endpint to enable user to fetch and return his/her rank based on score
app.post("/rank", (req, res) => {
  let Rank = 0;
  let count = 0;

  // allow react running on port 3000 to fetch data
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // reading json file
  fs.readFile("./TestData.json", "utf8", function (err, data) {
    // turn data from file to json form
    const jsonData = JSON.parse(data);

    // store only scorelist from file
    ScoresList = jsonData.scoresList;
    // get value of object numer in request body which is user score
    // Access the submitted data
    const Data = req.body.number;
    // loop throw scorelist array and count how many numbers below user score
    ScoresList.map((index) => {
      if (index < Data) {
        count++;
      }
      return count;
    });
    // calculate the rank of user
    Rank = (count / ScoresList.length) * 100;
    // return the rank
    res.json({ rank: Rank });
  });
});

// add /WordList endpint to enable user to fetch and return 10 random words object
app.get("/WordList", (req, res) => {
  // reading json file
  fs.readFile("./TestData.json", "utf8", function (err, data) {
    // console.log(result);
    // console.log(random);
    // if (result.length === 10 && random.length === 10) {
    //   random = [];
    //   result = [];
    // }
    // allow react running on port 3000 to fetch data
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // turn data from file to json form
    // const jsonData = JSON.parse(data);
    // store only wordlist from file
    // WordList = jsonData.wordList;
    // init the random array / reinit after every call that guarantee new word every time
    SetResponse(data)
    // loop throw the wordlist
    // for (let i = 0; i < 10; i++) {
    //   // get random number between 1 and 15 which is the end/length of wordlist
    //   let rnum = Math.floor(Math.random() * WordList.length) + 1;
    //   // prevent repeated / duplicate random numbers so after that can use in words array
    //   if (
    //     random.includes(rnum) == false &&
    //     random.length < 10 &&
    //     WordList.includes(WordList[rnum])
    //   ) {
    //     // if there are no repeated numbers => add it to random array
    //     random.push(rnum);
    //     // then use that random number as indeex inside wordlist array and add it to result array
    //     result.push(WordList[rnum]);
    //   } else {
    //     // skip if there are repeated numbers
    //     continue;
    //   }
    // }
    // result.length == 10 ? res.json(result) : SetResponse(data);
    
   
    result.length == 10 ? res.json(result) : "";
  });
});

app.listen(port, () => {
  // make server listen / run on port 3001
  console.log(`API server listening on port ${port}`);
});
