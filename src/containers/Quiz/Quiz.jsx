import React, { Component } from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
  state = {
    // isFinished: false, //по умолчанию наш отросник не закончен
    isFinished: true,
    activeQuestion: 0,
    answerState: null, //будет храниться инфо о текущем клике пользователя (либо правильный ответ, либо нет){ [id]: 'success'} или {[id]: 'error' }
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
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
        rightAnswerId: 1,
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
    // console.log('answerId', answerId);

    // проверка которая не даст повторно кликнуть по варианту ответа
    if (this.state.answerState) {
      //ecли сдесь уже есть правельный ответ, то мы не должны выполнять эту ф-цию
      const key = Object.keys(this.state.answerState)[0]; //получаем состояние -> 0 - потому, что мы знаем , что там будет одно значение

      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    //получаем вопрос из массива вопросов
    const question = this.state.quiz[this.state.activeQuestion];
    //проверка правильности ответа

    //переключение не сразу на сл. вопрос, а через 1,5 сек, если ответ верный
    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' },
      });
      const timeout = window.setTimeout(() => {
        //если закончились вопросы
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null, //обнуляем подсветку ответа success or error
          });
        }
        window.clearTimeout(timeout); //чтобы не было утечки памяти
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: 'error' },
      });
    }
  };

  isQuizFinished = () => {
    //если номер вопроса равен длинне массива вопросов
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };
  render() {
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers} //показывает номер вопроса
              question={this.state.quiz[this.state.activeQuestion].question} //показывает номер вопроса
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1} //отображение для пользователя(индекс вопроса начинается с 0) делаем +1
              state={this.state.answerState} //отображаем на каждом элементе правильный ответ или нет
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
