/** @type {import('astro').MiddlewareHandler} */
export async function onRequest({ request }) {
  const username = import.meta.env.AUTH_USERNAME;
  const password = import.meta.env.AUTH_PASSWORD;

  const expectedAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  const providedAuth = request.headers.get('authorization');

  if (providedAuth !== expectedAuth) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  return undefined;
}