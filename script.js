const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");


let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

const updateDisplay = () => {
    display.value = displayValue;
};
updateDisplay();

keys.addEventListener("click", (e) => {
    const element = e.target;
    const value = element.value
    if (!element.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);

    }
    updateDisplay();




});
const handleOperator = (nextOperator) => {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculator(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

const calculator = (first, second, operator) => {
    if (operator === "+") {
        return first + second;

    }
    else if (operator === "-") {
        return first - second;

    }
    else if (operator === "*") {
        return first * second;

    }
    else if (operator === "/") {
        return first / second;

    }
    return second;
}

const inputNumber = (num) => {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === "0" ? num : displayValue + num;
    }


}
const inputDecimal = () => {
    if (!displayValue.includes("."))

        displayValue += ".";
};
const clear = () => {
    displayValue = "0";
}