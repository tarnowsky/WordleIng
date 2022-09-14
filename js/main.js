document.addEventListener("DOMContentLoaded", () => {
    
    createSquares();

    //also in local storage
    let guessedWordCount = 0;
    let availableSpace = 1;
    let guessedWords = [[]];
    
    const availableWords = ['becia', 'natan', 'matma'];
    
    var word = getNewWord();
    
    const keys = document.querySelectorAll(".keyboard-row button");
    
    function getNewWord() {
        var newWord = availableWords[Math.floor(Math.random()*availableWords.length)];
        word = newWord;
        return word;
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }
    
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }
        
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);
        
        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        
        if (currentWordArr.length !== 5 ) {
            window.alert("Word must be 5 letters");
            return;
        }
        
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color: ${tileColor}; border-color: ${tileColor}`;
            }, interval * index);
        });
        
        const currentWord = currentWordArr.join('');

        if (currentWord === word || (guessedWordCount == 5 && currentWord != word)) {
            setTimeout(() => {      
                if (currentWord === word) {
                    window.alert("Congratulations!");
                    if (okSelected) {
                        clearBoard();
                        showResults();
                        updateWordIndex();
                    }
                } else {
                    window.alert(`Sorry, you have no more guesses! The word is "${word.toUpperCase()}".`);
                }
            }, 1200);
        }

        guessedWordCount += 1;
        
        guessedWords.push([]);
    }
    
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let sqaure = document.createElement("div");
            sqaure.classList.add("square");
            sqaure.classList.add("animate__animated");
            sqaure.setAttribute("id", index + 1);
            gameBoard.appendChild(sqaure);
        }
    }
    
    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;
        
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        
        lastLetterEl.textContent = '';
        availableSpace -= 1;
    }
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            
            if (letter == 'enter') {
                handleSubmitWord();
                return;
            }
            
            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }
            
            updateGuessedWords(letter);
        };
    }
    
});