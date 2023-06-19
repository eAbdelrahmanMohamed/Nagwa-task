import "./App.css";
import Logic from "./main";
import WordFun from "./Words";
import Display from "./display";
// import hoooks to store the data and to run functions on load
import { useState, useEffect } from "react";
import { ReactDOM } from "react";

function App() {
  let [correct, setCorrect] = useState(1); // this is store the correct anwsers
  let [wrong, setwrong] = useState(1); // this is store the correct anwsers
  let [result, setResult] = useState(0); // this is store finial result which is correct + wrong answers
  let [i, setIndex] = useState(1);
  let [seleced, setSelected] = useState([]);
  let [Test, setTest] = useState([]);
  // WordFun().then((res) =>setTest(res))

  // seleced.length=10;
  let [Words, setWords] = useState([]); // this is to store the requested worlist from server
  // this is credentionals / option data / fetch request option
  let options = {
    method: "GET",
  };
  let NotChecked = Object.keys(
    document.querySelectorAll("input:not(:checked)")
  );
  let divsWithMoreThanThreeUnchecked = [];
  let divsWithMoreThanThreechecked = [];
  let Checked = Object.keys(document.querySelectorAll("input:checked"));
  let diff = [];

  /**
 * function accept an array and return the build question on it.
 *
 * @param {Array} arr- this is the wordlist array requested from fetch.
 * @returns {html} a html block contains the( question , options ,submit button , 
 * next button [attempted to use] , finish exam button).

 */
  function Show(index) {
    const opt = {};
    let final = "";
    const divBlocks = [];
    let score = 0;
    // Words.forEach((e, index) => {
    if (Words[index] != undefined || Words[index] != null) {
      console.log(Words[index] == undefined);

      // return (
      divBlocks.push(
        <div className="question">
          <div id={Words[index].id}></div>

          <p>
            <span>N:{index + 1} </span> {Words[index].word} is A / An ...??
          </p>
          <section id="selection">
            <input
              type="radio"
              value="verb"
              name={Words[index].word}
              data-un={Words[index].id}
            ></input>
            <label value="verb" data-id={Words[index].id}>
              Verb
            </label>
            <br />

            <input
              type="radio"
              value="noun"
              name={Words[index].word}
              data-un={Words[index].id}
            ></input>
            <label value="noun" data-id={Words[index].id}>
              Noun
            </label>
            <br />

            <input
              type="radio"
              value="adjective"
              name={Words[index].word}
              data-un={Words[index].id}
            ></input>
            <label value="adjective" data-id={Words[index].id}>
              Adjective
            </label>
            <br />

            <input
              type="radio"
              value="adverb"
              name={Words[index].word}
              data-un={Words[index].id}
            ></input>
            <label value="adverb" data-id={Words[index].id}>
              Adverb
            </label>
            <br />
          </section>

          <div
            id="abdo"
            data-word={Words[index].word}
            data-word-id={Words[index].id}
            data-pos={Words[index].pos}
          ></div>
        </div>
      );
      return divBlocks;
    } else {
      console.log("else " + Words[index]);
    }
    //   );
    // });
    // return divBlocks;
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
      WordFun().then((res) => setTest(res));
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
                Show(0);
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
      <div id="Show">{Show(0)}</div>
      <div className="btns">
        <button
          id="submit-btn2"
          type="button"
          // onClick={() => {
          //   // this is to prevent resubmit the question and avoid recalc question degree / mark
          //   // this like adding disabled to this button
          //   if (
          //     document.getElementById(`${Words[index].id}`).innerText ===
          //       "" ||
          //     document.getElementById(`${Words[index].id}`).innerText ===
          //       "Please Select An Option"
          //   ) {
          //     let v = "";
          //     if (
          //       document.querySelector(
          //         `input[name=${Words[index].word}]:checked`
          //       ) !== null
          //     ) {
          //       v = document.querySelector(
          //         `input[name=${Words[index].word}]:checked`
          //       ).value;
          //       document
          //         .querySelector(`input[name=${Words[index].word}]:checked`)
          //         .closest("div").style.backgroundColor = "white";
          //     }
          //     // else {
          //     //   document.getElementById(`${Words[index].id}`).innerText =
          //     //     "Please Select An Option";
          //     //   document.getElementById(`${Words[index].id}`).style.color =
          //     //     "white";
          //     //   document.getElementById(
          //     //     `${Words[index].id}`
          //     //   ).style.backgroundColor = "red";
          //     // }

          //     var radio = document.querySelector(
          //       `input[name=${Words[index].word}]:checked`
          //     );
          //     const uncheckedRadios = document.querySelectorAll(
          //       `input:not(:checked)[data-un="${Words[index].id}"]`
          //     );
          //     uncheckedRadios.forEach((radio) => {
          //       radio.disabled = true;
          //     });
          //     if (v !== null) {
          //       if (v === Words[index].pos) {
          //         setCorrect((l) => l + 1);
          //         document.getElementById("inner").style.backgroundColor =
          //           "blue";
          //         document.getElementById("inner").style.width =
          //           correct === 1 && wrong === 1
          //             ? "10vw"
          //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
          //         document.getElementById(`${Words[index].id}`).innerText =
          //           "Correct";
          //         document.getElementById(
          //           `${Words[index].id}`
          //         ).style.backgroundColor = "green";
          //         document.getElementById(`${Words[index].id}`).style.color =
          //           "white";
          //         document.getElementById("inner").innerText =
          //           correct === 1 && wrong === 1
          //             ? "10%"
          //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";
          //       } else {
          //         setwrong((l) => l + 1);
          //         document.getElementById("inner").style.backgroundColor =
          //           "blue";

          //         document.getElementById("inner").style.width =
          //           correct === 1 && wrong === 1
          //             ? "10vw"
          //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
          //         document.getElementById("inner").innerText =
          //           correct === 1 && wrong === 1
          //             ? "10%"
          //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";

          //         document.getElementById(`${Words[index].id}`).innerText =
          //           "Wrong";
          //         document.getElementById(
          //           `${Words[index].id}`
          //         ).style.backgroundColor = "red";
          //         document.getElementById(`${Words[index].id}`).style.color =
          //           "white";

          //         document.querySelector(
          //           `label[value="${Words[index].pos}"][data-id="${Words[index].id}"]`
          //         ).style.backgroundColor = "green";
          //         document.querySelector(
          //           `label[value="${Words[index].pos}"][data-id="${Words[index].id}"]`
          //         ).style.color = "white";
          //       }
          //     }
          //     //  else {
          //     //   document.getElementById(`${Words[index].id}`).innerText =
          //     //     "Please Select An Option";
          //     //   document.getElementById(`${Words[index].id}`).style.color =
          //     //     "white";
          //     //   document.getElementById(
          //     //     `${Words[index].id}`
          //     //   ).style.backgroundColor = "red";
          //     // }
          //   }
          // }}
          onClick={() => Logic(Test, i)}
        >
          submit
        </button>
        {/* attemted to use next button to move to next question if they are displayed once each alone*/}
        <button
          type="button"
          onClick={() => {
            setIndex((x) => x + 1);
            document.getElementById("Show").innerHTML = Display(Test, i);
            // document
            //   .querySelector('input[name="option"]:checked')
            //   .removeAttribute("checked");
            // var radio = document.querySelector(
            //   `input[name=${Words[index].word}]:checked`
            // );
            // // radio.checked = false;
            // // index++;
            // if (
            //   document.getElementById(`${Words[index].id}`).innerText == "" ||
            //   document.getElementById(`${Words[index].id}`).innerText ==
            //     "Please Select An Option"
            // ) {
            //   document.getElementById(`${Words[index].id}`).innerText = "";
            //   document.getElementById(`${Words[index].id}`).innerText =
            //     "Please Select An Option";
            // } else {
            //   console.log("next should run");
            //   setIndex((ind) => ind + 1);
            //   console.log("next should run after set index" + i);
            //   document.getElementById("Show").innerHTML = JSON.parse(Show(i));
            //   console.log("next should run after show" + i);

            //   // Show(i);
            // }
          }}
        >
          Next
        </button>
      </div>

      <div>
        {divsWithMoreThanThreechecked.size == 10 && (
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
              // Select all div elements that contain radio buttons
              const divsWithRadioButtons = document.querySelectorAll(
                'div input[type="radio"]'
              );
              // const divsWithRadioButtons2 = document.querySelectorAll(
              //   'div input[type="radio"]'
              // );

              // Filter the div elements based on the number of unchecked radio buttons
              divsWithMoreThanThreeUnchecked = Array.from(divsWithRadioButtons)
                .filter((radio) => {
                  return !radio.checked;
                })
                .reduce((divs, radio) => {
                  const div = radio.closest("div");
                  if (div) {
                    divs.add(div);
                  }
                  return divs;
                }, new Set());
              divsWithMoreThanThreechecked = Array.from(divsWithRadioButtons)
                .filter((radio) => {
                  return radio.disabled;
                })
                .reduce((divs, radio) => {
                  const div = radio.closest("div");
                  if (div) {
                    divs.add(div);
                  }
                  return divs;
                }, new Set());
              // Perform actions on the selected div elements
              // divsWithMoreThanThreeUnchecked.forEach((div) => {
              //   div.style.backgroundColor = "red";
              //   // ...
              // });
              // Math.trunc(NotChecked.length / 4)
              if (divsWithMoreThanThreechecked.size == 10) {
                document.getElementById("NotCom").style.display = "none";
                send();
              } else {
                // divsWithMoreThanThreechecked.forEach((d) => {
                //   d.style.backgroundColor = "white";
                // });
                // divsWithMoreThanThreeUnchecked.forEach((div) => {
                //   div.style.backgroundColor = "rgb(255, 77, 77)";
                // });
                document.getElementById("NotCom").innerText =
                  "Please Complete Your Exam";
              }
              // ?
              // : // diff.forEach((e) => {
              //     let z = [];
              //     z.push(e.closest("div"));
              //     // z=z/4;
              //     setSelected((x) => [...new Set([...x, z])]);

              //     if (Math.trunc(NotChecked.length / 4) != 0) {
              //       e.closest("div").style.backgroundColor = "rgb(255, 77, 77)";
              //     } else {
              //       e.closest("div").style.backgroundColor = "white";
              //     }
              //   })

              console.log(divsWithMoreThanThreechecked.size);

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
        )}
      </div>
      <button>Test Main</button>
      <button onClick={() => console.log(Test)}>Test Words</button>
      <button
        onClick={() => {
          document.getElementById("abdo").innerHTML = Display(Test, 1);
        }}
      >
        Test Display
      </button>
      <button
        onClick={() => {
          // {ReactDOM.createPortal(<Display Words={Words} index={0} />, document.getElementById('abdo'))}

          setIndex((x) => x + 1);
          document.getElementById("abdo").innerHTML = Display(Test, i);
        }}
      >
        Next
      </button>
      {/* <button
           type="button"
           onClick={() => {
             // document
             //   .querySelector('input[name="option"]:checked')
             //   .removeAttribute("checked");
             var radio = document.querySelector(
               `input[name=${Words[index].word}]:checked`
             );
             // radio.checked = false;
             // index++;
             if (
               document.getElementById(`${Words[index].id}`).innerText == "" ||
               document.getElementById(`${Words[index].id}`).innerText ==
                 "Please Select An Option"
             ) {
               document.getElementById(`${Words[index].id}`).innerText = "";
               document.getElementById(`${Words[index].id}`).innerText =
                 "Please Select An Option";
             } else {
               console.log("next should run");
               setIndex((ind) => ind + 1);
               console.log("next should run after set index" + i);
               document.getElementById("Show").innerHTML = JSON.parse(Show(i));
               console.log("next should run after show" + i);
     
               // Show(i);
             }
           }}
         >
           Next
         </button> */}
      <script src="./logic.js"></script>
    </div>
  );
}

export default App;
