/** @type {import('astro').MiddlewareHandler} */
export async function onRequest(context, next) {
  const auth = context.request.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${import.meta.env.AUTH_USERNAME}:${import.meta.env.AUTH_PASSWORD}`).toString('base64');

  if (auth !== expected) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  // ✅ Must return the result of next() to proceed
  return next(); // <--- THIS IS THE KEY
}