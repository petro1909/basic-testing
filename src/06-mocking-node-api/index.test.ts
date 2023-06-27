// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromices from 'fs/promises';

import { readFileAsynchronously, doStuffByInterval, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(jest.fn(), 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const testPath = './testPath';
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously(testPath);
    expect(path.join).toBeCalledWith(expect.any(String), testPath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const result = await readFileAsynchronously(testPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fsPromices, 'readFile').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(fileContent);
      });
    });
    const result = await readFileAsynchronously(testPath);
    expect(result).toBe(fileContent);
  });
});
