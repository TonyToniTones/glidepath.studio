/** @type {import('astro').MiddlewareHandler} */
export async function onRequest(context, next) {
  // Check if auth environment variables are configured
  const username = import.meta.env.AUTH_USERNAME;
  const password = import.meta.env.AUTH_PASSWORD;

  if (!username || !password) {
    console.error('AUTH_USERNAME and AUTH_PASSWORD environment variables must be set');
    return new Response('Server configuration error', { status: 500 });
  }

  const auth = context.request.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  if (auth !== expected) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  return next();
}