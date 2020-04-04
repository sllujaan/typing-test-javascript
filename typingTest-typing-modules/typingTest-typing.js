
import {setCountDown, timer_minute, timer_second} from './timer.js'
import {quote, getQuotes} from '../assets/quotes.js'


//Reading parameter from url---------------
var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var test = urlParams.get('test')
var minParam
if(test) {
    minParam = test
    var minPad = String(minParam).padStart(2, 0)
    timer_minute.innerText = minPad
    timer_second.innerText = '00'
}else{
    minParam = 1
}

//---------------------------------------------


//Setting Coutndown variable-------------------------
var countDownStarted = false
//-----------------------------------------------------

var transform = 0
var first_line_y_client = 0
var typing = null


//dynamically generating html content--------------------------------------------
var basic_words_container =document.getElementsByClassName("basic-words-container")[0]
var quoteWords = getQuotes().trim().split(' ')

function generateWord(word) {
    var basic_word = document.createElement('div')
    basic_word.classList.add("basic-word")
    
    word.trim().split('').forEach(letter => {
        basic_word.append(generateLetter(letter))
    });

    basic_word.append(generateLetter("&nbsp;"))
    return basic_word
}

function generateLetter(letter) {
    var basic_letter = document.createElement('div')
    basic_letter.classList.add("basic-letter")
    basic_letter.innerHTML = letter
    return basic_letter
}

console.log(generateWord("hello"))

quoteWords.forEach(word => {
    basic_words_container.append(generateWord(word))
})



//-------------------------------------------------------------




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
            
            //letter_active.classList.remove("letter-active", "is-wrong", "is-correct")
            
            letter_next.previousElementSibling.classList.add("letter-next")
            //letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            handleBackspaceClasses(letter_active, letter_next)
            var success = 1
            if(callback) callback(success)
        }
        else{
            //letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            letter_active.classList.add("letter-next")
            
            //letter_active.classList.remove("letter-active", "is-wrong", "is-correct")
            letter_active.previousElementSibling.classList.add("letter-active")

            console.log("prev different parent-------------------------->>>>")

            handleBackspaceClasses(letter_active, letter_next)
            var success = 1
            if(callback) callback(success)
        }

    }
    else if(letter_active.parentElement.previousElementSibling && letter_active.parentElement.previousElementSibling.classList.contains("basic-word")) {
            //letter_next.classList.remove("letter-next", "is-wrong", "is-correct")
            letter_active.classList.add("letter-next")

            //letter_active.classList.remove("letter-active", "is-wrong", "is-correct")

            //console.log(letter_active.parentElement.previousElementSibling.lastElementChild)

            letter_active.parentElement.previousElementSibling.lastElementChild.classList.add("letter-active")

            console.log("prev else>>>>>>>>>>>>>>>>")

            handleBackspaceClasses(letter_active, letter_next)
            var success = 1
            if(callback) callback(success)
    }
    else {
        console.log("prev end-------------------------->>>>")

        var success = 1
        if(callback) callback(success)
    }
}


//handle classes when going back-----------------------------
function handleBackspaceClasses(letter_active, letter_next) {
    letter_active.classList.remove("letter-active", "letter-active-animated", "is-wrong", "is-correct", "is-wrong-animated", "is-wrong-active-animated")
    letter_next.classList.remove("letter-next", "is-wrong", "is-correct", "is-wrong-animated", "is-wrong-active-animated")

    if(letter_active.previousElementSibling) {
        letter_active.previousElementSibling.classList.remove("is-wrong", "is-correct", "is-wrong-animated", "is-wrong-active-animated")
    }
    else if(letter_active.parentElement.previousElementSibling){
        letter_active.parentElement.previousElementSibling.lastElementChild.classList.remove("is-wrong", "is-correct", "is-wrong-animated", "is-wrong-active-animated")
    }
    
}
//-----------------------------------------------



document.addEventListener('keydown', (event) => {
    clearTimeout(typing)
    typing = setTimeout(() => {
        onTypingStop()
    }, 2000);

    //Set CountDown-------------------------------------
    if(!countDownStarted) {
        setCountDown(minParam, 0, (done) => {
            if(done) {
                var score = getNetWPM()
                window.location = `../typingTest-finish-modules/typingTest-finish.html?score=${score}`
            }
        })
        countDownStarted = true
    } 
    //------------------------------------


    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_next = document.getElementsByClassName("letter-next")[0]

    var letter_active_prev_position_y = getLetterActiveYposition(letter_active)
    //console.log(letter_active_prev_position_y)
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
            handleClassesOnCorrect(letter_active, letter_next, (success) => {
                if(success) {
                    handleLinesTransform_upwards(letter_active_prev_position_y)
                }
            })
            
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
        //var letter_active_prev_position_y = getLetterActiveYposition(letter_active)
        setPrevLetter((success)=> {
            if (success) handleLinesTransform_downwards(letter_active_prev_position_y)
        })
    }
    //-----------------------------------

    

})




function handleClassesOnCorrect(letter_active, letter_next, callback) {
    letter_active.classList.remove("is-wrong", "letter-active", "letter-active-animated", "is-wrong-animated", "is-wrong-active-animated")
    //letter_active.classList.remove("is-wrong")
    letter_active.classList.add("is-correct")
    letter_next.classList.add("letter-active")

    setTimeout(() => {
        var success = 1
        if(callback) callback(success)
    }, 100);
}

function handleClassesOnWrong(letter_active, letter_next, callback) {
    letter_active.classList.remove("is-correct", "is-wrong", "is-wrong-animated", "is-wrong-active-animated")
    void letter_active.offsetWidth
    letter_active.classList.add("is-wrong", "is-wrong-animated")
    //letter_active.classList.add("is-wrong-animated")
    
    setTimeout(() => {
        var letter_active = document.getElementsByClassName("letter-active")[0]

        if (letter_active.classList.contains("is-wrong")) {
            letter_active.classList.remove("is-wrong", "is-wrong-animated")
        }

        var letter_wrong = document.getElementsByClassName("is-wrong")
        console.log(letter_wrong)
        for(var i=0; i<letter_wrong.length; i++) {
            letter_wrong[i].classList.remove("is-wrong-animated", "letter-active-animated")
        }
        
    }, 500);
}


function handleLinesTransform_upwards(letter_active_prev_position_y) {
    //var letter_active_current_position_y = getLetterActiveYposition(letter_next)
    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_active_current_position_y = getLetterActiveYposition(letter_active)
    
    //var diff = letter_active_current_position_y - letter_active_prev_position_y

    var diff = letter_active_current_position_y - first_line_y_client
    
    console.log(first_line_y_client)
    console.log(letter_active_current_position_y)
    first_line_y_client = letter_active_current_position_y

    
    if(diff > 70) {
        if(basic_words_container_compStyles.getPropertyValue("transform") === "none") {
            var basic_screen = document.getElementsByClassName("basic-screen")[0]
            
            

            transform -= 100
            //void basic_words_container.offsetWidth
            basic_words_container.style.setProperty("transform", `translateY(${transform}px)`)
            basic_screen.style.setProperty("height", "360px")
            //letter_active_position_y = letter_active_current_position_y
            //console.log(letter_active_position_y, letter_active_current_position_y, diff)
        }
        else{
            //console.log(letter_active_position_y, letter_active_current_position_y, diff)
            //console.log("second transform")
            //basic_words_container.classList.remove("transform")
            transform -= 77
            //void basic_words_container.offsetWidth
            basic_words_container.style.setProperty("transform", `translateY(${transform}px)`)
            //basic_words_container.style.transform = "translateY(-81px)"
            //basic_words_container.style.transform += "translateY(-81px)"
        }
    }
    else{
        console.log(letter_active_prev_position_y, letter_active_current_position_y, diff)
    }
    
    
}



function handleLinesTransform_downwards(letter_active_prev_position_y) {
    
    //var letter_active_current_position_y = getLetterActiveYposition(letter_active)
    //var diff = letter_active_prev_position_y - letter_active_current_position_y
    
    var letter_active = document.getElementsByClassName("letter-active")[0]
    var letter_active_current_position_y = getLetterActiveYposition(letter_active)
    
    //var diff = letter_active_current_position_y - letter_active_prev_position_y
    var diff = letter_active_current_position_y - first_line_y_client
    
    console.log(first_line_y_client)
    console.log(letter_active_current_position_y)
    first_line_y_client = letter_active_current_position_y
    
    //console.log("from downwards: ", letter_active_prev_position_y, letter_active_current_position_y, diff)
    
    
    
    if(diff < -70) {
        transform += 77
        //void basic_words_container.offsetWidth
        basic_words_container.style.setProperty("transform", `translateY(${transform}px)`)
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


function getNetWPM() {
    var letters_correct = document.getElementsByClassName("is-correct")
    var total = letters_correct.length
    var wpm = [ (total / 4) / minParam]
    return wpm
}




/*
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
*/


function getLetterActiveYposition(letter_next) {
    return letter_next.getBoundingClientRect().y;
}



//letters y client calculations--------------------------------------
var letter_active = document.getElementsByClassName("letter-active")[0]
first_line_y_client = getLetterActiveYposition(letter_active)
console.log(first_line_y_client)
//---------------------------------------------------------------


function animateLetterAcitve() {
    var letter_active = document.getElementsByClassName("letter-active")[0]
    if (letter_active) letter_active.classList.add("letter-active-animated")
}
animateLetterAcitve()




function onTypingStop() {
    console.log("stoped typing..............")
    animateLetterAcitve()
}


/*
var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
//console.log(urlParams.toString().split('&') )


console.log( urlParams.get('test') )
*/




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



function handleLinesTransform_upwards(letter_next) {
    var letter_active_current_position_y = getLetterActiveYposition(letter_next)
    var diff = letter_active_current_position_y - letter_active_position_y
    
    console.log
    console.log(getLetterActiveYposition(letter_next))

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
    
}




*/