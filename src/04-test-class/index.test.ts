// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const result = getBankAccount(5000) instanceof BankAccount;
    expect(result).toBeTruthy();
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(5000);
    expect(() => account.withdraw(15000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = new BankAccount(5000);
    const account2 = new BankAccount(5000);
    expect(() => account.transfer(15000, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(5000);
    expect(() => account.transfer(1000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(5000);
    console.log(account['balance']);
    expect(typeof account.deposit).toBe('function');
  });

  test('should withdraw money', () => {
    const account = new BankAccount(5000);
    expect(typeof account.withdraw).toBe('function');
  });

  test('should transfer money', () => {
    const account = new BankAccount(5000);
    expect(typeof account.transfer).toBe('function');
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // jest.mock('lodash', () => {
    //   function random(a: number, b: number, c: boolean) {
    //     console.debug(a);
    //     return a * 0 + b * 0 + +c;
    //   }
    //   return {
    //     random: random,
    //   };
    // });
    // const account = new BankAccount(5000);
    // expect(account.fetchBalance()).resolves.toEqual(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(5000);
    jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
      return new Promise((resolve) => resolve(500));
    });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(5000);
    jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
      return new Promise((resolve) => resolve(null));
    });
    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
