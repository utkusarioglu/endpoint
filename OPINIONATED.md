# Opinionated Rest Tools

Endpoint tools offer the following opinionated rest types:

- Get
- Head
- Post
- Patch
- Put
- Delete

## What are the 'Opinions' in these tools

These tools differ from their meek variants in the response types they return.

### Response success type

Response success type returns the following structure:

```ts
type Success = {
  state: 'success';
  requestId: string;
  body: ResponseSuccessBody;
};
```

`ResponseSuccessBody` is the 4rd generic provided to all opinionated types. In
the documentation, it's listed as the generic named `ResSuccessBody`.

The `state` property is a string literal that assumes either `'success'` or
`'fail'` values. This property is here to provide a fool-proof method for
determining the state of the response.

```ts
import { isFail } from 'endpoint-tools';

// data comes from rest handler
if (data.state === 'fail') {
  // handle error response
} else {
  // handle success response
}
```

There are a myriad of different apis out there with all kinds of designs.
Testing whether the response is an error becomes a problem with poorly thought
out apis. The use of this property makes state checking predictable.

The `requestId` property is for exchanging a known id between the client and the
server to make sure that duplicate and/or unauthorized requests are ignored.

The `body` property carries the data that the client actually wants. it's
designed to be a nested property to make sure that there is no name clash with
`state` or `requestId`.

### Response Fail type

Fail type opinionated structure is as follows:

```ts
type Error = {
  state: 'fail';
  requestId: string;
  errors: {
    general: string;
    [inputErrors: string]: string;
  };
};
```

`state` property is a string literal as described above. It's the property to
test against to securely determine whether the response is a fail or a success.

`requestId` property is the id for the request as it's defined above.

`errors` property is heavily influenced by requirements of
[Formik](https://formik.org/). `errors` is designed to return a `Record` with
the some keys being `name` property of input elements. This allows a
straightforward way to print the errors in the UI. For this to work, you are
advised to return the `Union` type to the ui library of your choice.

```ts
import { prepareEndpoint, isFail } from 'endpoint-tools';

fetch(
  prepareEndpoint<GetCategoryPostsV1>(
    '/category/:categorySlug/posts/v1',
    {
      categorySlug: 'banana-for-scale',
    },
    {
      start: 0,
      count: 20,
    }
  )
)
  .then((response) => response.json())
  .then((data) => {
    if (isFail(data)) {
      handleError(data);
    } else {
      // state management
    }

    return data; // GetCategoryPostsV1['_res']['Union']
  });
```

and then the component can do its own check for the error state and update the
ui.

`general` property in `errors` can be used for any other error that doesn't
relate to input values.
