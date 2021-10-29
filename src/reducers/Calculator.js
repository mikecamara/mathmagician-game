const generateDigit = () => Math.floor(Math.random() * 20);

const chooseOne = (options) =>
  options[Math.floor(Math.random() * options.length)];

const defaultGenerateExpression = () => ({
  lhs: generateDigit(),
  operator: chooseOne(["+", "-", "*", "/"]),
  rhs: generateDigit(),
});

export const generateExpressions = (roundsPerGame, generateExpression) =>
  Array.from({ length: roundsPerGame }).map(() =>
    generateExpression ? generateExpression() : defaultGenerateExpression()
  );

export const expressionAnswer = (expression) => {
  if (expression.operator === "+") {
    return expression.lhs + expression.rhs;
  } else if (expression.operator === "-") {
    return expression.lhs - expression.rhs;
  } else if (expression.operator === "*") {
    return expression.lhs * expression.rhs;
  } else if (expression.operator === "/") {
    return Math.floor(expression.lhs / expression.rhs);
  }
};
