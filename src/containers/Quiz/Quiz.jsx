import React, { Component } from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswer: 2,
        answers: [
          { text: 'Черный', id: 1 },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Зелёный', id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = answerId => {
    console.log('answerId', answerId);
  };
  render() {
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
