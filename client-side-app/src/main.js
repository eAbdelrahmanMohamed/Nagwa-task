import { useState, useEffect } from "react";
function Logic() {
  let NotChecked = Object.keys(
    document.querySelectorAll("input:not(:checked)")
  );
  let container = document.getElementById("abdo");
  var data_word = container.getAttribute("data-word");
  var word_id = container.getAttribute("data-word-id");
  var data_pos = container.getAttribute("data-pos");

  let Checked = Object.keys(document.querySelectorAll("input:checked"));
  let correct = 0;
  let wrong = 0;
  let submitButton = document.getElementById("submit-btn2");

  submitButton.addEventListener("click", function (Words, index) {
    // console.log(typeof parseInt(word_id));
    // Words = data_word;
    // index = parseInt(word_id);
    if (
      document.getElementById(parseInt(word_id)).innerText === "" ||
      document.getElementById(parseInt(word_id)).innerText === "Please Select An Option"
    ) {
      let v = "";
      if (document.querySelector(`input[name=${data_word}]:checked`) !== null) {
        v = document.querySelector(`input[name=${data_word}]:checked`).value;
        document
          .querySelector(`input[name=${data_word}]:checked`)
          .closest("div").style.backgroundColor = "white";
      }
      // else {
      //   document.getElementById(`${parseInt(word_id)}`).innerText =
      //     "Please Select An Option";
      //   document.getElementById(`${parseInt(word_id)}`).style.color =
      //     "white";
      //   document.getElementById(
      //     `${parseInt(word_id)}`
      //   ).style.backgroundColor = "red";
      // }

      var radio = document.querySelector(`input[name=${data_word}]:checked`);
      const uncheckedRadios = document.querySelectorAll(
        `input:not(:checked)[data-un="${parseInt(word_id)}"]`
      );
      uncheckedRadios.forEach((radio) => {
        radio.disabled = true;
      });
      if (v !== null) {
        if (v === data_pos) {
          // setCorrect((l) => l + 1);
          correct++;
          document.getElementById("inner").style.backgroundColor = "blue";
          document.getElementById("inner").style.width =
            correct === 0 && wrong === 0
              ? "10vw"
              : (parseInt(correct) + parseInt(wrong)) * 10 + "vw";
          document.getElementById(parseInt(word_id)).innerText = "Correct";
          document.getElementById(parseInt(word_id)).style.backgroundColor = "green";
          document.getElementById(parseInt(word_id)).style.color = "white";
          document.getElementById("inner").innerText =
            correct === 1 && wrong === 1
              ? "10%"
              : (parseInt(correct) + parseInt(wrong)) * 10 + "%";
        } else {
          // setwrong((l) => l + 1);
          wrong++;
          document.getElementById("inner").style.backgroundColor = "blue";

          document.getElementById("inner").style.width =
            correct === 1 && wrong === 1
              ? "10vw"
              : (parseInt(correct) + parseInt(wrong)) * 10 + "vw";
          document.getElementById("inner").innerText =
            correct === 0 && wrong === 0
              ? "10%"
              : (parseInt(correct) + parseInt(wrong)) * 10 + "%";

          document.getElementById(parseInt(word_id)).innerText = "Wrong";
          document.getElementById(parseInt(word_id)).style.backgroundColor = "red";
          document.getElementById(parseInt(word_id)).style.color = "white";

          document.querySelector(
            `label[value="${data_pos}"][data-id="${parseInt(word_id)}"]`
          ).style.backgroundColor = "green";
          document.querySelector(
            `label[value="${data_pos}"][data-id="${parseInt(word_id)}"]`
          ).style.color = "white";
        }
      }
      //  else {
      //   document.getElementById(`${parseInt(word_id)}`).innerText =
      //     "Please Select An Option";
      //   document.getElementById(`${parseInt(word_id)}`).style.color =
      //     "white";
      //   document.getElementById(
      //     `${parseInt(word_id)}`
      //   ).style.backgroundColor = "red";
      // }
    }
  });
}

export default Logic;
