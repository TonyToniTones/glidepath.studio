export async function onRequest(context) {
  const { request, next } = context;

  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;

  if (!username || !password) {
    console.warn("Missing AUTH_USERNAME or AUTH_PASSWORD in env");
    return new Response('Server misconfigured', { status: 500 });
  }

  const expected = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  const auth = request.headers.get('authorization');

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