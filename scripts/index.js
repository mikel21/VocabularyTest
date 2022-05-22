const maxWordsCount = 10;
const wordShowIntervalInSec = 10;
var timerId;
var wordIndex = 0;
var resultWords = [];
var wordPlaceholder = document.getElementById('j-word-placeholder');

fetch("vocabulary.json")
  .then(response => response.json())
  .then(json => run(json));

  function run(vocabulary){
    updateWord(vocabulary);
    timerId = setInterval(updateWord, wordShowIntervalInSec * 1000, vocabulary);
  }

  function updateWord(vocabulary){
    if (!vocabulary.length){
        clearInterval(timerId);
        wordIndex = 0;
        showResultWords();
        return;
    }
    if (wordIndex >= maxWordsCount){
        clearInterval(timerId);
        wordIndex = 0;
        showResultWords();
        return;
    }
    
    wordPlaceholder.innerHTML = getAndSaveRandomWord(vocabulary);
    wordPlaceholder.style.color = getRandomColor();
    wordPlaceholder.style.fontSize = getRandomFontSize();
    wordIndex++;
  }

  function getAndSaveRandomWord(vocabulary){
    var randomNumber = getRandomInt(vocabulary.length);
    var randomWord = vocabulary[randomNumber];

    resultWords.push(randomWord);
    vocabulary.splice(randomNumber, 1);

    return randomWord.en;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomIntFromMin(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  function getRandomColor(){
      return "rgb(" + getRandomInt(255) + ", " + getRandomInt(255) + ", " + getRandomInt(255) + ")"
  }

  function getRandomFontSize(){
      return getRandomIntFromMin(18, 36) + "px";
  }

  function showResultWords(){
    wordPlaceholder.innerHTML = "";
    resultWords.forEach(element => {
        var wordContainer = document.createElement('div');
        wordContainer.className = "raw-block";
        wordContainer.innerHTML = 
            `<div class='column-block'><div class='text-title'>en word</div><div class='text-template-1'>${element.en}</div></div>` +
            `<div class='column-block'><div class='text-title'>ru word</div><div class='text-template-1'>${element.ru[0]}</div></div>`
        ;
        
        wordPlaceholder.append(wordContainer);
    });
  }