fetch("vocabulary.json")
        .then(response => response.json())
        .then(json => showWords(json));

function showWords(vocabulary) {
    var wordsPlaceholder = document.getElementById("j-words-placeholder");
    vocabulary.forEach(element => {
        var wordContainer = document.createElement('div');
        wordContainer.className = "raw-block";
        wordContainer.innerHTML = 
            `<div class='column-block'><div class='text-title'>en word</div><div class='text-template-1'>${element.en}</div></div>` +
            `<div class='column-block'><div class='text-title'>ru word</div><div class='text-template-1'>${element.ru[0]}</div></div>` +
            `<div class='column-block'><div class='text-title'>description</div><div class='text-template-1'>${element.description}</div></div>` +
            `<div class='column-block'><div class='text-title'>sample</div><div class='text-template-1'>${element.examples[0]}</div></div>`
        ;
         
        wordsPlaceholder.append(wordContainer);
    });
}