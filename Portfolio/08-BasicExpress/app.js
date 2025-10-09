const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.send('<h1>Invalid input</h1><p>Please enter valid numbers.</p><a href="/">Back</a>');
  }

  // Calcular BMI: (weight / (height)^2) * 10,000
  const bmi = (weight / (height * height)) * 10000;
  const result = bmi.toFixed(2);

  res.send(`
    <h1>Your BMI is: ${result}</h1>
    <a href="/">Back</a>
  `);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
