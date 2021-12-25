import React from 'react';
import Button from '../UI/Button/Button';
import s from './FinishedQuiz.module.css';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
  //подсчет правильных ответов
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={s.FinishedQuiz}>
      {/* список всех ответов */}
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            s[props.results[quizItem.id]],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp; {quizItem.question}
              {/* иконка */}
              <i className={cls.join(' ')} />
            </li>
          );
        })}
      </ul>
      {/* сколько всего правильных ответов */}
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to={'/'}>
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
