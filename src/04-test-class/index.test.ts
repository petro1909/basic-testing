// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

import lodash from 'lodash';
const account = getBankAccount(1000);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 5000;
    const actualAccount = getBankAccount(balance);
    expect(actualAccount instanceof BankAccount);
    expect(actualAccount.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(15000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountToTransfer = new BankAccount(5000);
    const sumMoreThanBalance = 15000;
    expect(() =>
      account.transfer(sumMoreThanBalance, accountToTransfer),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 2500;
    const account = getBankAccount(initialBalance);
    const depositMoney = 1000;
    const expectedAccountBalanceAfterDeposit = initialBalance + depositMoney;
    account.deposit(depositMoney);

    expect(account.getBalance()).toEqual(expectedAccountBalanceAfterDeposit);
  });

  test('should withdraw money', () => {
    const initialBalance = 2500;
    const account = getBankAccount(initialBalance);
    const withdrawMoney = 1000;
    account.withdraw(withdrawMoney);

    expect(account.getBalance()).toEqual(initialBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const initialBalance_1st = 2500;
    const accountFrom = getBankAccount(initialBalance_1st);

    const initialBalance_2nd = 7500;
    const accountTo = getBankAccount(initialBalance_2nd);

    const transferAmount = 1500;

    accountFrom.transfer(transferAmount, accountTo);

    expect(accountFrom.getBalance()).toEqual(
      initialBalance_1st - transferAmount,
    );
    expect(accountTo.getBalance()).toEqual(initialBalance_2nd + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 0);
    await expect(account.fetchBalance()).resolves.toEqual(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 500;
    jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
      return new Promise((resolve) => resolve(newBalance));
    });
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);

    jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
      return new Promise((resolve) => resolve(null));
    });
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
