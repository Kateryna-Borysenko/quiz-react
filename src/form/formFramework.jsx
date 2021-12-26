export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation, //отрицание от объекта validation (если мы передали какое-то правило валидации, то начальное valid бужет равно false) тк есть определённый набор правил и изначальное состояние его не валидное
    touched: false,
    value: '',
  };
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  Object.keys(formControls).forEach(formName => {
    isFormValid = formControls[formName].valid && isFormValid;
  });

  //второй способ проверки валидации
  // for (let control in formControls) {
  //   if (formControls.hasOwnProperty(control)) {
  //     isFormValid = formControls[control].valid && isFormValid;
  //   }
  // }

  return isFormValid;
}
