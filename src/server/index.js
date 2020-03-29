const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

var passport = require('passport')
var Strategy = require('passport-facebook').Strategy

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new Strategy(
    {
      clientID: '209655036809598',
      clientSecret: '0fae5ceaeb94d9407a373db5706cc978',
      callbackURL: '/return',
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
    },
    function (accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile)
    }
  )
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

const { createLightship } = require('lightship')
const app = express()
// Lightship will start a HTTP service on port 9000.
const lightship = createLightship()

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {}
  })
)

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

app.get('/login/facebook', passport.authenticate('facebook'))

const dynamoRouter = require('./routes/dynamo')

app.use('/api/dynamo', dynamoRouter)

app.get(
  '/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    res.cookie('user', req.user)
    res.redirect('/')
  }
)

app.use(express.static('dist'))

app.get(
  '*',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'), {
      user: req.user
    })
  }
)

app.listen(3000, () => {
  lightship.signalReady()
})
