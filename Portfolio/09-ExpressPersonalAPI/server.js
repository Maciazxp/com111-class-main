const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let names = [];
let tasks = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

function renderIndex(res, errorMsg = null) {
  res.render('index', { names, tasks, error: errorMsg });
}



app.get('/', (req, res) => {
  renderIndex(res);
});

app.post('/greet', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name required' });
  }
  names.push(name.trim());
  res.json({ names });
});

app.get('/greet/:index', (req, res, next) => {
  const idx = parseInt(req.params.index, 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= names.length) {
    const err = new Error('Index fuera de rango');
    err.status = 404;
    return next(err);
  }
  const name = names[idx];
  res.render('wazzup', { name });
});

app.put('/greet/:name', (req, res) => {
  const name = req.params.name;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name required' });
  names.push(name.trim());
  res.json({ names });
});


app.get('/task', (req, res) => {
  res.json({ tasks });
});

app.post('/task', (req, res) => {
  const { task } = req.body;
  if (!task || !task.trim()) {
    return res.status(400).json({ error: 'task required' });
  }
  tasks.push(task.trim());
  res.json({ tasks });
});

app.delete('/task/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= tasks.length) {
    return res.status(400).json({ error: 'Index inválido' });
  }
  tasks.splice(idx, 1);
  res.json({ tasks });
});

app.put('/task/:index/move', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  const dir = req.query.dir;
  if (Number.isNaN(idx) || idx < 0 || idx >= tasks.length) {
    return res.status(400).json({ error: 'Index inválido' });
  }
  if (dir !== 'up' && dir !== 'down') {
    return res.status(400).json({ error: 'dir must be up or down' });
  }
  const newIndex = dir === 'up' ? idx - 1 : idx + 1;
  if (newIndex < 0 || newIndex >= tasks.length) {
    return res.status(400).json({ error: 'No se puede mover más' });
  }
  const [item] = tasks.splice(idx, 1);
  tasks.splice(newIndex, 0, item);
  res.json({ tasks });
});


app.use((err, req, res, next) => {
  console.error(err);
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(err.status || 500).json({ error: err.message || 'Error' });
  }
  // De lo contrario renderizamos index con el mensaje de error (el README pide mostrar el error en index)
  return renderIndex(res, err.message || 'Error');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
