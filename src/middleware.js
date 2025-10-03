/** @type {import('astro').MiddlewareHandler} */
export async function onRequest({ request, redirect, next }) {
  const auth = request.headers.get('authorization');
  const expected =
    'Basic ' + btoa(`${import.meta.env.AUTH_USERNAME}:${import.meta.env.AUTH_PASSWORD}`);

  if (auth !== expected) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  return next(); // allow the request to proceed
}