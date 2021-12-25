import React, { Component } from 'react';
import s from './Auth.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';

export class Auth extends Component {
  loginHadler = () => {};

  registerHadler = () => {};

  submitHandler = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className={s.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={s.AuthForm} onSubmit={this.submitHandler}>
            <Input label="Email" />
            <Input label="Пароль" errorMessage={'TEST'} />
            <Button type="success" onClick={this.loginHadler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHadler}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
