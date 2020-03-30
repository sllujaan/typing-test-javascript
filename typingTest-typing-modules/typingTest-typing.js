
import {setCountDown, timer_minute, timer_second} from './timer.js'

var basic_word = document.getElementsByClassName("basic-word")[0]
basic_word.children[0].classList.add("letter-next")

var basic_words_container = document.getElementsByClassName("basic-words-container")[0]
var basic_words_container_compStyles = window.getComputedStyle(basic_words_container)
console.log(basic_words_container_compStyles)

console.log(basic_words_container_compStyles.getPropertyValue("transform"))

setLetterActive_next()

var letter_active_position_y = getLetterActiveYposition(basic_word.children[0])



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
        var basic_words_container = document.getElementsByClassName("basic-words-container")[0]
        console.log(basic_words_container.lastElementChild.lastElementChild)

        console.log("final stage-------------;;;;;;;;;;;;;;;;;;;;;;;;;")
        console.log(getNetWPM())
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


function setPrevLetter(callback) {
    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_next = document.getElementsByClassName("letter-next")[0]

    console.log(letter_active)
    console.log(letter_next)

    if(letter_active.previousElementSibling) {
        
        if(letter_active.parentElement === letter_next.parentElement) {
            letter_active.previousElementSibling.classList.add("letter-active")
            letter_active.classList.remove("letter-active", "is-wrong", "is-correct")
            
            letter_next.previousElementSibling.classList.add("letter-next")
            letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            var success = 1
            if(callback) callback(success)
        }
        else{
            letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            letter_active.classList.add("letter-next")
            
            letter_active.classList.remove("letter-active", "is-wrong", "is-correct")
            letter_active.previousElementSibling.classList.add("letter-active")

            console.log("prev different parent-------------------------->>>>")

            var success = 1
            if(callback) callback(success)
        }

    }
    else if(letter_active.parentElement.previousElementSibling && letter_active.parentElement.previousElementSibling.classList.contains("basic-word")) {
            letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            letter_active.classList.add("letter-next")

            letter_active.classList.remove("letter-active", "is-wrong", "is-correct")

            console.log(letter_active.parentElement.previousElementSibling.lastElementChild)

            letter_active.parentElement.previousElementSibling.lastElementChild.classList.add("letter-active")

            console.log("prev else>>>>>>>>>>>>>>>>")

            var success = 1
            if(callback) callback(success)
    }
    else {
        console.log("prev end-------------------------->>>>")

        var success = 1
        if(callback) callback(success)
    }
}




document.addEventListener('keyup', (event) => {

    //Set CountDown---------------------------------
    setCountDown(1, 59, (done) => {
        if(done) console.log(done)
    })
    //-----------------------------

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
    //Normal next functionality---------------
    if((event.key !== "Shift") && (event.key !== "Backspace")) {
        if(letter_active.innerText.trim() === event.key.trim()){
            console.log("correct.")
            setLetterActive_next()
            handleClassesOnCorrect(letter_active, letter_next)
            handleLinesTransform_upwards(letter_next)
        }
        else{
            console.log("wrong.")
            if(letter_active.previousElementSibling && letter_active.previousElementSibling.classList.contains("is-correct")) {
                setLetterActive_next()
            }
            
            handleClassesOnWrong(letter_active, letter_next)
            
        }

    }
    //-------------------------------------------------


    //Backspace functionality---------------------------------------
    if(event.key === "Backspace") {
        console.log("nowwwww")
        var letter_active_prev_position_y = getLetterActiveYposition(letter_active)
        setPrevLetter((success)=> {
            if (success) handleLinesTransform_downwards(letter_active, letter_active_prev_position_y)
        })
    }
    //-----------------------------------

    //space comparison------------------------------
    function isSpace(event, text) {
        console.log(text)
        if( (event.Code === "Space") && (text === "&npsp;") ) {
            return true
        }
        return false
    }
    //--------------------------------------------

})


function handleClassesOnCorrect(letter_active, letter_next) {
    letter_active.classList.remove("letter-active")
    letter_active.classList.remove("is-wrong")
    letter_active.classList.add("is-correct")
    letter_next.classList.add("letter-active")
}

function handleClassesOnWrong(letter_active, letter_next) {
    letter_active.classList.remove("is-wrong-animated")
    void letter_active.offsetWidth
    letter_active.classList.add("is-wrong")
    letter_active.classList.add("is-wrong-animated")
}


function getNetWPM() {
    var letters_correct = document.getElementsByClassName("is-correct")
    return letters_correct.length
}



function handleLinesTransform_upwards(letter_next) {
    var letter_active_current_position_y = getLetterActiveYposition(letter_next)
    var diff = letter_active_current_position_y - letter_active_position_y

    if(diff > 50) {
        if(basic_words_container_compStyles.getPropertyValue("transform") === "none") {
            basic_words_container.style.setProperty("transform", "translateY(-101px)")
            //letter_active_position_y = letter_active_current_position_y
            console.log(letter_active_position_y, letter_active_current_position_y, diff)
        }
        else{
            console.log(letter_active_position_y, letter_active_current_position_y, diff)
            console.log("second transform")
            basic_words_container.style.transform += "translateY(-81px)"
        }
    }
    else{
        console.log(letter_active_position_y, letter_active_current_position_y, diff)
    }
    console.log(getLetterActiveYposition(letter_next))
}



function handleLinesTransform_downwards(letter_active, letter_active_prev_position_y) {
    var letter_active_current_position_y = getLetterActiveYposition(letter_active)
    var diff = letter_active_prev_position_y - letter_active_current_position_y
    
    console.log("from downwards: ", letter_active_prev_position_y, letter_active_current_position_y, diff)
    
    if(diff < -2) {
        basic_words_container.style.transform += "translateY(81px)"
    }
    
    
    /*
    if(diff > 50) {
        if(basic_words_container_compStyles.getPropertyValue("transform") === "none") {
            basic_words_container.style.setProperty("transform", "translateY(-101px)")
            //letter_active_position_y = letter_active_current_position_y
            console.log(letter_active_position_y, letter_active_current_position_y, diff)
        }
        else{
            console.log(letter_active_position_y, letter_active_current_position_y, diff)
            console.log("second transform")
            basic_words_container.style.transform += "translateY(-81px)"
        }
    }
    else{
        console.log(letter_active_position_y, letter_active_current_position_y, diff)
    }*/
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



function getLetterActiveYposition(letter_next) {
    return letter_next.getBoundingClientRect().y;
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