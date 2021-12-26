import React, { Component } from 'react';
import s from './QuizCreator.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';

export class QuizCreator extends Component {
  onSubmitHandler = e => {
    e.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  render() {
    return (
      <div className={s.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.onSubmitHandler}>
            <input type="text" />
            <hr />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <select name="" id=""></select>
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
