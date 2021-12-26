import React, { Component } from 'react';
import s from './QuizCreator.module.css';
import Button from '../../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../../components/ActiveQuiz/UI/Button/Input/Input';
import { createControl } from '../../../form/formFramework';
import Select from '../../../components/ActiveQuiz/UI/Button/Select/Select';

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
    rightAnswerId: 1,
    formControls: createFormControls(),
  };
  // ------------------------- //
  onSubmitHandler = e => {
    e.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  changeHandler = () => {};

  renderControls = (value, controlName) => {
    // получим ключи question option1 option2 option3 option4
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]; //в control попадёт объект получиный по ключу
      return (
        <>
          <Input
            key={controlName + index}
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
        </>
      );
    });
  };
  selectChangeHandler = e => {
    this.setState({ rightAnswerId: Number(e.target.value) });
    console.log(this.state.rightAnswerId);
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
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
