import React from 'react';
import s from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
  return (
    <div className={s.FinishedQuiz}>
      {/* список всех ответов */}
      <ul>
        <li>
          <strong>1. </strong>
          How are you
          {/* иконка */}
          <i className={'fa fa-times ' + s.error} />
        </li>
        <li>
          <strong>2. </strong>
          How are you
          {/* иконка */}
          <i className={'fa fa-check ' + s.success} />
        </li>
      </ul>
      {/* сколько всего правильных ответов */}
      <p>Правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
