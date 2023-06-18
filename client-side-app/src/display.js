import WordFun from "./Words";
function Display(Words, index) {
  console.log(Words);
  return (
   ` <div className="question">
   <div id="abdo" data-word=${Words} data-word-id=${Words[index].id} ></div>

      <div id=${Words[index].id}></div>

      <p id=${Words[index].word}>
        <span>N:${index + 1} </span> ${Words[index].word} is A / An ...??
      </p>
      <section id="selection">
        <input
          type="radio"
          value="verb"
          name=${Words[index].word}
          data-un=${Words[index].id}
        ></input>
        <label value="verb" data-id=${Words[index].id}>
          Verb
        </label>
        <br />

        <input
          type="radio"
          value="noun"
          name=${Words[index].word}
          data-un=${Words[index].id}
        ></input>
        <label value="noun" data-id=${Words[index].id}>
          Noun
        </label>
        <br />

        <input
          type="radio"
          value="adjective"
          name=${Words[index].word}
          data-un=${Words[index].id}
        ></input>
        <label value="adjective" data-id=${Words[index].id}>
          Adjective
        </label>
        <br />

        <input
          type="radio"
          value="adverb"
          name=${Words[index].word}
          data-un=${Words[index].id}
        ></input>
        <label value="adverb" data-id=${Words[index].id}>
          Adverb
        </label>
        <br />
      </section>
      <button
        type="button"     
      >
        submit
      </button>
    </div>`
  );
}
export default Display;
