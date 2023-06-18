import { useState, useEffect } from "react";
function Logic() {

  let NotChecked = Object.keys(
    document.querySelectorAll("input:not(:checked)")
  );
  let container=document.getElementById("abdo");
  let data_word=container.getAttribute("data-word");
  let word_id=container.getAttribute("data-word-id");

  let Checked = Object.keys(document.querySelectorAll("input:checked"));
let correct=0;
let wrong=0;
let submitButton = document.getElementById("submit-btn");
// console.log("data-word : "+data_word);
// console.log("data-word-id : "+word_id);

submitButton.addEventListener("click",function(Words,index){
// console.log("tesr submit");
Words=data_word;
index=word_id;
  if (
    document.getElementById(`${word_id}`).innerText === "" ||
    document.getElementById(`${word_id}`).innerText ===
      "Please Select An Option"
  ) {
    let v = "";
    if (
      document.querySelector(`input[name=${data_word}]:checked`) !==
      null
    ) {
      v = document.querySelector(
        `input[name=${data_word}]:checked`
      ).value;
      document
        .querySelector(`input[name=${data_word}]:checked`)
        .closest("div").style.backgroundColor = "white";
    }
    // else {
    //   document.getElementById(`${word_id}`).innerText =
    //     "Please Select An Option";
    //   document.getElementById(`${word_id}`).style.color =
    //     "white";
    //   document.getElementById(
    //     `${word_id}`
    //   ).style.backgroundColor = "red";
    // }

    var radio = document.querySelector(
      `input[name=${data_word}]:checked`
    );
    const uncheckedRadios = document.querySelectorAll(
      `input:not(:checked)[data-un="${word_id}"]`
    );
    uncheckedRadios.forEach((radio) => {
      radio.disabled = true;
    });
    if (v !== null) {
      if (v === Words[index].pos) {
        // setCorrect((l) => l + 1);
        correct++;
        document.getElementById("inner").style.backgroundColor = "blue";
        document.getElementById("inner").style.width =
          correct === 1 && wrong === 1
            ? "10vw"
            : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
        document.getElementById(`${word_id}`).innerText = "Correct";
        document.getElementById(`${word_id}`).style.backgroundColor =
          "green";
        document.getElementById(`${word_id}`).style.color = "white";
        document.getElementById("inner").innerText =
          correct === 1 && wrong === 1
            ? "10%"
            : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";
      } else {
        // setwrong((l) => l + 1);
        wrong++;
        document.getElementById("inner").style.backgroundColor = "blue";

        document.getElementById("inner").style.width =
          correct === 1 && wrong === 1
            ? "10vw"
            : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
        document.getElementById("inner").innerText =
          correct === 1 && wrong === 1
            ? "10%"
            : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";

        document.getElementById(`${word_id}`).innerText = "Wrong";
        document.getElementById(`${word_id}`).style.backgroundColor =
          "red";
        document.getElementById(`${word_id}`).style.color = "white";

        document.querySelector(
          `label[value="${Words[index].pos}"][data-id="${word_id}"]`
        ).style.backgroundColor = "green";
        document.querySelector(
          `label[value="${Words[index].pos}"][data-id="${word_id}"]`
        ).style.color = "white";
      }
    }
    //  else {
    //   document.getElementById(`${word_id}`).innerText =
    //     "Please Select An Option";
    //   document.getElementById(`${word_id}`).style.color =
    //     "white";
    //   document.getElementById(
    //     `${word_id}`
    //   ).style.backgroundColor = "red";
    // }
  }
})
// submitButton.on("click", function () {
//   // onClick={() => {
//   // this is to prevent resubmit the question and avoid recalc question degree / mark
//   // this like adding disabled to this button
// //   if (
// //     document.getElementById(`${word_id}`).innerText === "" ||
// //     document.getElementById(`${word_id}`).innerText ===
// //       "Please Select An Option"
// //   ) {
// //     let v = "";
// //     if (
// //       document.querySelector(`input[name=${data_word}]:checked`) !==
// //       null
// //     ) {
// //       v = document.querySelector(
// //         `input[name=${data_word}]:checked`
// //       ).value;
// //       document
// //         .querySelector(`input[name=${data_word}]:checked`)
// //         .closest("div").style.backgroundColor = "white";
// //     }
// //     // else {
// //     //   document.getElementById(`${word_id}`).innerText =
// //     //     "Please Select An Option";
// //     //   document.getElementById(`${word_id}`).style.color =
// //     //     "white";
// //     //   document.getElementById(
// //     //     `${word_id}`
// //     //   ).style.backgroundColor = "red";
// //     // }

// //     var radio = document.querySelector(
// //       `input[name=${data_word}]:checked`
// //     );
// //     const uncheckedRadios = document.querySelectorAll(
// //       `input:not(:checked)[data-un="${word_id}"]`
// //     );
// //     uncheckedRadios.forEach((radio) => {
// //       radio.disabled = true;
// //     });
// //     if (v !== null) {
// //       if (v === Words[index].pos) {
// //         // setCorrect((l) => l + 1);
// //         correct++;
// //         document.getElementById("inner").style.backgroundColor = "blue";
// //         document.getElementById("inner").style.width =
// //           correct === 1 && wrong === 1
// //             ? "10vw"
// //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
// //         document.getElementById(`${word_id}`).innerText = "Correct";
// //         document.getElementById(`${word_id}`).style.backgroundColor =
// //           "green";
// //         document.getElementById(`${word_id}`).style.color = "white";
// //         document.getElementById("inner").innerText =
// //           correct === 1 && wrong === 1
// //             ? "10%"
// //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";
// //       } else {
// //         // setwrong((l) => l + 1);
// //         wrong++;
// //         document.getElementById("inner").style.backgroundColor = "blue";

// //         document.getElementById("inner").style.width =
// //           correct === 1 && wrong === 1
// //             ? "10vw"
// //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "vw";
// //         document.getElementById("inner").innerText =
// //           correct === 1 && wrong === 1
// //             ? "10%"
// //             : (parseInt(correct) + parseInt(wrong) - 1) * 10 + "%";

// //         document.getElementById(`${word_id}`).innerText = "Wrong";
// //         document.getElementById(`${word_id}`).style.backgroundColor =
// //           "red";
// //         document.getElementById(`${word_id}`).style.color = "white";

// //         document.querySelector(
// //           `label[value="${Words[index].pos}"][data-id="${word_id}"]`
// //         ).style.backgroundColor = "green";
// //         document.querySelector(
// //           `label[value="${Words[index].pos}"][data-id="${word_id}"]`
// //         ).style.color = "white";
// //       }
// //     }
// //     //  else {
// //     //   document.getElementById(`${word_id}`).innerText =
// //     //     "Please Select An Option";
// //     //   document.getElementById(`${word_id}`).style.color =
// //     //     "white";
// //     //   document.getElementById(
// //     //     `${word_id}`
// //     //   ).style.backgroundColor = "red";
// //     // }
// //   }
//   //   }}
// });
}

export default Logic;
