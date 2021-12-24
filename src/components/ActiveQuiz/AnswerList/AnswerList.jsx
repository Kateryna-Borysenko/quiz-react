import React from 'react';
import s from './AnswerList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
  <ul className={s.AnswersList}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          //если есть props.state (по умолчанию он null)
          state={props.state ? props.state[answer.id] : null}
        />
      );
    })}
  </ul>
);

export default AnswersList;
