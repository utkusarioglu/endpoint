# Endpoint Tools

An opinionated but customizable tool for designing, enforcing and communicating
rest endpoints. Allowing teams to design API-first applications where the api
shape is a library to be imported and consumed like everything else.

## Features

- Opinionated types for Get, Post, Head, Put, Patch and Delete
- Meek types for Get, Post, Head, Put, Patch and Delete
- Mixin types for common properties such as WithId, WithRequestId, WithErrors
- Tools for parsing and checking endpoints

## Concepts

This repo uses a type convention called _hierarchical types_ to gather related
types in a single object. A simple example of this concept would be:

```ts
type RestGetStates = {
  _request: {
    Params: any;
  };
  _response: {
    Success: any;
    Fail: any;
  };
};
```

Properties that start with underscore in `RestGetStates` are hierarchical steps
used for grouping related types such as `Success` and `Fail` states of
`_response`. While pascal case properties such as `Params` are _types_ that are
intended to be used inside the application.

## Usage

Endpoint Tools comes with two variants of each Rest endpoint: Opinionated and
'Meek';

```ts
import { Get, GetMeek } from 'endpoint-tools';
```

Opinionated types impose a certain shape on response types. You can read more
about the shape of the opinionated response types [here](./OPINIONATED.md). Meek
types let the user define any kind of response shapes for Success and Fail
states.

### Defining your endpoints with opinionated tools

Assume that we are developing a site that pulls multiple posts of some category
from the server using GET. We will demonstrate the use with the opinionated
`Get` tool.

```ts
/**
 * An interface that defines all the endpoints related to handling posts
 */
interface CategoryEndpoints {
  _posts: {
    _v1: Get<
      '/category/:categorySlug/posts/v1', // endpoint url
      { categorySlug: string }, // url params
      { start: number; count: number }, // url query
      {
        // shape for the success body
        id: string; // uuid
        title: string;
        content: string;
      }
    >;
  };
}
```

What we did here is to define a _hierarchical interface_ called
`CategoryEndpoints` that contain all the endpoints related to handling posts.
During consumption, we will access `_posts/v1` endpoint using
[index access](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html):

```ts
type GetCategoryPostsV1 = CategoryEndpoints['_posts']['_v1'];
```

Now, let's have a look at what the `GetCategoryPostsV1` type hierarchy for our
GET endpoint looks like:

```ts
{
  // Your endpoint input
  Endpoint: '/category/:categorySlug/posts/v1',
  Type: 'get',  // string literal
  _req: {
    // Your params input
    Params: {
      categorySlug: string,
    },
    // Your query input
    query: {
      start: number,
      count: number,
    }
  },
  _res: { // _silent_snake_case for hierarchy types
    Success: {
      state: 'success', // string literal
      requestId: string,
      // shape for the success response
      body: {
        id: string,
        title: string,
        content: string,
      }
    },
    Fail: { // PascalCase means that this is an independent type
      state: 'fail', // string literal
      requestId: string,
      errors: {
        general: string,
      }
    },
    Union: ... // union of Success and fail, omitting for readability
  }
}
```

You can see that the created type hierarchy contains params for the request, the
`Success` and `Fail` types for the response, as well as a `Union` type that
combines the two. For accessing the independent types, you can follow the
indexes:

```ts
type SinglePost = GetCategoryPostsV1['_res']['Success']['body'];
type RequestParams = GetCategoryPostsV1['_req']['Params'];
```

### Defining your endpoints with meek tools

Meek tools allow you to define custom shapes for your responses. We will design
a similar endpoint to the example above.

```ts
interface CategoryEndpoints {
  _single: {
    _v1: GetMeek<
      '/category/:categorySlug/posts/v1', // endpoint url
      { categorySlug: string }, // url params
      { start: number; count: number }, // url query
      {
        // shape for the success response (not just body)
        id: string;
        title: string;
        content: string;
      },
      {
        // shape for the error response
        errorCode: string;
      }
    >;
  };
}
```

Meek tools take two arguments for the response: one for success and one for fail
states. The type hierarchy created by the definition above is as follows:

```ts
{
  Endpoint: '/category/:categorySlug/posts/v1',
  Type: 'get',
  _req: {
    Params: {
      postSlug: string;
    },
    query: {
      start: number;
      count: number;
    }
  },
  _res: {
    Success: {
      // the success type we provided is used without any additional props
      id: string,
      title: string,
      content: string,
    },
    Fail: {
      // the fail type we provided is used without any additional props
      errorCode: string,
    },
    Union: ... // union of Success and Fail
  }
}
```

Meek types allow you to use this repo with rest endpoints of all kinds. Note
that checking whether the response you got from the server is an error or a
success may be inconsistent when you are not relying on a single property like
`state` used in the opinionated variants.

### Preparing your endpoints

You will probably have endpoints that require parsing params or a query. To do
this safely, you can use the `prepareEndpoint` function. We will use fetch api
to demonstrate the usage.

```ts
import { prepareEndpoint, isFail } from 'endpoint-tools';

fetch(
  prepareEndpoint<GetCategoryPostsV1>( // the generic has to be given
    '/category/:categorySlug/posts/v1',
    {
      categorySlug: 'banana-for-scale',
    },
    {
      start: 0,
      count: 20,
    }
  )
) // '/category/banana-for-scale/posts/v1?start=0&count=20'
  .then((response) => response.json())
  .then((data) => {
    // data will be of type GetCategoryPostsV1['_res']['Union']
    // checking for response fail state
    if (isFail(data)) {
      handleError(data);
    } else {
      // here, the type is GetCategoryPostsV1['_res']['Success']
      // do state management
    }

    return data; // GetCategoryPostsV1['_res']['Union']
  });
```

This will ensure that the endpoint being used matches the endpoint defined in
`GetCategoryPostsV1`. It will also make sure that the endpoint receives the
required `categorySlug` param and have its query parsed as expected.

As defined by our opinionated response, the `state` property can be used to
check for fail states. `isFail` is some syntactic sugar to check whether
`data.state === 'fail'` holds true while using opinionated tools.

It should be noted that some libraries such as Axios handle parsing of query
string, in that case, you may choose to handle query parsing by the tools your
preferred library. But using `prepareEndpoint` will ensure that your query props
are checked with a little bit more ease.

### Validating your endpoints

On the server-side, you can use `validateEndpoint` to check your endpoints.

```ts
import { validateEndpoint } from 'endpoint-tools';

// IIFE is not required but it enables speedy development as it
// creates a separate scope and allows the use of the same type names.
(() => {
  type Feature = GetCategoryPostsV1;
  type Params = Feature['_req']['Params'];
  // Response has to be Union, not Success
  type Response = Feature['_res']['Union'];
  type Endpoint = Feature['Endpoint'];

  router.get<Params, Response>(
    validateEndpoint<Feature>('/category/:categorySlug/posts/v1'),
    async ({ params: { requestId }, query }, res) => {
      // the rest of your code
    }
  );
})();
```
