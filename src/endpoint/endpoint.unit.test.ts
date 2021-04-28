import { validateEndpoint, prepareEndpoint } from './endpoint';

describe('validateEndpoint', () => {
  it('validate as identity', () => {
    const endpoint = 'some/end/point';
    const validated = validateEndpoint(endpoint);
    expect(endpoint).toBe(validated);
  });

  it('validate with generic', () => {
    type EndpointHierarchy = { Endpoint: 'some/end/point' };
    const endpoint = 'some/end/point';
    const validated = validateEndpoint<EndpointHierarchy>(endpoint);
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
    type EndpointHierarchy = {
      Endpoint: 'some/end/point';
      _req: { Params: {}; Query: {} };
    };
    const endpoint = 'some/end/point';
    const prepared = prepareEndpoint<EndpointHierarchy>(endpoint);
    expect(prepared).toBe(endpoint);
  });

  it('prepare empty-param endpoint with generics', () => {
    type EndpointHierarchy = {
      Endpoint: 'some/end/point';
      _req: { Params: {}; Query: {} };
    };
    const endpoint = 'some/end/point';
    const params = {};
    const prepared = prepareEndpoint<EndpointHierarchy>(endpoint, params);
    expect(prepared).toBe(endpoint);
  });

  it('prepare empty-query endpoint with generics', () => {
    type EndpointHierarchy = {
      Endpoint: 'some/end/point';
      _req: { Params: {}; Query: {} };
    };
    const endpoint = 'some/end/point';
    const query = {};
    const prepared = prepareEndpoint<EndpointHierarchy>(
      endpoint,
      undefined,
      query
    );
    expect(prepared).toBe(endpoint);
  });

  it('prepare one-param endpoint with generics', () => {
    type EndpointHierarchyNum = {
      Endpoint: 'some/end/:point';
      _req: { Params: { point: number }; Query: {} };
    };
    const endpoint = 'some/end/:point';
    const paramNum = { point: 1 };
    const preparedWithNumber = prepareEndpoint<EndpointHierarchyNum>(
      endpoint,
      paramNum
    );
    const expectedForNum = 'some/end/1';
    expect(expectedForNum).toStrictEqual(preparedWithNumber);

    type EndpointHierarchyStr = {
      Endpoint: 'some/end/:point';
      _req: { Params: { point: string }; Query: {} };
    };
    const paramStr = { point: 'replacement' };
    const preparedWithString = prepareEndpoint<EndpointHierarchyStr>(
      endpoint,
      paramStr
    );
    const expectedForString = 'some/end/replacement';
    expect(expectedForString).toStrictEqual(preparedWithString);
  });

  it('prepare one-query endpoint with generics', () => {
    type EndpointHierarchyNum = {
      Endpoint: 'some/end';
      _req: { Params: {}; Query: { point: number } };
    };
    const endpoint = 'some/end';
    const queryNum = { point: 1 };
    const preparedWithNumber = prepareEndpoint<EndpointHierarchyNum>(
      endpoint,
      undefined,
      queryNum
    );
    const expectedForNum = 'some/end?point=1';
    expect(expectedForNum).toStrictEqual(preparedWithNumber);

    type EndpointHierarchyStr = {
      Endpoint: 'some/end';
      _req: { Params: {}; Query: { point: string } };
    };
    const queryStr = { point: 'replacement' };
    const preparedWithString = prepareEndpoint<EndpointHierarchyStr>(
      endpoint,
      undefined,
      queryStr
    );
    const expectedForString = 'some/end?point=replacement';
    expect(expectedForString).toStrictEqual(preparedWithString);
  });

  it('prepare multi-param endpoint with generics', () => {
    type EndpointHierarchy = {
      Endpoint: 'this/is/a/:multi/:param/:endpoint';
      _req: {
        Params: {
          multi: number;
          param: string;
          endpoint: boolean;
        };
        Query: {};
      };
    };
    const endpoint = 'this/is/a/:multi/:param/:endpoint';
    const params = {
      multi: 2,
      param: 'pr',
      endpoint: false,
    };
    const expected = 'this/is/a/2/pr/false';
    const prepared = prepareEndpoint<EndpointHierarchy>(endpoint, params);
    expect(expected).toStrictEqual(prepared);
  });

  it('prepare multi-query endpoint with generics', () => {
    type EndpointHierarchy = {
      Endpoint: 'this/is/a';
      _req: {
        Params: {};
        Query: {
          multi: number;
          param: string;
          endpoint: boolean;
        };
      };
    };
    const endpoint = 'this/is/a';
    const query = {
      multi: 2,
      param: 'pr',
      endpoint: false,
    };
    const expected = 'this/is/a?multi=2&param=pr&endpoint=false';
    const prepared = prepareEndpoint<EndpointHierarchy>(
      endpoint,
      undefined,
      query
    );
    expect(expected).toStrictEqual(prepared);
  });
});
