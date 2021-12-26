export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation, //отрицание от объекта validation (если мы передали какое-то правило валидации, то начальное valid бужет равно false) тк есть определённый набор правил и изначальное состояние его не валидное
    touched: false,
    value: '',
  };
}
