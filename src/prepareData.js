import operations from './operation'

export function prepareDataArray(cardsAmount, operation) {
    const data = []
    let positions = []
    for (let i = 0; i < cardsAmount / 2; i++) {

        positions = randomPosition(positions, cardsAmount)
        let variablePosition = positions[positions.length - 1]
        positions = randomPosition(positions, cardsAmount)
        let resultPosition = positions[positions.length - 1]

        switch (operation){
            case 'multiply':
                let numbers = randomNumbers(data);
                data.push(new operations.Multiply(numbers, variablePosition, resultPosition));
                break
            case 'power':
                let numberPower = randomOneNumber(data);
                data.push(new operations.Power(numberPower, variablePosition, resultPosition));
                break
            case 'root':
                let numberRoot = randomOneNumber(data)
                data.push(new operations.Root(numberRoot, variablePosition, resultPosition));
                break
        }
    }
    return data;
}

function randomNumbers(data) {
    while (true) {
        let number1 = Math.floor(Math.random() * 8) + 2;
        let number2 = Math.floor(Math.random() * 8) + 2;
        let result = number1 * number2;
        if (data.findIndex(d => d.result === result) == -1) {
            return [number1, number2];
        }
    }
}

function randomOneNumber(data){
    while(true){
        let number = Math.floor(Math.random() * 15) + 2;
        if (data.findIndex(d => d.result === number*number) == -1){
            return number;
        }
    }
}

function randomPosition(positions, cardsAmount) {
    while (true) {
        let position = Math.floor(Math.random() * cardsAmount)
        if (!positions.includes(position)) {
            positions.push(position)
            return positions
        }
    }
}

