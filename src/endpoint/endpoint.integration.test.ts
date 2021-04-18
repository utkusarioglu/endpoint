import { validateEndpoint, prepareEndpoint } from './endpoint';
import { Get, Head, Post, Put, Patch, Delete } from '../index';
import { Uuid, MimeType, IsoDate } from 'brands-and-flavors';

describe('validateEndpoint', () => {
  it('uses GET', () => {
    type Feature = Get<'some/end/:point', { point: number }, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });

  it('uses HEAD', () => {
    type Feature = Head<'some/end/:point', { point: number }>;
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

  it('uses PUT', () => {
    type Feature = Put<'some/end/:point', { point: number }, {}, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });

  it('uses PATCH', () => {
    type Feature = Patch<'some/end/:point', { point: number }, {}, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });

  it('uses DELETE', () => {
    type Feature = Delete<'some/end/:point', { point: number }, {}>;
    const endpoint = 'some/end/:point';
    const validated = validateEndpoint<Feature['Endpoint']>(endpoint);
    expect(validated).toBe(endpoint);
  });
});

describe('prepareEndpoint', () => {
  describe('GET', () => {
    it('with primitives', () => {
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

    it('with flavors', () => {
      type Feature = Get<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate },
        {}
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_get']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });

  describe('HEAD', () => {
    it('with primitives', () => {
      type Feature = Head<
        '/some/:end/:point/:url',
        { point: number; end: string; url: boolean }
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 2,
        end: 'yes',
        url: true,
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_head']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/yes/2/true';
      expect(expected).toStrictEqual(prepared);
    });

    it('with flavors', () => {
      type Feature = Head<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate }
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_head']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });

  describe('POST', () => {
    it('with primitives', () => {
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

    it('with flavors', () => {
      type Feature = Post<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate },
        {},
        {}
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_post']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });

  describe('PUT', () => {
    it('with primitives', () => {
      type Feature = Put<
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
        Feature['_put']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/no/3/false';
      expect(expected).toStrictEqual(prepared);
    });

    it('with flavors', () => {
      type Feature = Put<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate },
        {},
        {}
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_put']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });

  describe('PATCH', () => {
    it('with primitives', () => {
      type Feature = Patch<
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
        Feature['_patch']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/no/3/false';
      expect(expected).toStrictEqual(prepared);
    });

    it('with flavors', () => {
      type Feature = Patch<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate },
        {},
        {}
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_patch']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });

  describe('DELETE', () => {
    it('with primitives', () => {
      type Feature = Delete<
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
        Feature['_delete']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/yes/2/true';
      expect(expected).toStrictEqual(prepared);
    });

    it('with flavors', () => {
      type Feature = Delete<
        '/some/:end/:point/:url',
        { point: Uuid; end: MimeType; url: IsoDate },
        {}
      >;
      const endpoint = '/some/:end/:point/:url';
      const params = {
        point: 'Uuid',
        end: 'mime-type',
        url: 'IsoDate',
      };
      const prepared = prepareEndpoint<
        Feature['Endpoint'],
        Feature['_delete']['_req']['Params']
      >(endpoint, params);
      const expected = '/some/mime-type/Uuid/IsoDate';
      expect(expected).toStrictEqual(prepared);
    });
  });
});
