import React from "react";
import "./index.css";

class Word extends React.Component {
  render() {
    return (
      <div className="flex flex-row justify-center items-center ph2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            className={
              `${this.props.result[index]} pa1 ma1 br2 flex justify-center items-center` +
              (this.props.onClick && this.props.guess[index] ? " pointer" : "")
            }
            style={{ width: "80px", height: "80px" }}
            onClick={
              this.props.onClick && this.props.guess[index]
                ? () => {
                    this.props.onClick(index);
                  }
                : undefined
            }
          >
            <h1 className="white tc ma0 pa0">
              {this.props.guess[index]
                ? this.props.guess[index].toUpperCase()
                : " "}
            </h1>
          </div>
        ))}
      </div>
    );
  }
}

export default Word;
