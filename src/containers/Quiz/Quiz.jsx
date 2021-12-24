import React, { Component } from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswer: 2,
        id: 1,
        answers: [
          { text: 'Черный', id: 1 },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Зелёный', id: 4 },
        ],
      },
      {
        question: 'Мой год рождения?',
        rightAnswer: 1,
        id: 2,
        answers: [
          { text: '1983', id: 1 },
          { text: '1993', id: 2 },
          { text: '1989', id: 3 },
          { text: '2000', id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = answerId => {
    console.log('answerId', answerId);
    this.setState({ activeQuestion: this.state.activeQuestion + 1 }); //меняем на сл.вопрос при ответе на вопрос
  };
  render() {
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers} //показывает номер вопроса
            question={this.state.quiz[this.state.activeQuestion].question} //показывает номер вопроса
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1} //отображение для пользователя(индекс вопроса начинается с 0) делаем +1
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
