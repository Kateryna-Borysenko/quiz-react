import React, { Component } from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    isFinished: false, //по умолчанию наш отросник не закончен
    results: {}, //{ [id]: 'success'} или {[id]: 'error' } для всех вопросов
    activeQuestion: 0,
    answerState: null, //будет храниться инфо о текущем клике пользователя (либо правильный ответ, либо нет){ [id]: 'success'} или {[id]: 'error' }
    quiz: [],
    loading: true,
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

    const results = this.state.results;
    //проверка правильности ответа
    //переключение не сразу на сл. вопрос, а через 1,5 сек, если ответ верный
    if (question.rightAnswerId === answerId) {
      //если с первого раза ответили правильно,должны положить значение  'success'
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results,
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
      //если ответили не правильно и меняем состояние в строке 78
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  };

  isQuizFinished = () => {
    //если номер вопроса равен длинне массива вопросов
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };
  //для повторного прохождения теста обнуляем
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  //при клике в списке тестов можно проверить id
  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizzes/${this.props.match.params.id}.json`,
      );
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
