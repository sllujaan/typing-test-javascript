
var basic_word = document.getElementsByClassName("basic-word")[0]
basic_word.children[0].classList.add("letter-next")


setLetterActive_next()



function setNextLetter() {
    var letter_next = document.getElementsByClassName("letter-next")[0]

    if(letter_next.nextElementSibling) {
        letter_next.classList.remove("letter-next")
        letter_next = letter_next.nextElementSibling
        letter_next.classList.add("letter-next")
    }
    else if(letter_next.parentElement.nextElementSibling && letter_next.parentElement.nextElementSibling.classList.contains("basic-word")){
        letter_next.classList.remove("letter-next")
        var current_word = letter_next.parentElement
        current_word = current_word.nextElementSibling
        current_word.children[0].classList.add("letter-next")
    }
    else{
        console.log("end")
    }
}


function setLetterActive_next() {
    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_next = document.getElementsByClassName("letter-next")[0]

    if(letter_active) {
        letter_active.classList.remove("letter-active")
        letter_next.classList.add("letter-active")
        setNextLetter()
    }
    else{
        letter_next.classList.add("letter-active")
        setNextLetter()
    }
    

}


function setPrevLetter() {
    var letter_next = document.getElementsByClassName("letter-next")[0]

    if(letter_next.previousElementSibling) {
        letter_next.classList.remove("letter-next")
        letter_next = letter_next.nextElementSibling
        letter_next.classList.add("letter-next")
    }
    else if(letter_next.parentElement.nextElementSibling && letter_next.parentElement.nextElementSibling.classList.contains("basic-word")){
        letter_next.classList.remove("letter-next")
        var current_word = letter_next.parentElement
        current_word = current_word.nextElementSibling
        current_word.children[0].classList.add("letter-next")
    }
    else{
        console.log("end")
    }
}




document.addEventListener('keyup', (event) => {

    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_next = document.getElementsByClassName("letter-next")[0]
    /*
    var letter_active = document.getElementsByClassName("letter-next")[0]
    var word_current = letter_active.parentElement
    var letter_next

    if(letter_active.nextElementSibling) {
        letter_next = letter_active.nextElementSibling
    }
    else{
        
        current_word = current_word.nextElementSibling
        console.log(current_word)
        letter_active = current_word.children[0]
        next_letter = letter_active.nextElementSibling

        console.log(letter_active)
        console.log(next_letter)
        
    }*/

    console.log(letter_active.innerText)
    console.log(event.key)
    if(event.key !== "Shift") {
        if(letter_active.innerText === event.key){
            console.log("correct.")
            setLetterActive_next()
            handleClassesOnCorrect(letter_active, letter_next)
        }
        else{
            console.log("wrong.")
            handleClassesOnWrong(letter_active, letter_next)
        }
    }

})


function handleClassesOnCorrect(letter_active, letter_next) {
    letter_active.classList.remove("letter-active")
    letter_active.classList.add("is-correct")
    letter_next.classList.add("letter-active")
}

function handleClassesOnWrong(letter_active, letter_next) {
    letter_active.classList.remove("is-wrong-animated")
    void letter_active.offsetWidth
    letter_active.classList.add("is-wrong")
    letter_active.classList.add("is-wrong-animated")
}




function getNextLetter() {

}











function performAction(event) {
    if(event.key !== "Shift") {
        if(letter_active.innerText === event.key){
            console.log("correct.")
            letter_active.classList.remove("letter-active")
            letter_active.classList.add("is-correct")
            next_letter.classList.add("letter-active")
        }
        else{
            console.log("wrong.")
            letter_active.classList.remove("is-wrong-animated")
            void letter_active.offsetWidth
            letter_active.classList.add("is-wrong")
            letter_active.classList.add("is-wrong-animated")
        }
    }
}







/*
var pragraph = "this is a random paragraph."

var words = pragraph.split(' ')

console.log(words)

var basic_word = words[0].split('')
basic_word.push(' ')


console.log(basic_word)




var basic_words = document.getElementsByClassName("basic-word")[0]
console.log(basic_words)


document.addEventListener('keyup', (event) => {
    var letter_active = document.getElementsByClassName("letter-active")[0]
    var basic_word = letter_active.parentElement
    var next_letter = letter_active.nextElementSibling
    console.log(basic_word)
    console.log(next_letter)
    if(event.key !== "Shift") {
        if(letter_active.innerText === event.key){
            console.log("correct.")
            letter_active.classList.remove("letter-active")
            letter_active.classList.add("is-correct")
            next_letter.classList.add("letter-active")
        }
        else{
            console.log("wrong.")
            letter_active.classList.remove("is-wrong-animated")
            void letter_active.offsetWidth
            letter_active.classList.add("is-wrong")
            letter_active.classList.add("is-wrong-animated")
        }
    }
    
    console.log(letter_active)
    console.log(event)
})






*/