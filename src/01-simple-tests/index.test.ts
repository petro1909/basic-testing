// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const inputValue = { a: 2, b: 3, action: Action.Add };
    const expectedResult = 5;
    const actualResult = simpleCalculator(inputValue);
    expect(expectedResult).toEqual(actualResult);
  });

  test('should substract two numbers', () => {
    const inputValue = {
      a: 10,
      b: 3,
      action: Action.Subtract,
    };
    const expectedResult = 7;
    const actualResult = simpleCalculator(inputValue);
    expect(expectedResult).toEqual(actualResult);
  });

  test('should multiply two numbers', () => {
    const inputValue = {
      a: 2,
      b: 3,
      action: Action.Multiply,
    };
    const expectedResult = 6;
    const actualResult = simpleCalculator(inputValue);
    expect(expectedResult).toEqual(actualResult);
  });

  test('should divide two numbers', () => {
    const inputValue = {
      a: 12,
      b: 3,
      action: Action.Divide,
    };
    const expectedResult = 4;
    const actualResult = simpleCalculator(inputValue);
    expect(expectedResult).toEqual(actualResult);
  });

  test('should exponentiate two numbers', () => {
    const inputValue = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };
    const expectedResult = 8;
    const actualResult = simpleCalculator(inputValue);
    expect(expectedResult).toEqual(actualResult);
  });

  test('should return null for invalid action', () => {
    const inputValue = {
      a: 12,
      b: 3,
      action: 'nonexistance',
    };
    const actualResult = simpleCalculator(inputValue);
    expect(actualResult).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const inputValue = {
      a: 12,
      b: 'fewfe',
      action: Action.Add,
    };
    const actualResult = simpleCalculator(inputValue);
    expect(actualResult).toBeNull();
  });
});
