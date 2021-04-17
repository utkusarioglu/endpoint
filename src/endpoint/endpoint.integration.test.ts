import { validateEndpoint, prepareEndpoint } from './endpoint';
import { Get, Post } from '../index';
import { uuid, mimetype, isoDate } from '../index';

describe('validateEndpoint', () => {
  it('uses GET', () => {
    type Feature = Get<'some/end/:point', { point: number }, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });

  it('uses POST', () => {
    type Feature = Post<'some/end/:point', { point: number }, {}, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });
});

describe('prepareEndpoint', () => {
  it('uses GET', () => {
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

  it('uses GET with flavors', () => {
    type Feature = Get<
      '/some/:end/:point/:url',
      { point: uuid; end: mimetype; url: isoDate },
      {}
    >;
    const endpoint = '/some/:end/:point/:url';
    const params = {
      point: 'uuid',
      end: 'mime-type',
      url: 'isoDate',
    };
    const prepared = prepareEndpoint<
      Feature['Endpoint'],
      Feature['_get']['_req']['Params']
    >(endpoint, params);
    const expected = '/some/mime-type/uuid/isoDate';
    expect(expected).toStrictEqual(prepared);
  });

  it('uses POST', () => {
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

  it('uses POST with flavors', () => {
    type Feature = Post<
      '/some/:end/:point/:url',
      { point: uuid; end: mimetype; url: isoDate },
      {},
      {}
    >;
    const endpoint = '/some/:end/:point/:url';
    const params = {
      point: 'uuid',
      end: 'mime-type',
      url: 'isoDate',
    };
    const prepared = prepareEndpoint<
      Feature['Endpoint'],
      Feature['_post']['_req']['Params']
    >(endpoint, params);
    const expected = '/some/mime-type/uuid/isoDate';
    expect(expected).toStrictEqual(prepared);
  });
});
