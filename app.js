const express = require("express");
const app = express();
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.use(express.json())
require("dotenv").config();
app.use(passport.initialize());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.json());
app.use("/comment", commentRoutes);
app.use("/post", postRoutes);
// app.use("/user", userRoutes);

app.post("/login", passport.authenticate('local', {session: false} ), (req, res) => {
  console.log("tried to login");
  console.log(req.user);
    jwt.sign({ user: req.user }, process.env.SECRET_KEY, (err, token) => {
        res.json({ token });
    });
});

app.post("/sign-up", async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
        },
      });
      res.send("created user and added to db");
    } catch (err) {
      return next(err);
    }
  });

  /*
app.get("/allusers", async (req, res) => {
    const users = await prisma.user.findMany({});
    res.send(users);
})
*/
// app.post("/login", (req, res) => {});
/*
app.delete("/allusers", async (req, res) => {
  await prisma.user.deleteMany();
  res.send("Deleted all");
})
*/
const PORT = process.env.PORT || 5000;
app.listen(8080, () => {
  console.log(`Server running on port ${8080}`);
});
