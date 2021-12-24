import React from 'react';
import s from './Backdrop.module.css';

const Backdrop = props => {
  return <div className={s.Backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
