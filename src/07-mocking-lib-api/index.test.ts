// Uncomment the code below and write your tests
//import axios from 'axios';
//import lodash from 'lodash';
//import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import axios, { AxiosRequestConfig } from 'axios';

describe('throttledGetDataFromApi', () => {
  const expectedData = { name: 'Mike' };
  const relativePath = '/testPath';
  let mockedFunction: jest.SpyInstance<
    Promise<unknown>,
    [url: string, config?: AxiosRequestConfig<unknown> | undefined]
  >;
  beforeEach(() => {
    mockedFunction = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: expectedData }));
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
    mockedFunction.mockClear();
  });

  test('should create instance with provided base url', async () => {
    const createMock = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    const inputURL = createMock.mock.calls[0]?.[0]?.baseURL;
    const actualURL = createMock.mock.results[0]?.value.defaults.baseURL;
    expect(inputURL).toEqual(actualURL);
    createMock.mockClear();
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    const firstCall = mockedFunction.mock.calls[0];
    expect(firstCall?.[0]).toBe(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe(expectedData);
  });
});
