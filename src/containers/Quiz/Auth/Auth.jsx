import React, { Component } from 'react';
import s from './Auth.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';

export class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        //по умалчанию у нас не валидный инпут, но показывать ошибку будем только, если пользователь затронит это input поэтому добавим еще одно свойство touched
        touched: false,
        //правило по которому нужно валидировать данный контрол
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        //по умалчанию у нас не валидный инпут, но показывать ошибку будем только, если пользователь затронит это input поэтому добавим еще одно свойство touched
        touched: false,
        //правило по которому нужно валидировать данный контрол
        validation: {
          required: true,
          minLength: 6, // тк в качестве backend будет использоваться firebase он требует не меньше 6 символов в пароле
        },
      },
    },
  };
  loginHadler = () => {};

  registerHadler = () => {};

  submitHandler = e => {
    e.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, event.target.value);
  };

  renderInput = () => {
    //в данном случае у нас или email или password
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation} // приведет к boolian или можно просто записать true or false
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
          //получаем с map -> чтобы понять кокой именна инпут-control мы сейчас педактируем
        />
      );
    });
  };
  render() {
    return (
      <div className={s.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={s.AuthForm} onSubmit={this.submitHandler}>
            {/* ф-ция которая будет рендерить инпуты */}
            {this.renderInput()}
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
