function fixDate(arr) {
    let reverseArr = arr.split("-")
    reverseArr = reverseArr.reverse()
    reverseArr = reverseArr.join("-")
    return reverseArr
}

module.exports = fixDate