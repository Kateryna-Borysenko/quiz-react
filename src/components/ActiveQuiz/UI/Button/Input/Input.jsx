import React from 'react';
import s from './Input.module.css';

//ф-ция которая проверяет есть ли ошибка в input
//не нужны все параметры props по-этому делаем диструктуризацию только необходимых для проверки
const isInvalid = ({ valid, touched, shouldValidate }) => {
  //если не валидный контрол и если мы должны его валидировать и если мы его 'потроголи' -> то он уже НЕ валидный
  return !valid && shouldValidate && touched;
};

const Input = props => {
  const inputType = props.type || 'text'; //если тип инпута не пердали то будем указывать тип будет 'text'
  const cls = [s.Input];
  //генерируем уникальную строку
  const htmlFor = `${inputType}-${Math.random()}`;

  //проверка добавит стили если данные в input введены не корректно
  if (isInvalid(props)) {
    cls.push(s.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        //универсальный компонент
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {/* чтобы показать ошибку если она есть */}
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
