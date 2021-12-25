import React, { Component } from 'react';
import s from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

export class QuizList extends Component {
  renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>Тест {quiz}</NavLink>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={s.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
