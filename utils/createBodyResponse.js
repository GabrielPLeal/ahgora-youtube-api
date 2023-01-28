const cleanWord = (word) => {
    let cleanedWord = word.replace(/[^a-zA-Z ]/g, '').replace(/[0-9]/g, '')
    return cleanedWord.toLowerCase()
}

const hasThisKey = (wordsCount, word) => {
    return wordsCount.hasOwnProperty(word)
}

const setWordsCount = (wordsCount, cleanedWord) => {
    if (hasThisKey(wordsCount, cleanedWord)) {
        wordsCount[cleanedWord] += 1
    } else {
        wordsCount[cleanedWord] = 1
    }
}

const countWords = (phrasesList, wordsCount) => {
    phrasesList.forEach(phrases => {
        const splitedPhrases = phrases.split(" ")
        splitedPhrases.forEach((word) => {
            const cleanedWord = cleanWord(word)
            cleanedWord !== "" && setWordsCount(wordsCount, cleanedWord)
        })
    });
}

const convertEntrieArrayInObject = (organizedWordsCount) => {
    const object = new Object()
    organizedWordsCount.forEach(([word, count], index) => {
        object[index] = { [word]: count }
    })
    return object
}

const separeFiveMostUsedWords = (wordsCount) => {
    let organizedWordsCount = Object.entries(wordsCount)
        .sort((a, b) => b[1] - a[1])
    return convertEntrieArrayInObject(organizedWordsCount.slice(0, 5))
}

const getFiveMostUsedWords = (response) => {
    const titles = response.data.items.map(item => item.snippet.title)
    const descriptions = response.data.items.map(item => item.snippet.description)

    let wordsCount = {}

    countWords(titles, wordsCount)
    countWords(descriptions, wordsCount)

    return separeFiveMostUsedWords(wordsCount)
}

const creatBodyResponse = (response) => {
    const fiveWordsMostUsed = getFiveMostUsedWords(response)
    return {
        fiveWordsMostUsed: fiveWordsMostUsed,
    }
}

module.exports = {
    cleanWord,
    hasThisKey,
    setWordsCount,
    countWords,
    convertEntrieArrayInObject,
    separeFiveMostUsedWords,
    getFiveMostUsedWords,
    creatBodyResponse,
}