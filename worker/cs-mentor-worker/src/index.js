// src/index.js

import { Router } from 'itty-router';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

// Initialize Router
const router = Router();

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://cs-mentorship-site.pages.dev', // Update to your frontend URL in production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle preflight OPTIONS requests
router.options('*', () => new Response(null, { headers: corsHeaders }));

// Helper Function: Hash Password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper Function: Generate JWT
async function generateJWT(payload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Token valid for 2 hours
    .sign(new TextEncoder().encode(JWT_SECRET)); // Use global JWT_SECRET
  return jwt;
}

// Helper Function: Verify JWT
async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)); // Use global JWT_SECRET
    return payload;
  } catch (err) {
    return null;
  }
}

// Route: User Signup
router.post('/signup', async request => {
  try {
    const { email, password, username } = await request.json();

    // Basic Validation
    if (!email || !password || !username) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const userKey = `user:${email}`;
    const existingUser = await USER_DATA.get(userKey, 'json');

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email already in use' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user object
    const user = {
      id: nanoid(),
      email,
      username,
      password: hashedPassword,
      progress: {}, // Initialize progress as an empty object
    };

    // Store user in Workers KV
    await USER_DATA.put(userKey, JSON.stringify(user));

    return new Response(JSON.stringify({ message: 'Sign-up successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return new Response(JSON.stringify({ message: 'Error in sign-up' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

// Route: User Login
router.post('/login', async request => {
  try {
    const { email, password } = await request.json();

    // Basic Validation
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const userKey = `user:${email}`;
    const userData = await USER_DATA.get(userKey, 'json');

    if (!userData) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Hash the incoming password and compare
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
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return new Response(JSON.stringify({ message: 'Error in login' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

// Route: Check Authentication
router.get('/check-auth', async request => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ isAuthenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix
    const payload = await verifyJWT(token);
    if (!payload) {
      return new Response(JSON.stringify({ isAuthenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ isAuthenticated: true, user: payload }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Check-Auth Error:', error);
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

// Route: Create Stripe Checkout Session
router.post('/create-checkout-session', async request => {
  try {
    const { consultationType } = await request.json();

    let priceId;
    if (consultationType === 'group') {
      priceId = 'price_1Q0ag3Hbl2elS2At0ETHNIlK'; // Replace with your Group Call Price ID
    } else if (consultationType === 'one-on-one') {
      priceId = 'price_1Q0aitHbl2elS2AtWP4kXnWu'; // Replace with your 1:1 Consultation Price ID
    } else {
      return new Response(JSON.stringify({ error: 'Invalid consultation type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Create Stripe Checkout Session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`, // Use global STRIPE_SECRET_KEY
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': 'https://cs-mentorship-site.pages.dev/consultations/success?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url': 'https://cs-mentorship-site.pages.dev/consultations/cancel',
      }),
    });

    const session = await stripeResponse.json();

    if (stripeResponse.ok) {
      return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      console.error('Stripe Error:', session.error);
      return new Response(JSON.stringify({ error: session.error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (error) {
    console.error('Create-Checkout-Session Error:', error);
    return new Response(JSON.stringify({ error: 'Unable to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

// Route: Test Secrets
router.get('/test-secrets', () => {
  return new Response(
    JSON.stringify({
      JWT_SECRET: JWT_SECRET ? 'Accessible' : 'Not Accessible',
      STRIPE_SECRET_KEY: STRIPE_SECRET_KEY ? 'Accessible' : 'Not Accessible',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    }
  );
});

// Fallback Route for Unmatched Paths
router.all('*', () => new Response('Not Found', { status: 404, headers: corsHeaders }));

// Event Listener to Handle Requests
addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request));
});
