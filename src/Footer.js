import React, { Component } from "react";

const LOGO_SIZE = "16px";

class Footer extends Component {
  render() {
    return (
      <div className="bg-lightest-blue flex flex-column items-center justify-center w-100 pa4 mt2">
        <div className="flex pb1 items-center">
          © 2022 Absolute Legends{" "}
          <a
            href="https://www.adamovies.com/"
            target="_blank"
            rel="noreferrer"
            className="no-underline dim mh1 flex items-center"
            style={{ color: "black" }}
          >
            <img
              src="/adamovies.svg"
              className="mr1"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />{" "}
            Adam
          </a>{" "}
          and Noah
        </div>
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noreferrer"
          className="dim pt1"
          style={{ color: "black" }}
        >
          Play Wordle
        </a>
      </div>
    );
  }
}

export default Footer;
