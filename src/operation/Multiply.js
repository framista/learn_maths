export default class Multiply {
    constructor(numbers, variablePosition, resultPosition) {
        this.number1 = numbers[0];
        this.number2 = numbers[1];
        this.result = this.number1 * this.number2;
        this.variablePosition = variablePosition
        this.resultPosition = resultPosition
    }
}
