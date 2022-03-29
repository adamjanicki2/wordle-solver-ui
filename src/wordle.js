import { DEFAULT_STARTING_WORD, WORDS } from "./util";

export class Puzzle {
  constructor(
    startingWord = DEFAULT_STARTING_WORD,
    currentGuess = 1,
    words = [...WORDS],
    validLetters = new Set()
  ) {
    this.startingWord = startingWord;
    this.currentGuess = currentGuess;
    this.words = words;
    this.validLetters = validLetters;
  }

  #computeWordScore = (word, letterFreq, letterIndexFreq) => {
    let score = 0;
    const letterSet = new Set();
    for (let index = 0; index < 5; index++) {
      const letter = word[index];
      letterSet.add(letter);
      score +=
        (letterIndexFreq[index].get(letter) || 0) *
        (letterFreq.get(letter) || 0);
    }
    return score * (letterSet.size / 5.0);
  };

  recommendGuess = () => {
    if (this.currentGuess === 1) return this.startingWord;
    const letterFreq = new Map();
    const letterIndexFreq = [
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
    ];
    for (const word of this.words) {
      for (let index = 0; index < 5; ++index) {
        const letter = word[index];
        const curFreq = letterFreq.get(letter) || 0;
        letterFreq.set(letter, curFreq + 1);
        const curIndexFreq = letterIndexFreq[index].get(letter) || 0;
        letterIndexFreq[index].set(letter, curIndexFreq + 1);
      }
    }
    let bestWord = null;
    let bestScore = Number.NEGATIVE_INFINITY;
    for (const word of this.words) {
      const score = this.#computeWordScore(word, letterFreq, letterIndexFreq);
      if (score > bestScore) {
        bestScore = score;
        bestWord = word;
      }
    }
    return bestWord;
  };

  #filterWords = (guess, result) => {
    const badGuesses = new Set();
    for (let i = 0; i < result.length; ++i) {
      const color = result[i];
      const charGuessed = guess[i];
      if (color === "green") {
        this.validLetters.add(charGuessed);
        this.words = this.words.filter((word) => word[i] === charGuessed);
      }
      if (color === "yellow") {
        this.validLetters.add(charGuessed);
        this.words = this.words.filter(
          (word) => word.includes(charGuessed) && word[i] !== charGuessed
        );
      }
      if (color === "black") badGuesses.add(charGuessed);
    }
    for (const guess of badGuesses) {
      if (!this.validLetters.has(guess))
        this.words = this.words.filter((word) => !word.includes(guess));
    }
  };

  guessWord = (guess, result) => {
    this.#filterWords(guess, result);
    this.currentGuess++;
  };

  copy = () => {
    const words = [...this.words];
    const validLetters = new Set([...this.validLetters]);
    return new Puzzle(
      this.startingWord,
      this.currentGuess,
      words,
      validLetters
    );
  };

  static isValidWord(word) {
    return WORDS.includes(word.toLowerCase());
  }
}
