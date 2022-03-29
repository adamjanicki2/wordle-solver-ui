import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="flex flex-column items-center justify-center w-100 pa1 mt1 bt b--moon-gray">
        <div className="flex ma0 pa0 items-center">
          <a
            href="http://adamjanicki2.github.io/wordle-solver-ui"
            target="_blank"
            rel="noreferrer"
            className="dim mr1"
            style={{ color: "black" }}
          >
            Wordle Solver
          </a>{" "}
          Est. 2022 Built from scratch by Adam and Noah
        </div>
      </div>
    );
  }
}

export default Footer;
