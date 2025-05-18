const express = require("express");
const session = require("express-session");
require("dotenv").config();
const passport = require('passport');
const GitHubStrategy = require("passport-github").Strategy;

const app = express();

const GITHUB_CLIENT_ID = process.env.CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET;

const users = new Map();

passport.use(
  new GitHubStrategy(
    {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5173/auth/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      let user = users.get(profile.id);
      if (!user) {
        (user = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
        }),
          users.set(profile.id, user);
      }
      return cb(null, user);
    }
  )
);

app.use(
  session({
    secret: "secret frase",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, users.get(id));
});

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/login", (req, res) => {
  res.send('Ошибка входа. <a href="/">Назад</a>');
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err), res.redirect("/");
  });
});

app.listen(3000, () => console.log("zapusk"));
