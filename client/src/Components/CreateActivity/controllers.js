export const arrayNonRepeat = (arr) => {
    let arrayNoRepeat = []
    let arrayNoRepeatSet = new Set (arr)
    arrayNoRepeatSet.forEach(code => arrayNoRepeat.push(code))
    return arrayNoRepeat

} 