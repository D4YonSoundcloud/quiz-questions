import React, { Component } from "react";
import questions from "./questions.json";
import QuizQuestions from "./components/QuizQuestions";
import "./App.css";

const TITLE_STATE = 0;
const QUESTION_STATE = 1;
const TIME_LIMIT = 30;

class TitlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Welcome to the quiz!",
      currentState: TITLE_STATE,
      counter: 0,
      currentQuestion: 0,
      score: 0
    };
    this.counter = 0;
    this.timeLimit = TIME_LIMIT;
  }

  nextQuestion = correct => {
    clearInterval(this.timer);
    console.log(correct);
    if (this.state.currentQuestion === questions.length - 1) {
      console.log("done");
    } else {
      correct
        ? this.setState({
            titleText: "You're Correct!",
            counter: 0,
            currentQuestion: this.state.currentQuestion + 1,
            currentState: QUESTION_STATE
          })
        : this.setState({
            titleText: "Sorry! thats the wrong answer!",
            currentState: QUESTION_STATE,
            counter: 0,
            currentQuestion: this.state.currentQuestion
          });
    }


    console.log(this.state.currentState)
    //if question input given back is true then add 1 to counter
    //reset interval
  };

  start() {
    console.log("starting!");
    this.setState({ counter: 0 });
    this.setState({ currentState: QUESTION_STATE });
    this.timer = setInterval(() => {
      console.log("intercal called!");
      this.setState({ counter: this.state.counter + 1 });
      if (this.state.counter < this.timeLimit) {
        this.setState({ titleText: "Begin the quiz!" + this.state.counter });
      } else {
        this.setState({ titleText: "Times up!" });
        clearInterval(this.timer);
      }
    }, 1000);
  }

  render(props) {
    console.log("render called");
    console.log(questions[this.state.currentQuestion].possibleAnswers.correct);
    return (
      <div className="App">
        <div>{this.timeLimit - this.state.counter}</div>
        {this.state.currentState === QUESTION_STATE ? (
          <QuizQuestions
            question={questions[this.state.currentQuestion].question}
            answers={questions[this.state.currentQuestion].possibleAnswers}
            nextQuestion={this.nextQuestion}
          ></QuizQuestions>
        ) : (
          <h1 className="title">{this.state.titleText}</h1>
        )}
        <input
          type="button"
          id="startButton"
          value="start"
          onClick={() => this.start()}
        />
      </div>
    );
  }
}

function App() {
  return <TitlePage></TitlePage>;
}

export default App;
