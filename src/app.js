const cardsAmount = 36;
const cards = [...document.getElementsByClassName("element")];
const startTime = new Date().getDate();

let activeCard;
const activeCards = [];
let pairsFound = 0;
let cardPosition

function prepareDataMultiplyArray() {
    const data = []
    let positions = []
    for (let i = 0; i < cardsAmount / 2; i++) {
        let number1 = Math.floor(Math.random() * 10) + 1;
        let number2 = Math.floor(Math.random() * 10) + 1;
        positions = randomPosition(positions)
        let variablePosition = positions[positions.length - 1]
        positions = randomPosition(positions)
        let resultPosition = positions[positions.length - 1]
        data.push(new Multiply(number1, number2, variablePosition, resultPosition));
    }
    return data;
}

function randomPosition(positions) {
    while (true) {
        position = Math.floor(Math.random() * cardsAmount)
        if (!positions.includes(position)) {
            positions.push(position)
            return positions
        }
    }
}

function setPosition(data, firstPosition) {
    let index = data.findIndex(d => d.variablePosition === firstPosition)
    if (index === -1) {
        index = data.findIndex(d => d.resultPosition === firstPosition)
        return [index, data[index].variablePosition]
    }
    return [index, data[index].resultPosition]

}

class Multiply {
    constructor(number1, number2, variablePosition, resultPosition) {
        this.number1 = number1;
        this.number2 = number2;
        this.result = number1 * number2;
        this.variablePosition = variablePosition
        this.resultPosition = resultPosition
    }
}

function clickedCard() {
    activeCard = parseInt(this.id)

    if (activeCard === activeCards[0]) return
    if (this.classList.contains("element--guessed")) return
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        cardPosition = setPosition(gameData, activeCard)
        cards[activeCard].innerHTML = gameData[cardPosition[0]].number1 + "•" + gameData[cardPosition[0]].number2
        cards[activeCard].classList.add("element--showed")
        return
    } else {
        cards.forEach(card => card.removeEventListener("click", clickedCard))
        cards[activeCard].classList.add("element--showed")
        let indexSecond = setPosition(gameData, activeCard)[0]
        cards[activeCard].innerHTML = gameData[indexSecond].result
        activeCards[1] = activeCard
        setTimeout(() => {
            if (activeCard === cardPosition[1]) {
                activeCards.forEach(e => cards[e].classList.add("element--guessed"))
                pairsFound++;
                if (pairsFound === cardsAmount / 2) {
                    console.log("WYGRANA")
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    location.reload()
                }
            } else {
                activeCards.forEach(e => {
                    cards[e].innerHTML = ""
                    cards[e].classList.remove("element--showed")
                })
            }
            activeCard = ""
            activeCards.length = 0
            cards.forEach(card => card.addEventListener("click", clickedCard))
        }, 1000)

    }
}

function init() {
    cards.forEach(card => card.addEventListener("click", clickedCard))
}

const gameData = prepareDataMultiplyArray()
console.log(gameData)
init()
