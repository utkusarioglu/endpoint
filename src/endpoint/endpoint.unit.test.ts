import { validateEndpoint, prepareEndpoint } from './endpoint';

describe('validateEndpoint', () => {
  it('validate as identity', () => {
    const endpoint = 'some/end/point';
    const validated = validateEndpoint(endpoint);
    expect(endpoint).toBe(validated);
  });

  it('validate with generic', () => {
    type Endpoint = 'some/end/point';
    const endpoint = 'some/end/point';
    const validated = validateEndpoint<Endpoint>(endpoint);
    expect(endpoint).toBe(validated);
  });
});

describe('prepareEndpoint', () => {
  it('prepare no-param endpoint', () => {
    const endpoint = 'some/end/point';
    const prepared = prepareEndpoint(endpoint);
    expect(endpoint).toBe(prepared);
  });

  it('prepare no-param endpoint with generics', () => {
    type Endpoint = 'some/end/point';
    const endpoint = 'some/end/point';
    const prepared = prepareEndpoint<Endpoint, {}>(endpoint);
    expect(prepared).toBe(endpoint);
  });

  it('prepare empty-param endpoint with generics', () => {
    type Endpoint = 'some/end/point';
    type Params = {};
    const endpoint = 'some/end/point';
    const params = {};
    const prepared = prepareEndpoint<Endpoint, Params>(endpoint, params);
    expect(prepared).toBe(endpoint);
  });

  it('prepare one-param endpoint with generics', () => {
    type Endpoint = 'some/end/:point';
    const endpoint = 'some/end/:point';

    // With number
    type ParamNum = { point: number };
    const paramNum = { point: 1 };
    const preparedWithNumber = prepareEndpoint<Endpoint, ParamNum>(
      endpoint,
      paramNum
    );

    const expectedForNum = 'some/end/1';
    expect(expectedForNum).toStrictEqual(preparedWithNumber);

    // With string
    type ParamStr = { point: string };
    const paramStr = { point: 'replacement' };
    const preparedWithString = prepareEndpoint<Endpoint, ParamStr>(
      endpoint,
      paramStr
    );
    const expectedForString = 'some/end/replacement';
    expect(expectedForString).toStrictEqual(preparedWithString);
  });

  it('prepare multi-param endpoint with generics', () => {
    type Endpoint = 'this/is/a/:multi/:param/:endpoint';
    const endpoint = 'this/is/a/:multi/:param/:endpoint';
    type Params = {
      multi: number;
      param: string;
      endpoint: boolean;
    };
    const params = {
      multi: 2,
      param: 'pr',
      endpoint: false,
    };
    const expected = 'this/is/a/2/pr/false';
    const prepared = prepareEndpoint<Endpoint, Params>(endpoint, params);
    expect(expected).toStrictEqual(prepared);
  });
});
