const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { pool }       = require('./db');

// Only setup Google OAuth if credentials exist
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL || '/api/v1/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const [users] = await pool.query(
        'SELECT * FROM users WHERE google_id = ? OR email = ?',
        [profile.id, profile.emails[0].value]
      );

      if (users.length > 0) {
        await pool.query(
          'UPDATE users SET google_id = ? WHERE id = ?',
          [profile.id, users[0].id]
        );
        return done(null, users[0]);
      }

      const [result] = await pool.query(
        `INSERT INTO users (name, email, google_id, is_verified, role)
         VALUES (?, ?, ?, 1, 'user')`,
        [profile.displayName, profile.emails[0].value, profile.id]
      );

      const [newUser] = await pool.query(
        'SELECT * FROM users WHERE id = ?', [result.insertId]
      );

      return done(null, newUser[0]);
    } catch (error) {
      return done(error, null);
    }
  }));
}

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, users[0]);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;