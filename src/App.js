import React from "react";
import "./index.css";
import { Puzzle } from "./wordle";
import Word from "./Word";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NUMBER_TO_EMOJI } from "./util";
import Footer from "./Footer";

const COLOR_ARRAY = ["black", "yellow", "green"];

class App extends React.Component {
  constructor(props) {
    super(props);
    const puzzle = new Puzzle();
    const guesses = [puzzle.recommendGuess()];
    this.state = {
      puzzle,
      guesses,
      colors: [["black", "black", "black", "black", "black"]],
    };
  }

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
      <div className="flex flex-column items-center w-100">
        <h1 className="bg-lightest-blue tc ma0 pa3 mb2 f1 fw6 w-100">
          Wordle Solver
        </h1>
        {this.state.guesses.slice(0, -1).map((guess, index) => (
          <Word result={this.state.colors[index]} guess={guess} />
        ))}
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
                  onClick={this.submitGuess}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        {!this.state.puzzle.recommendGuess() && !this.hasWon() && (
          <div className="tc f3 fw3 pa2">No Valid Guesses!</div>
        )}
        {this.hasWon() && (
          <div className="tc f3 fw3 pa2">
            You won! Guesses:{" "}
            {NUMBER_TO_EMOJI[this.state.puzzle.currentGuess - 1]}
          </div>
        )}
        {!this.hasWon() && this.state.puzzle.currentGuess >= 7 && (
          <div className="tc f3 fw3 pa2">No Valid Guesses 😩</div>
        )}
        <Button
          variant="text"
          style={{
            textTransform: "none",
            fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
          }}
          onClick={() => {
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
