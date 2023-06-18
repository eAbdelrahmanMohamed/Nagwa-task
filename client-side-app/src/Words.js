import { useState, useEffect } from "react";

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
}
async function Handle() {
   let test = await WordFun().then((res) => res);
  console.log(test)
  
     return test;

}
export default Handle;
