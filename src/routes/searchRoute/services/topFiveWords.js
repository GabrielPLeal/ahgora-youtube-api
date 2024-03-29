const cleanWord = (word) => {
    let cleanedWord = word.normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").replace(/[0-9]/g, '')
    return cleanedWord.toLowerCase()
}

const hasThatKey = (wordsCount, word) => {
    return wordsCount.hasOwnProperty(word)
}

const setWordsCount = (wordsCount, cleanedWord) => {
    if (hasThatKey(wordsCount, cleanedWord)) {
        wordsCount[cleanedWord] += 1
    } else {
        wordsCount[cleanedWord] = 1
    }
}

const isUnecesaryWord = (cleanedWord) => {
    const unecesaryWords = [
        "contra", "desde", "entre", "para", "perante", "sobre"
    ]
    return unecesaryWords.includes(cleanedWord)
}

const hasSetWordsCount = (cleanedWord) => {
    return cleanedWord.length > 4 && !isUnecesaryWord(cleanedWord)
}

const countWords = (phrasesList, wordsCount) => {
    phrasesList.forEach(phrases => {
        const splitedPhrases = phrases.split(" ")
        splitedPhrases.forEach((word) => {
            const cleanedWord = cleanWord(word)
            if (hasSetWordsCount(cleanedWord)) {
                setWordsCount(wordsCount, cleanedWord)
            }
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

const getFiveMostUsedWords = (videosData) => {
    const titles = videosData.map(videoData => videoData.title)
    const descriptions = videosData.map(videoData => videoData.description)

    let wordsCount = {}

    countWords(titles, wordsCount)
    countWords(descriptions, wordsCount)

    return separeFiveMostUsedWords(wordsCount)
}

module.exports = {
    cleanWord,
    hasThatKey,
    isUnecesaryWord,
    hasSetWordsCount,
    setWordsCount,
    countWords,
    convertEntrieArrayInObject,
    separeFiveMostUsedWords,
    getFiveMostUsedWords
}