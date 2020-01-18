export function setPosition(data, firstPosition) {
    let index = data.findIndex(d => d.variablePosition === firstPosition)
    if (index === -1) {
        index = data.findIndex(d => d.resultPosition === firstPosition)
        return [index, data[index].variablePosition, 1]
    }
    return [index, data[index].resultPosition, 0]
}

