// worker/src/index.js

import { Router } from 'itty-router';
import { nanoid } from 'nanoid';
import { createHmac } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';

const router = Router();

// Helper functions
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function generateJWT(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(JWT_SECRET));
}

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (err) {
    return null;
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Replace '*' with your frontend domain in production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Include these headers in every response
return new Response(JSON.stringify(responseData), {
  headers: { 'Content-Type': 'application/json', ...corsHeaders },
});


// Preflight handler
router.options('*', () => {
  return new Response(null, { headers: corsHeaders });
});

// Signup route
router.post('/signup', async request => {
  const { email, password, username } = await request.json();

  // Check if user exists
  const userKey = `user:${email}`;
  const existingUser = await USER_DATA.get(userKey);
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'Email already in use' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user object
  const user = {
    id: nanoid(),
    email,
    username,
    password: hashedPassword,
  };

  // Store user in KV
  await USER_DATA.put(userKey, JSON.stringify(user));

  return new Response(JSON.stringify({ message: 'Sign-up successful' }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
});

// Login route
router.post('/login', async request => {
  const { email, password } = await request.json();

  // Retrieve user
  const userKey = `user:${email}`;
  const userData = await USER_DATA.get(userKey, 'json');
  if (!userData) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Verify password
  const hashedPassword = await hashPassword(password);
  if (hashedPassword !== userData.password) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Generate JWT
  const token = await generateJWT({
    id: userData.id,
    email: userData.email,
    username: userData.username,
  });

  return new Response(JSON.stringify({ message: 'Login successful', token }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
});

// Check-auth route
router.get('/check-auth', async request => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const token = authHeader.substring(7);
  const payload = await verifyJWT(token);

  if (!payload) {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  return new Response(JSON.stringify({ isAuthenticated: true, user: payload }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
});

// Create-checkout-session route
router.post('/create-checkout-session', async request => {
  const { consultationType } = await request.json();

  let priceId;
  if (consultationType === 'group') {
    priceId = 'price_1Q0ag3Hbl2elS2At0ETHNIlK'; // Your Group Call Price ID
  } else if (consultationType === 'one-on-one') {
    priceId = 'price_1Q0aitHbl2elS2AtWP4kXnWu'; // Your 1:1 Consultation Price ID
  } else {
    return new Response(JSON.stringify({ error: 'Invalid consultation type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'payment_method_types[]': 'card',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      mode: 'payment',
      success_url: 'https://your-frontend-domain/consultations/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://your-frontend-domain/consultations/cancel',
    }),
  });

  const session = await stripeResponse.json();

  if (stripeResponse.ok) {
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } else {
    return new Response(JSON.stringify({ error: session.error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

// 404 handler
router.all('*', () => {
  return new Response('Not Found', { status: 404, headers: corsHeaders });
});

// Event listener
addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request));
});
