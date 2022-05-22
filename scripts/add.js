var addBtn = document.getElementById("j-add-word");
var error = document.getElementById("error");

addBtn.addEventListener("click", saveWord, false);

function saveWord(){
    var enWord = document.getElementById("enWord").value;
    var ruWord = document.getElementById("ruWord").value;
    var description = document.getElementById("description").value;
    var sample = document.getElementById("sample").value;

    var newWord = {
        en: enWord,
        ru: [ruWord],
        description,
        examples: [sample]
    };

    fetch("vocabulary.json")
        .then(response => response.json())
        .then(json => addWordAndSave(json, newWord));
}

function addWordAndSave(vocabulary, newWord){
    if (vocabulary.some(e => e.en === newWord.en)){
        error.classList.remove('hide');
        return;
    }
    error.classList.add('hide');
    vocabulary.push(newWord);
    var data = JSON.stringify(vocabulary);
    saveToFileV2(data);
}

function saveToFileV2(data){
    var a = document.createElement("a");
    var url = window.URL.createObjectURL(new Blob([data], {type: "application/json"})); 
    a.href = url;
    a.download = "vocabulary.json";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(url);
}