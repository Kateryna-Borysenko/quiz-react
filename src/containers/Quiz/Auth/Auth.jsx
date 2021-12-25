import React, { Component } from 'react';
import s from './Auth.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';
import is from 'is_js';

//если использовать regex
// const validateEmail = email => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };

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
  validateControl(value, validation) {
    //обозначает что если не передали параметры валидации то валидировать control нам не нужно
    if (!validation) {
      return true;
    }
    //если validation есть
    let isValid = true;
    //если поле не пустое и до этого isValid не было false (в нашем случае можно не писать, но для универсальности ф-ции)
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    //is js библиотека которая проверяет на валидацию email или мужно использовать регулярное выражение
    if (validation.email) {
      isValid = is.email(value) && isValid;

      //2й вариант с regex
      // isValid = validateEmail(value) && isValid;
    }
    //если строка больше или равна укажаному символу
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    console.log(`${controlName}: `, e.target.value);
    //чтобы не мутировать объект создаём копию
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] }; //либо email либо password со всеми полями
    //дальше просто переопределяем безопасно без мутации поля
    control.value = e.target.value; //считываем значение введенное в инпут
    control.touched = true; //как только пользователь что-то ввел значение становиться true
    control.valid = this.validateControl(control.value, control.validation); //новое значение введенное и объект валидации код 18 32
    formControls[controlName] = control;
    this.setState({ formControls });
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
