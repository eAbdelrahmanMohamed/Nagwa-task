import { useState, useEffect } from "react";
var i = [];

async function WordFun() {
  //   let [Words, setWords] = useState([]); // this is to store the requested worlist from server
  //   let options = {
  //       method: "GET",
  //     };
  //   let WordList = async () => {
  //     // fet / get wordlist array from server on port 3001 with GET method
  //     await fetch("http://localhost:3001/WordList", {
  //       method: "GET",
  //     })
  //       // turn result into json form
  //       .then((response) => {
  //           console.log("json")
  //         // response.json();
  //         console.log(response.json())
  //       })
  //       .then((data) => {
  //         console.log("data")
  //         console.log(data);
  //       })

  //       // if there something wrong display it in console
  //       .catch((err) => console.error(err));
  //   };
  const response = await fetch("http://localhost:3001/WordList", {
    method: "GET",
  });
  const json = await response.json();
  return json;
  //   return WordFun().then((res)=>json=res); //do here wathever with
  //   WordList();
  // return WordList();
  // WordFun().then((res) => i=res)
}
// function getWords(variable) {
//   // let [variable,setTest]=useState([]);
//   return variable;
// }
function SetWords(value) {
  // var [x,setTest]=useState([]);
  // value=getWords(value);
  // setTest(value);
  i = value;
  return i;
}
function Handle() {
  WordFun().then((res) => {
    // i=res;
    SetWords(res);

    //   console.log(i)
    //   return res;
    console.log(i);
  });
}
export default WordFun;
