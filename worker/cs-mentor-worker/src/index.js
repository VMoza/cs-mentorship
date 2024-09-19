import { Router } from 'itty-router';

const router = Router();

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://cs-mentorship-site.pages.dev',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Add a route to handle GET requests to "/"
router.get('/', () => {
  return new Response('Hello, World!', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders, // Apply CORS headers
    },
  });
});

// Handle preflight OPTIONS requests for CORS
const handleOptions = () => {
  return new Response(null, {
    headers: corsHeaders,
  });
};

addEventListener('fetch', event => {
  const { request } = event;

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    event.respondWith(Promise.resolve(handleOptions()));
    return;
  }

  // Ensure router.handle always returns a promise
  event.respondWith(
    (async () => {
      try {
        const response = await router.handle(request);
        return response || new Response('Not Found', { status: 404 });
      } catch (err) {
        return new Response('Internal Server Error', { status: 500 });
      }
    })()
  );
});
