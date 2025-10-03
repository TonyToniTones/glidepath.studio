/** @type {import('astro').MiddlewareHandler} */
export async function onRequest({ request }) {
  const auth = request.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${import.meta.env.AUTH_USERNAME}:${import.meta.env.AUTH_PASSWORD}`).toString('base64');

  if (auth !== expected) {
    return new Response('Not authorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="glidepath.studio"',
      },
    });
  }

  // ✅ Continue request — just return nothing
  return;
}