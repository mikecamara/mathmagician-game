import { expect } from "chai";
import {
  expressionAnswer,
  generateExpressions,
} from "../../src/reducers/Calculator";

describe("Calculator", () => {
  it("generates expressions", () => {
    expect(generateExpressions(10)).to.have.lengthOf(10);
  });

  it("checks addition", () => {
    expect(
      expressionAnswer({
        lhs: 0,
        rhs: 1,
        operator: "+",
      })
    ).to.eql(1);
  });

  it("checks subtraction", () => {
    expect(
      expressionAnswer({
        lhs: 0,
        rhs: 1,
        operator: "-",
      })
    ).to.eql(-1);
  });

  it("checks multiplication", () => {
    expect(
      expressionAnswer({
        lhs: 0,
        rhs: 1,
        operator: "*",
      })
    ).to.eql(0);
  });

  it("checks integer division", () => {
    expect(
      expressionAnswer({
        lhs: 3,
        rhs: 2,
        operator: "/",
      })
    ).to.eql(1);
  });
});
