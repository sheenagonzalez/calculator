const add = function addTwoNumbers(a, b) {
  return a + b;
}

const subtract = function subtractTwoNumbers(a, b) {
  return a - b;
}

const multiply = function multiplyTwoNumbers(a, b) {
  return a * b;
}

const divide = function divideTwoNumbers(a, b) {
  return a / b;
}

let numA, operator, numB;

const operate = function operateOnTwoNumbers(numA, operator, numB) {
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

const keyButtons = [...(document.querySelectorAll('.key'))];
const display = document.querySelector('.display-input');
const digits = '0123456789';
const operators = '+-*/';
let currNumber = '';

const setDisplay = function setInputToDisplay(key) {
  if (digits.includes(key) || (key === '.' && !currNumber.includes('.'))) {
    currNumber += key;
    display.value += key;
  } else if (operators.includes(key)) {
    currNumber = '';
    display.value += key;
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    display.value = null;
  }
}

keyButtons.map((keyBtn) => {
  keyBtn.addEventListener('click', (e) => { 
    const key = e.target.getAttribute('data-key');
    setDisplay(key);
  })
})

window.addEventListener('keydown', function (e) {
  const key = document.querySelector(`.key[data-key='${e.key}']`);
  setDisplay(key);
});