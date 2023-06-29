// Uncomment the code below and write your tests
import { generateLinkedList, LinkedListNode } from './index';

describe('generateLinkedList', () => {
  const inputArray = [5, 1, 6, 3, -3];
  const actualLinkedList = generateLinkedList(inputArray);
  const exprectedLinkedListHeadNode: LinkedListNode<number> = {
    value: 5,
    next: {
      value: 1,
      next: {
        value: 6,
        next: {
          value: 3,
          next: {
            value: -3,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(actualLinkedList).toStrictEqual(exprectedLinkedListHeadNode);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(actualLinkedList).toMatchSnapshot();
  });
});
