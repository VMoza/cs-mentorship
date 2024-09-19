const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PyhbLHbl2elS2At8pMJFwFsCPRpUFYKv7sRaz5hCOxYAYdS5SOB6OyvhM1nTV4mxddnupsYs71gdqfcvzxWWKI100TrHVoLPI');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('./src/db/database');  // Import SQLite connection
const session = require('express-session');  // Add this line for sessions

const app = express();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:9000',  // Allow frontend's URL
  credentials: true  // Allow sending of cookies and credentials
}));

// Middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json());

const SQLiteStore = require('connect-sqlite3')(session);

app.use(session({
  secret: 'c5cc548038cfb8b93fba6735b1163eef729af8b375aa650b4e6fec4d0c56cd0b3aac87f9a3b0e31e375e9e54adef7452ed176940c50ad8930153bcfc67e7cabc',
  resave: false,
  saveUninitialized: true,
  store: new SQLiteStore(),  // Use SQLite to store sessions
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 1 day session duration
  }
}));


app.post('/create-checkout-session', async (req, res) => {
    const { consultationType } = req.body;
  
    let priceId;
    if (consultationType === 'group') {
      priceId = 'price_1Q0ag3Hbl2elS2At0ETHNIlK'; // Replace with your Group Call Price ID
    } else if (consultationType === 'one-on-one') {
      priceId = 'price_1Q0aitHbl2elS2AtWP4kXnWu'; // Replace with your 1:1 Consultation Price ID
    } else {
      return res.status(400).json({ error: 'Invalid consultation type' });
    }
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:9000/consultations/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:9000/consultations/cancel',
      });
  
      res.json({ url: session.url });
    } catch (error) {
      console.error('Stripe Error:', error);
      res.status(500).json({ error: 'An error occurred, unable to create session' });
    }
  });
  
  

// User signup route
app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Check if user already exists
    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
      if (row) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
          if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Error in sign-up. Try again.' });
          }
          res.status(200).json({ message: 'Sign-up successful' });
        }
      );
    });
  } catch (error) {
    console.error('Signup error: ', error);
    res.status(500).json({ message: 'Error in sign-up. Try again.' });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (err || !row) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        const isMatch = await bcrypt.compare(password, row.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        // Store user info in session
        req.session.user = {
          id: row.id,
          email: row.email,
          username: row.username
        };
  
        console.log('Session set for user:', req.session.user);  // Debugging
  
        res.status(200).json({ message: 'Login successful', user: req.session.user });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error in login' });
    }
  });  

// Route to check if user is logged in (frontend can hit this route)
app.get('/check-auth', (req, res) => {
    if (req.session.user) {
      console.log('User is authenticated:', req.session.user);  // Debugging
      return res.status(200).json({ isAuthenticated: true, user: req.session.user });
    }
    console.log('User not authenticated');  // Debugging
    return res.status(401).json({ isAuthenticated: false });
  });

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
