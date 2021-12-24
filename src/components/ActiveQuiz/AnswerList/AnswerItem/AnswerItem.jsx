import React from 'react';
import s from './AnswerItem.module.css';

const AnswerItem = props => {
  // console.log(props);
  return (
    <li
      className={s.AnswerItem}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}{' '}
    </li>
  );
};

export default AnswerItem;
