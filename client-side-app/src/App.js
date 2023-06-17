import "./App.css";
// import hoooks to store the data and to run functions on load
import { useState, useEffect } from "react";

function App() {
  let [correct, setCorrect] = useState(1); // this is store the correct anwsers
  let [wrong, setwrong] = useState(1); // this is store the correct anwsers
  let [result, setResult] = useState(0); // this is store finial result which is correct + wrong answers
  let [i, setIndex] = useState(0);
  let [seleced, setSelected] = useState([]);
  // seleced.length=10;
  let [Words, setWords] = useState([]); // this is to store the requested worlist from server
  // this is credentionals / option data / fetch request option
  let options = {
    method: "GET",
  };
  let NotChecked = document.querySelectorAll("input:not(:checked)");
  let Checked = document.querySelectorAll("input:checked");
  let diff = [];

  /**
 * function accept an array and return the build question on it.
 *
 * @param {Array} arr- this is the wordlist array requested from fetch.
 * @returns {html} a html block contains the( question , options ,submit button , 
 * next button [attempted to use] , finish exam button).

 */
  function Show(arr) {
    const opt = {};
    let final = "";
    const divBlocks = [];
    let score = 0;
    Words.forEach((e, index) => {
      divBlocks.push(
        <div className="question">
          <div id={arr[index].id}></div>

          <p>
            <span>N:{index + 1} </span> {arr[index].word} is A / An ...??
          </p>
          <section id="selection">
            <input
              type="radio"
              value="verb"
              name={arr[index].word}
              data-un={arr[index].id}
            ></input>
            <label value="verb" data-id={arr[index].id}>
              Verb
            </label>
            <br />

            <input
              type="radio"
              value="noun"
              name={arr[index].word}
              data-un={arr[index].id}
            ></input>
            <label value="noun" data-id={arr[index].id}>
              Noun
            </label>
            <br />

            <input
              type="radio"
              value="adjective"
              name={arr[index].word}
              data-un={arr[index].id}
            ></input>
            <label value="adjective" data-id={arr[index].id}>
              Adjective
            </label>
            <br />

            <input
              type="radio"
              value="adverb"
              name={arr[index].word}
              data-un={arr[index].id}
            ></input>
            <label value="adverb" data-id={arr[index].id}>
              Adverb
            </label>
            <br />
          </section>
          <button
            type="button"
            onClick={() => {
              // this is to prevent resubmit the question and avoid recalc question degree / mark
              // this like adding disabled to this button
              if (
                document.getElementById(`${arr[index].id}`).innerText === ""
              ) {
                let v = document.querySelector(
                  `input[name=${arr[index].word}]:checked`
                ).value;
                document
                  .querySelector(`input[name=${arr[index].word}]:checked`)
                  .closest("div").style.backgroundColor = "white !important";
                // var radio = document.querySelector(
                //   `input[name=${arr[index].word}]:checked`
                // );
                const uncheckedRadios = document.querySelectorAll(
                  `input:not(:checked)[data-un="${arr[index].id}"]`
                );
                uncheckedRadios.forEach((radio) => {
                  radio.disabled = true;
                });

                if (v === arr[index].pos) {
                  setCorrect((l) => l + 1);
                  document.getElementById("inner").style.backgroundColor =
                    "blue";
                  document.getElementById("inner").style.width =
                    correct === 1 && wrong === 1
                      ? "10vw"
                      : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
                  document.getElementById(`${arr[index].id}`).innerText =
                    "Correct";
                  document.getElementById(
                    `${arr[index].id}`
                  ).style.backgroundColor = "green";
                  document.getElementById(`${arr[index].id}`).style.color =
                    "white";
                  document.getElementById("inner").innerText =
                    correct === 1 && wrong === 1
                      ? "10%"
                      : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";
                } else {
                  setwrong((l) => l + 1);
                  document.getElementById("inner").style.backgroundColor =
                    "blue";

                  document.getElementById("inner").style.width =
                    correct === 1 && wrong === 1
                      ? "10vw"
                      : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
                  document.getElementById("inner").innerText =
                    correct === 1 && wrong === 1
                      ? "10%"
                      : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";

                  document.getElementById(`${arr[index].id}`).innerText =
                    "Wrong";
                  document.getElementById(
                    `${arr[index].id}`
                  ).style.backgroundColor = "red";
                  document.getElementById(`${arr[index].id}`).style.color =
                    "white";

                  document.querySelector(
                    `label[value="${arr[index].pos}"][data-id="${arr[index].id}"]`
                  ).style.backgroundColor = "green";
                  document.querySelector(
                    `label[value="${arr[index].pos}"][data-id="${arr[index].id}"]`
                  ).style.color = "white";
                }
              }
            }}
          >
            submit
          </button>
          {/* attemted to use next button to move to next question if they are displayed once each alone*/}
          {/* <button
            type="button"
            onClick={() => {
              // document
              //   .querySelector('input[name="option"]:checked')
              //   .removeAttribute("checked");
              var radio = document.querySelector(
                `input[name=${arr[index].word}]:checked`
              );
              // radio.checked = false;
              // index++;
              setIndex((ind) => ++ind);

              // Show(Words, i);
            }}
          >
            Next
          </button> */}
        </div>
      );
    });

    return divBlocks;
  }
  /**
   * function that fetch / get wordlist from server on 3001 and store it in words variable.
   *
   * @returns {Array} a wordlist array stored in words vaiable
   */
  let WordList = async () => {
    // fet / get wordlist array from server on port 3001 with GET method
    await fetch("http://localhost:3001/WordList", options)
      // turn result into json form
      .then((response) => response.json())
      .then((response) => {
        // after that store it in words vaiable using setWords methos to be able to acces and
        // change words value to new one
        setWords(response);
      })
      // if there something wrong display it in console
      .catch((err) => console.error(err));
  };

  // useing a hook to run the fetch one time on load
  useEffect(() => {
    return () => {
      WordList();
    };
  }, []);

  return (
    <div className="App">
      <div>
        {/* this hide the div until the is a result after finish the exam and make result with 2 number after point */}
        {result !== 0 && (
          <div id="res_div">
            <h1 id="result">your rank is : {result.rank.toFixed(2)}</h1>
            <button
              onClick={() => {
                document.location.reload();
                // document.location.reload();
                WordList();
                Show(Words);
                setResult((e) => (e = 0));
                setCorrect((i) => (i = 1));
                setwrong((x) => (x = 1));
              }}
            >
              Try Again
            </button>
          </div>
        )}

        <h1 id="NotCom"></h1>

        <div id="test" data-after="">
          {/* below to display progress percent based on answered questions divided by question total*/}
          <div id="inner"></div>
        </div>
      </div>
      {/* use show function to build question based on words */}
      {Show(Words)}

      <div>
        <button
          type="button"
          id="finish"
          onClick={() => {
            // if (result == 0) {
            // console.log("this is correct " + correct);
            // console.log("this is wrong " + wrong);
            // let NotChecked = document.querySelectorAll("input:not(:checked)");
            // let Checked = document.querySelectorAll("input:checked");
            // calculate the score based on correct an wrong answers
            let score = { number: (correct - wrong + 1) * 10 };
            // this is credentionals / fetch options / fetch description
            let opt = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // turn to json form so that server can turn it again to object

              body: JSON.stringify(score),
            };
            /**
             * function that fetch / sends score to server on 3001 andreturn the rank.
             *
             * @returns {Array} a wordlist array stored in words vaiable
             */
            let send = async () => {
              await fetch("http://localhost:3001/rank", opt)
                .then((response) => response.json())
                // after returning thr rank store it in result variable
                // using setResult function to enable access and update result value
                .then((response) => {
                  setResult(response);
                })
                // if there is an error display it in console
                .catch((err) => console.error(err));
            };
            // call the function
            // let c = document.querySelectorAll("input:not(:checked)");
            diff = Checked.filter((x) => !NotChecked.includes(x));

            Math.trunc(NotChecked.length / 4) === 0
              ? send()
              : diff.forEach((e) => {
                  let z = [];
                  z.push(e.closest("div"));
                  // z=z/4;
                  setSelected((x) => [...new Set([...x, z])]);

                  if (Math.trunc(NotChecked.length / 4) !== 0) {
                    e.closest("div").style.backgroundColor = "rgb(255, 77, 77)";
                  } else {
                    e.closest("div").style.backgroundColor = "white";
                  }
                });
            console.log(Checked[0].closest("div"));
            document.getElementById("NotCom").innerText =
              "Please Complete Your Exam";

            function scrollToTop() {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }

            // Call the scrollToTop function to scroll to the top of the page
            scrollToTop();
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default App;
