/** @type {import('astro').MiddlewareHandler} */
export async function onRequest({ request, redirect, next }) {
  const auth = request.headers.get('authorization');

  const username = import.meta.env.AUTH_USERNAME;
  const password = import.meta.env.AUTH_PASSWORD;

  // Fallback for missing credentials
  if (!username || !password) {
    console.warn("[middleware] Missing AUTH_USERNAME or AUTH_PASSWORD");
    return new Response('Server misconfigured', { status: 500 });
  }

  const expected = 'Basic ' + btoa(`${username}:${password}`);

  if (auth !== expected) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  return next(); // Allow the request to proceed
}