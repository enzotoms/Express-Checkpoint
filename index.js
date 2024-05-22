import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to check working hours
const isWorkingHours = (req, res, next) => {
  const today = new Date();
  const day = today.getDay(); // 0 for Sunday
  const hour = today.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(410).send(`Sorry, we are closed outside working hours (Monday to Friday, 9 AM to 5 PM)`);
  }
};

app.use(isWorkingHours);

// Set template engine (optional, choose your preferred engine)
// app.set('view engine', 'ejs'); // Example for EJS

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  // Render home page template (if using template engine)
  // res.render('home');
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/services', (req, res) => {
//   Render services page template (if using template engine)
//   res.render('services');
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
  // Render contact page template (if using template engine)
  // res.render('contact');
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
