const add = function (a, b) {
  return a + b;
}

const subtract = function (a, b) {
  return a - b;
}

const multiply = function (a, b) {
  return a * b;
}

const divide = function (a, b) {
  return a / b;
}

let numA, operator, numB;

const operate = function (numA, operator, numB) {
  switch (operator) {
    case operator === '+':
      return add(numA, numB);
    case operator === '-':
      return subtract(numA, numB);
    case operator === '*':
      return multiply(numA, numB);
    case operator === '/':
      return divide(numA, numB);
  }
}