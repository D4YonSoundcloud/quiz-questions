import React, { Component } from "react";

export class QuizQuestion extends Component {
  render() {
    return (
      <>
        <h2>{this.props.question}</h2>
        {this.props.answers.map(v => {
          return (
            <input
              type="button"
              value={v.text}
              key={v.id}
              className="answerButton"
              onClick={() => this.props.nextQuestion(v.correct)}
            ></input>
          );
        })}
      </>
    );
  }
}
export default QuizQuestion;
