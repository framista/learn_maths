import {setPosition} from './position.js'
import {prepareDataArray} from './prepareData'

const cardsAmount = 24;
let operation = 'multiply';
let gameData = [];

const cards = [...document.getElementsByClassName("element")];
const multiplyHref = document.getElementById('multiply');
const powerHref = document.getElementById('power');
const rootHref = document.getElementById('root');

let activeCard;
const activeCards = [];
let pairsFound = 0;
let cardPosition
let movesAmount = 0;
const startTime = new Date().getDate();

multiplyHref.addEventListener('click', e => {
    e.preventDefault()
    if (confirm('Chcesz zacząć naukę mnożenia?')){
        operation = 'multiply'
        init()
    }
})

powerHref.addEventListener('click', e => {
    e.preventDefault()
    if (confirm('Chcesz zacząć naukę potęgowania?')){
        operation = 'power'
        init()
    }
})

rootHref.addEventListener('click', e => {
    e.preventDefault()
    if (confirm('Chcesz zacząć naukę pierwiastkowania?')){
        operation = 'root'
        init()
    }
})


function clickedCard() {
    activeCard = parseInt(this.id)

    if (activeCard === activeCards[0]) return
    if (this.classList.contains("element--guessed")) return
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        cardPosition = setPosition(gameData, activeCard)
        if (cardPosition[2] == 0)
           showOperation(cardPosition)
        else
            showResult(cardPosition)
        cards[activeCard].classList.add("element--showed")
        movesAmount++;
        return
    } else {
        cards.forEach(card => card.removeEventListener("click", clickedCard))
        movesAmount++;
        cards[activeCard].classList.add("element--showed")
        let cardPosition2 = setPosition(gameData, activeCard)
        if (cardPosition2[2] == 0)
            showOperation(cardPosition2)
        else
            showResult(cardPosition2)
        activeCards[1] = activeCard
        setTimeout(() => {
            activeCards.forEach(e => cards[e].innerHTML = "")
            if (activeCard === cardPosition[1]) {
                activeCards.forEach(e => cards[e].classList.add("element--guessed"))
                pairsFound++;

                if (pairsFound === cardsAmount / 2) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert("WYGRANA " + gameTime + " ilosc ruchow " + movesAmount)
                    location.reload()
                }

            } else {
                activeCards.forEach(e => cards[e].classList.remove("element--showed"))
            }
            activeCard = ""
            activeCards.length = 0
            cards.forEach(card => card.addEventListener("click", clickedCard))
        }, 1000)

    }
}

function showOperation(cardPosition){
    switch (operation) {
        case "multiply":
            cards[activeCard].innerHTML = gameData[cardPosition[0]].number1 + "•" + gameData[cardPosition[0]].number2
            break
        case "power":
            cards[activeCard].innerHTML = gameData[cardPosition[0]].number + "<sup>2</sup>"
            break
        case "root":
            cards[activeCard].innerHTML = gameData[cardPosition[0]].number
            break
    }
}

function showResult(cardPosition){
    switch (operation) {
        case "multiply":
            cards[activeCard].innerHTML = gameData[cardPosition[0]].result
            break
        case "power":
            cards[activeCard].innerHTML = gameData[cardPosition[0]].result
            break
        case "root":
            cards[activeCard].innerHTML = "&radic;"+ gameData[cardPosition[0]].result
            break
    }
}

function init() {
    cards.forEach( card => {
        if (card.classList.contains("element--showed")){
            card.classList.remove("element--showed");
        }
        if (card.classList.contains("element--guessed")){
            card.classList.remove("element--guessed");
        }
        card.innerHTML = "";
    })
    pairsFound = 0;
    movesAmount = 0;
    gameData = prepareDataArray(cardsAmount, operation)
    cards.forEach(card => card.addEventListener("click", clickedCard))
    console.log(gameData)
}

init()

