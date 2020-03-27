
var basic_latters = document.getElementsByClassName("basic-letter")
console.log(basic_latters[0])

var basic_words = document.getElementsByClassName("basic-word")
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










/*
var pragraph = "this is a random paragraph."

var words = pragraph.split(' ')

console.log(words)

var basic_word = words[0].split('')
basic_word.push(' ')


console.log(basic_word)



*/