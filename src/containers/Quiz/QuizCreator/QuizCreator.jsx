import React, { Component } from 'react';
import s from './QuizCreator.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';
import { createControl } from '../../../form/formFramework';
import { validate } from '../../../form/formFramework';
import { validateForm } from '../../../form/formFramework';
import Select from '../../../components/ActiveQuiz/UI/Button/Select/Select';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

//ф-ция которая позволит не дублировать код будет создавать инпуты для варианов ответов // вспомогательная функция (Helper)
const createOptionControl = number => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true },
  );
};
//ф-ция которая обнулит весь state при создании следующего вопроса
const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true },
    ), //ф-ция для создания инпута
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

export class QuizCreator extends Component {
  //собственный небольшой framework для создания формы
  state = {
    quiz: [], //будем хранить все вопросы
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };
  // ------------------------- //
  onSubmitHandler = e => {
    e.preventDefault();
  };

  //при клике по кнопке создать вопрос
  addQuestionHandler = event => {
    event.preventDefault();
    //создаём локальную копию массива quiz
    // или так const quiz = [...this.state.quiz];
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const { question, option1, option2, option3, option4 } =
      this.state.formControls;
    // нужно сформировать объект каждого из вопросов и положить его в массив quiz
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  //при клике на кнопку создать тест
  createQuizHandler = e => {
    e.preventDefault();
    console.log(this.state.quiz);
    // TODO: Server для сохранения данных на backend
  };
  changeHandler = (value, controlName) => {
    //чтобы не мутировать объект создаём копию
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] }; //получаем текущий input с которым question option1 option2 option3 option4 со всеми полями
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;
    this.setState({ formControls, isFormValid: validateForm(formControls) });
  };

  renderControls = () => {
    // получим ключи question option1 option2 option3 option4
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]; //в control попадёт объект получиный по ключу
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation} // даст boolidan
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          {/* рендер по условию (нужно добавить линие только после вопроса */}
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };
  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value });
    // console.log(this.state.rightAnswerId);
  };

  render() {
    const select = (
      <Select
        label="Выберите правилый ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={s.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
              // если форама не валижная то кнопка будет отключина
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
              // кнопка будет выключина до тех пор пока у нас нет вопросов в нашем тесте
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
