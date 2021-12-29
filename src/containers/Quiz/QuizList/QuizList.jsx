import React, { Component } from 'react';
import s from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/ActiveQuiz/UI/Loader/Loader';

export default class QuizList extends Component {
  state = {
    quizzes: [],
    loading: true, //при загрузке зарускаем лоудер
  };

  renderQuizes() {
    return this.state.quizzes.map(quiz => {
      return (
        //key={quiz.id} определили в строке 35
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }
  //делаем get запрос на базу данных firebase от google
  //99% случаев перед обращением к backend на потребуется componentDidMount()
  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://react-quiz-d260e-default-rtdb.firebaseio.com/quizzes.json',
      );

      const quizzes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });

      this.setState({
        quizzes,
        loading: false, //загрузка завершина отключаем лоудер
      });
    } catch (e) {
      console.log(e); //e -> error
    }
  }

  render() {
    return (
      <div className={s.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
