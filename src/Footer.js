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
            className="no-underline underline-hover dim mr1"
            style={{ color: "black" }}
          >
            Wordle Solver
          </a>{" "}
          © 2022 Absolute Legends Adam and Noah
        </div>
      </div>
    );
  }
}

export default Footer;
