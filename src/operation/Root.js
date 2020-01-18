export default class Root {
    constructor(number, variablePosition, resultPosition) {
        this.number = number;
        this.result = this.number * this.number;
        this.variablePosition = variablePosition
        this.resultPosition = resultPosition
    }
}
