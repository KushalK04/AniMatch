import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import flash from 'express-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Auth",
  password: "Oliviafong1",
  port: 5432,
});
db.connect();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { error: req.flash('error') });
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { error: req.flash('error') });
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.flash('error', 'Email already exists. Try logging in.');
      res.redirect('/register');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword] 
      );
      console.log(result);
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    req.flash('error', 'An error occurred');
    res.redirect('/register');
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      const passwordMatch = await bcrypt.compare(password, storedPassword); 
      if (passwordMatch) {
        try {
          const response = await axios.get('https://kitsu.io/api/edge/anime');
          const animeData = response.data.data;
          res.render('main', { animeData });
        } catch (error) {
          console.error('Error fetching anime data:', error);
          res.status(500).send('An error occurred while fetching anime data.');
        }
      } else {
        req.flash('error', 'Incorrect Password');
        res.redirect('/login');
      }
    } else {
      req.flash('error', 'User not found');
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    req.flash('error', 'An error occurred');
    res.redirect('/login');
  }
});

app.get("/anime", async (req, res) => {
  try {
      const response = await axios.get('https://kitsu.io/api/edge/anime');
      const animeData = response.data.data;
      res.render('main', { animeData });
  } catch (error) {
      console.error('Error fetching anime data:', error);
      res.status(500).send('An error occurred while fetching anime data.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
