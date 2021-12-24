import React from 'react';
import s from './AnswerItem.module.css';

const AnswerItem = props => {
  // console.log(props);
  const cls = [s.AnswerItem];
  if (props.state) {
    //храниться значение либо 'success' or 'error'
    cls.push(s[props.state]);
  }
  return (
    <li
      className={cls.join(' ')} //выводим массив с классами соответственно стилизированными приобразовав его в строку через пробел
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}{' '}
    </li>
  );
};

export default AnswerItem;
