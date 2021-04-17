import { validateEndpoint, prepareEndpoint } from './endpoint';
import { Get, Post } from '../index';

describe('validateEndpoint', () => {
  it('uses GET as expected', () => {
    type Feature = Get<'some/end/:point', { point: number }, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });

  it('uses POST as expected', () => {
    type Feature = Post<'some/end/:point', { point: number }, {}, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });
});

describe('prepareEndpoint', () => {
  it('uses GET as expected', () => {
    type Feature = Get<
      '/some/:end/:point/:url',
      { point: number; end: string; url: boolean },
      {}
    >;
    const endpoint = '/some/:end/:point/:url';
    const params = {
      point: 2,
      end: 'yes',
      url: true,
    };
    const prepared = prepareEndpoint<
      Feature['Endpoint'],
      Feature['_get']['_req']['Params']
    >(endpoint, params);
    const expected = '/some/yes/2/true';
    expect(expected).toStrictEqual(prepared);
  });

  it('uses POST as expected', () => {
    type Feature = Post<
      '/some/:end/:point/:url',
      { point: number; end: string; url: boolean },
      {},
      {}
    >;
    const endpoint = '/some/:end/:point/:url';
    const params = {
      point: 3,
      end: 'no',
      url: false,
    };
    const prepared = prepareEndpoint<
      Feature['Endpoint'],
      Feature['_post']['_req']['Params']
    >(endpoint, params);
    const expected = '/some/no/3/false';
    expect(expected).toStrictEqual(prepared);
  });
});
