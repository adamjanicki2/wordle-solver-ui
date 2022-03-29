/* global chrome */
import React from "react";
import "./index.css";
import { Puzzle } from "./wordle";
import Word from "./Word";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DEFAULT_STARTING_WORD, NUMBER_TO_EMOJI } from "./util";
import Footer from "./Footer";

const COLOR_ARRAY = ["black", "yellow", "green"];

class App extends React.Component {
  constructor(props) {
    super(props);
    const puzzle = new Puzzle();
    const guesses = [puzzle.recommendGuess()];
    const colors = [["black", "black", "black", "black", "black"]];
    this.state = {
      puzzle,
      guesses,
      colors,
    };
  }

  // componentDidMount = () => {
  //   chrome.storage.local.get("savedData", function (savedData) {
  //     if (savedData.savedData) {
  //       chrome.storage.local.get("data", function (data) {
  //         data = JSON.parse(data.data);
  //         data.puzzle = JSON.parse(data.puzzle);
  //         data.puzzle.words = JSON.parse(data.puzzle.words);
  //         data.puzzle.validLetters = JSON.parse(data.puzzle.validLetters);
  //         data.guesses = JSON.parse(data.guesses);
  //         data.colors = JSON.parse(data.colors);
  //         console.log(data);
  //         const puzzle = new Puzzle(
  //           DEFAULT_STARTING_WORD,
  //           data.puzzle.currentGuess,
  //           data.puzzle.words,
  //           new Set(...data.puzzle.validLetters)
  //         );
  //         const colors = data.colors;
  //         const guesses = data.guesses;
  //       });
  //     }
  //   });
  // };

  saveData = () => {
    console.log("SET DATA");
    chrome.storage.local.set({
      savedData: true,
      data: JSON.stringify({
        colors: this.state.colors,
        guesses: this.state.guesses,
        puzzle: {
          startingWord: this.state.puzzle.startingWord,
          currentGuess: this.state.puzzle.currentGuess,
          words: this.state.puzzle.words,
          validLetters: [...this.state.puzzle.validLetters],
        },
      }),
    });
  };

  clearData = () => {
    console.log("CLEAR DATA");
    chrome.storage.local.set({
      savedData: false,
    });
  };

  hasWon = () => {
    if (this.state.colors.length <= 1) return false;
    for (const color of this.state.colors[this.state.colors.length - 2]) {
      if (color !== "green") return false;
    }
    return true;
  };

  shiftColor = (index) => {
    const currentIdx = COLOR_ARRAY.indexOf(
      this.state.colors[this.state.colors.length - 1][index]
    );
    const currentColors = this.state.colors;
    currentColors[this.state.colors.length - 1][index] =
      COLOR_ARRAY[(currentIdx + 1) % 3];
    return this.setState({ colors: currentColors });
  };

  submitGuess = () => {
    const currentGuess = this.state.guesses[this.state.guesses.length - 1];
    if (!Puzzle.isValidWord(currentGuess)) {
      window.alert(`'${currentGuess.toUpperCase()}' is an invalid guess!`);
    }
    const currentColors = this.state.colors;
    const colors = [...currentColors[currentColors.length - 1]];
    this.state.puzzle.guessWord(currentGuess, colors);
    currentColors.push([
      ...colors.map((color) => (color === "green" ? "green" : "black")),
    ]);
    const currentGuesses = this.state.guesses;
    currentGuesses.push(this.state.puzzle.recommendGuess());
    this.setState({ guesses: currentGuesses, colors: currentColors });
  };

  render() {
    return (
      <div className="flex flex-column items-center w-100 pa2">
        {this.state.puzzle.recommendGuess() &&
          !this.hasWon() &&
          this.state.puzzle.currentGuess < 7 && (
            <>
              <div className="tc f3 fw3 pa2">
                Recommended Guess:{" "}
                <span className="bg-light-gray br2 pa1">
                  {this.state.puzzle.recommendGuess().toUpperCase()}
                </span>
              </div>
              <Word
                result={this.state.colors[this.state.colors.length - 1]}
                guess={this.state.guesses[this.state.guesses.length - 1]}
                onClick={this.shiftColor}
              />
              <div className="flex flex-row justify-center items-center pa2">
                <div className="tc f3 fw3 pa2 ma0">Your Guess:</div>
                <TextField
                  variant="outlined"
                  inputProps={{ maxLength: 5, className: "pa3" }}
                  value={this.state.guesses[this.state.guesses.length - 1]}
                  onChange={(event) => {
                    const currentGuesses = this.state.guesses;
                    currentGuesses[currentGuesses.length - 1] =
                      event.target.value;
                    this.setState({ guesses: currentGuesses });
                  }}
                />
                <Button
                  variant="text"
                  style={{
                    textTransform: "none",
                    fontFamily: [
                      "-apple-system",
                      "BlinkMacSystemFont",
                      '"Segoe UI"',
                    ],
                  }}
                  onClick={() => {
                    this.saveData();
                    this.submitGuess();
                  }}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        {!this.state.puzzle.recommendGuess() && !this.hasWon() && (
          <>
            <div className="tc f3 fw3 pa2">No Valid Guesses 😩</div>
            <Word
              result={this.state.colors[this.state.colors.length - 2]}
              guess={this.state.guesses[this.state.guesses.length - 2]}
            />
          </>
        )}
        {this.hasWon() && (
          <>
            <div className="tc f3 fw3 pa2">
              You won! Guesses:{" "}
              {NUMBER_TO_EMOJI[this.state.puzzle.currentGuess - 1]}
            </div>
            <Word
              result={this.state.colors[this.state.colors.length - 2]}
              guess={this.state.guesses[this.state.guesses.length - 2]}
            />
          </>
        )}
        {!this.hasWon() && this.state.puzzle.currentGuess >= 7 && (
          <>
            <div className="tc f3 fw3 pa2">No Guesses Remaining 😩</div>
            <Word
              result={this.state.colors[this.state.colors.length - 2]}
              guess={this.state.guesses[this.state.guesses.length - 2]}
            />
          </>
        )}
        <Button
          variant="text"
          style={{
            textTransform: "none",
            fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
          }}
          onClick={() => {
            this.clearData();
            window.location.reload(false);
          }}
        >
          Retry
        </Button>
        <Footer />
      </div>
    );
  }
}

export default App;
