const { mockVideosData } = require('../../../mock/mockData')
const {
    cleanWord,
    hasThatKey,
    isUnecesaryWord,
    hasSetWordsCount,
    setWordsCount,
    countWords,
    convertEntrieArrayInObject,
    separeFiveMostUsedWords,
    getFiveMostUsedWords
} = require('../../../../routes/searchRoute/services/topFiveWords')

describe('Test Clean Word Function', () => {
    it('Pass a correct word should return it', () => {
        const cleanedWord = cleanWord("correct")
        expect(cleanedWord).toBe("correct")
    })
    it('Pass a word with numbers should return the word without numbers', () => {
        const cleanedWord = cleanWord("corr99ect")
        expect(cleanedWord).toBe("correct")
    })
    it('Pass a word with special chars should return the word without special chars', () => {
        const cleanedWord = cleanWord("corr-.?éct")
        expect(cleanedWord).toBe("correct")
    })
    it('Pass an upper case word chars should return the word without special chars', () => {
        const cleanedWord = cleanWord("CORRECT")
        expect(cleanedWord).toBe("correct")
    })
})

describe('Test Has That Key Function', () => {
    it('Pass a key declared in object should return true', () => {
        const object = { listed: "" }
        const key = "listed"
        expect(hasThatKey(object, key)).toBeTruthy()
    })
    it('Pass a key not declared in object should return false', () => {
        const object = {}
        const key = "notListed"
        expect(hasThatKey(object, key)).toBeFalsy()
    })

})

describe('Test Set Words Count Function', () => {
    it('Pass a word key declared in object should sum 1 more to value for that key', () => {
        const object = { listed: 1 }
        const wordKey = "listed"
        setWordsCount(object, wordKey)
        expect(object[wordKey]).toBe(2)
    })
    it('Pass a word key not declared in object should define 1 to value for that key', () => {
        const object = {}
        const wordKey = "notListed"
        setWordsCount(object, wordKey)
        expect(object[wordKey]).toBe(1)
    })

})

describe('Test Is Unecessary Word Function', () => {
    it('Pass a unecessary word should return true', () => {
        const unecesaryWord = 'contra'
        expect(isUnecesaryWord(unecesaryWord)).toBeTruthy()
    })
    it('Pass a word should return false', () => {
        const word = 'valida'
        expect(isUnecesaryWord(word)).toBeFalsy()
    })

})

describe('Test Has Set Words Count Function', () => {
    it('Pass a valid word should return true', () => {
        const validWord = 'valida'
        expect(hasSetWordsCount(validWord)).toBeTruthy()
    })
    it('Pass a invalid word should return false', () => {
        const invalidWord = 'por'
        expect(hasSetWordsCount(invalidWord)).toBeFalsy()
    })

})

describe('Test Count Words Function', () => {
    it('Pass a phrases list with one phrase with just one word should set in words count that word with value 1', () => {
        const phrase = 'string'
        const phrasesList = [
            phrase
        ]
        const wordsCount = {}
        countWords(phrasesList, wordsCount)
        expect(wordsCount[phrase]).toBe(1)
    })
    it('Pass a phrases list with one phrase with two different words should set in words count  those two words both with value 1', () => {
        const firstWord = 'string'
        const secondWord = 'other'
        const phrase = `${firstWord} ${secondWord}`
        const phrasesList = [
            phrase
        ]
        const wordsCount = {}
        countWords(phrasesList, wordsCount)
        expect(wordsCount[firstWord]).toBe(1)
        expect(wordsCount[secondWord]).toBe(1)
    })
    it('Pass a phrases list with two phrase with the same word in both should set in words count that word with value 2', () => {
        const phrase = 'string'
        const phrasesList = [
            phrase,
            phrase
        ]
        const wordsCount = {}
        countWords(phrasesList, wordsCount)
        expect(wordsCount[phrase]).toBe(2)
    })

})

describe('Test Convert Array In Object Function', () => {
    it('Pass an entrie array should return a object that key is index and value is other object with entrie key and value', () => {
        const entrieKey = 'key'
        const entrieValue = 'value'
        const entrieArray = [
            [entrieKey, entrieValue]
        ]
        const index = 0
        const object = convertEntrieArrayInObject(entrieArray)
        expect(object[index][entrieKey]).toBe(entrieValue)
    })
})

describe('Test Separe Five Most Used Words Function', () => {
    it('Pass an object with words and yours count should return top five words', () => {
        const wordsCount = {
            first: 7,
            second: 1,
            third: 3,
            fourth: 8,
            fifth: 2,
            sixth: 5,
            seventh: 9
        }
        fiveMostUsedWords = separeFiveMostUsedWords(wordsCount)
        expect(Object.keys(fiveMostUsedWords).length).toBe(5)
    })

})

describe('Test Get Five Most Used Words Function', () => {
    it('Pass youtube api response (mocked) should return five most used words in titles and descriptions', () => {
        const videosData = mockVideosData(10)
        const fiveMostUsedWords = getFiveMostUsedWords(videosData)
        expect(Object.keys(fiveMostUsedWords)).toHaveLength(5)
    })
})